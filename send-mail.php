<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed",
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$input = file_get_contents("php://input");
$data  = json_decode($input, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON",
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Получатели заявок — замените на рабочие адреса
$recipients = [
    "info@stanki.ru",
];

$organization = trim((string)($data["organization"] ?? ""));
$name         = trim((string)($data["name"] ?? ""));
$email        = trim((string)($data["email"] ?? ""));
$phone        = trim((string)($data["phone"] ?? ""));
$message      = trim((string)($data["message"] ?? ""));
$formType     = trim((string)($data["formType"] ?? "contact"));
$machineSlug  = trim((string)($data["machineSlug"] ?? ""));
$machineModel = trim((string)($data["machineModel"] ?? ""));

if ($name === "" || $message === "" || $email === "") {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Не заполнены обязательные поля (имя, email, сообщение)",
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Некорректный email",
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$typeLabels = [
    "quote"   => "Запрос КП",
    "select"  => "Подбор станка",
    "contact" => "Сообщение",
];
$typeLabel = $typeLabels[$formType] ?? "Заявка";

$subject = "Stanki: {$typeLabel}";
if ($machineModel !== "") {
    $subject .= " — {$machineModel}";
}

$safe = static function (string $value): string {
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
};

$bodyLines = [];
$bodyLines[] = "Новая заявка с сайта Stanki";
$bodyLines[] = "==================================";
$bodyLines[] = "Тип: " . $typeLabel;
if ($machineModel !== "") {
    $bodyLines[] = "Модель: " . $machineModel;
}
if ($machineSlug !== "") {
    $bodyLines[] = "Slug: " . $machineSlug;
}
$bodyLines[] = "";
if ($organization !== "") {
    $bodyLines[] = "Организация: " . $organization;
}
$bodyLines[] = "Фамилия и имя: " . $name;
$bodyLines[] = "Email: " . $email;
if ($phone !== "") {
    $bodyLines[] = "Телефон: " . $phone;
}
$bodyLines[] = "";
$bodyLines[] = "Сообщение:";
$bodyLines[] = $message;
$bodyLines[] = "";
$bodyLines[] = "---";
$bodyLines[] = "Автоматическое письмо с сайта Stanki";

$textBody = implode("\n", $bodyLines);

$htmlBody = '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>Заявка Stanki</title></head><body style="font-family:Arial,sans-serif;color:#222;max-width:640px;margin:0 auto;padding:20px;">';
$htmlBody .= '<h1 style="color:#0c1016;">Новая заявка с сайта Stanki</h1>';
$htmlBody .= '<table style="width:100%;border-collapse:collapse;">';
$htmlBody .= '<tr><td style="padding:8px 0;font-weight:bold;">Тип</td><td style="padding:8px 0;">' . $safe($typeLabel) . '</td></tr>';
if ($machineModel !== "") {
    $htmlBody .= '<tr><td style="padding:8px 0;font-weight:bold;">Модель</td><td style="padding:8px 0;">' . $safe($machineModel) . '</td></tr>';
}
if ($organization !== "") {
    $htmlBody .= '<tr><td style="padding:8px 0;font-weight:bold;">Организация</td><td style="padding:8px 0;">' . $safe($organization) . '</td></tr>';
}
$htmlBody .= '<tr><td style="padding:8px 0;font-weight:bold;">Имя</td><td style="padding:8px 0;">' . $safe($name) . '</td></tr>';
$htmlBody .= '<tr><td style="padding:8px 0;font-weight:bold;">Email</td><td style="padding:8px 0;"><a href="mailto:' . $safe($email) . '">' . $safe($email) . '</a></td></tr>';
if ($phone !== "") {
    $htmlBody .= '<tr><td style="padding:8px 0;font-weight:bold;">Телефон</td><td style="padding:8px 0;">' . $safe($phone) . '</td></tr>';
}
$htmlBody .= '<tr><td style="padding:8px 0;font-weight:bold;vertical-align:top;">Сообщение</td><td style="padding:8px 0;white-space:pre-wrap;">' . nl2br($safe($message)) . '</td></tr>';
$htmlBody .= '</table>';
$htmlBody .= '<p style="margin-top:24px;font-size:12px;color:#666;">Дата: ' . date('d.m.Y H:i:s') . '</p>';
$htmlBody .= '</body></html>';

$fromEmail = "noreply@stanki.ru";
$fromName  = "Stanki Website";

// PHPMailer (если установлен на хостинге рядом с сайтом)
$phpmailerException = __DIR__ . '/phpmailer/Exception.php';
$sent = false;
$errorMessage = "";

if (file_exists($phpmailerException)) {
    require $phpmailerException;
    require __DIR__ . '/phpmailer/PHPMailer.php';
    require __DIR__ . '/phpmailer/SMTP.php';

    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    try {
        // Заполните SMTP при деплое на Beget / хостинг
        $mail->isSMTP();
        $mail->Host       = getenv('STANKI_SMTP_HOST') ?: 'smtp.beget.com';
        $mail->Port       = (int)(getenv('STANKI_SMTP_PORT') ?: 465);
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        $mail->SMTPAuth   = true;
        $mail->Username   = getenv('STANKI_SMTP_USER') ?: 'info@stanki.ru';
        $mail->Password   = getenv('STANKI_SMTP_PASS') ?: '';
        $mail->CharSet    = 'UTF-8';
        $mail->setFrom($mail->Username, $fromName);
        foreach ($recipients as $recipient) {
            $mail->addAddress($recipient);
        }
        $mail->addReplyTo($email, $name);
        $mail->Subject = $subject;
        $mail->isHTML(true);
        $mail->Body    = $htmlBody;
        $mail->AltBody = $textBody;
        $mail->send();
        $sent = true;
    } catch (Throwable $e) {
        $errorMessage = $e->getMessage();
    }
} else {
    $headers = [];
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-Type: text/html; charset=UTF-8";
    $headers[] = "From: {$fromName} <{$fromEmail}>";
    $headers[] = "Reply-To: {$name} <{$email}>";
    $headers[] = "X-Mailer: Stanki Contact Form";

    foreach ($recipients as $recipient) {
        $ok = @mail($recipient, "=?UTF-8?B?" . base64_encode($subject) . "?=", $htmlBody, implode("\r\n", $headers));
        if ($ok) {
            $sent = true;
        }
    }
    if (!$sent) {
        $errorMessage = "mail() не удалось отправить письмо. Настройте PHPMailer/SMTP на хостинге.";
    }
}

if ($sent) {
    echo json_encode([
        "success" => true,
        "message" => "Заявка успешно отправлена",
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code(500);
echo json_encode([
    "success" => false,
    "message" => "Ошибка отправки: " . ($errorMessage !== "" ? $errorMessage : "unknown"),
], JSON_UNESCAPED_UNICODE);
