<?php
/**
 * Stanki lead form endpoint — production PHP hosting only.
 * Credentials via environment variables. Never commit secrets.
 */

header("Content-Type: application/json; charset=utf-8");

function json_exit(int $code, bool $success, string $message): void {
    http_response_code($code);
    echo json_encode([
        "success" => $success,
        "message" => $message,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

function client_error(string $message): void {
    json_exit(400, false, $message);
}

function server_fail(string $logMessage): void {
    $logFile = __DIR__ . '/mail_log.txt';
    @file_put_contents(
        $logFile,
        date('Y-m-d H:i:s') . ' ERROR: ' . $logMessage . "\n",
        FILE_APPEND
    );
    json_exit(
        500,
        false,
        "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами по телефону/email."
    );
}

function strip_crlf(string $value): string {
    return str_replace(["\r", "\n", "%0a", "%0d", "%0A", "%0D"], "", $value);
}

// ---- Method ----
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Same-origin forms should not need CORS; reject broad preflight
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_exit(405, false, "Method not allowed");
}

// ---- Origin allowlist (optional) ----
$allowedOrigins = array_filter(array_map('trim', explode(',', (string)getenv('STANKI_ALLOWED_ORIGINS'))));
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && count($allowedOrigins) > 0) {
    if (!in_array($origin, $allowedOrigins, true)) {
        json_exit(403, false, "Forbidden");
    }
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}

// ---- Body size ----
$maxBody = 64 * 1024;
$contentLength = (int)($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > $maxBody) {
    client_error("Слишком большой запрос");
}

$raw = file_get_contents("php://input", false, null, 0, $maxBody + 1);
if ($raw === false || strlen($raw) > $maxBody) {
    client_error("Слишком большой запрос");
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    client_error("Некорректный запрос");
}

// ---- Rate limit (file-based, per IP) ----
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateDir = sys_get_temp_dir() . '/stanki_mail_rate';
if (!is_dir($rateDir)) {
    @mkdir($rateDir, 0700, true);
}
$rateFile = $rateDir . '/' . hash('sha256', $ip) . '.json';
$now = time();
$window = 600; // 10 minutes
$maxHits = 8;
$hits = [];
if (is_file($rateFile)) {
    $decoded = json_decode((string)file_get_contents($rateFile), true);
    if (is_array($decoded)) {
        $hits = array_values(array_filter($decoded, static fn($t) => is_int($t) && ($now - $t) < $window));
    }
}
if (count($hits) >= $maxHits) {
    json_exit(429, false, "Слишком много заявок. Попробуйте позже.");
}
$hits[] = $now;
@file_put_contents($rateFile, json_encode($hits));

// ---- Honeypot / timing ----
$honeypot = trim((string)($data["website"] ?? ""));
if ($honeypot !== "") {
    // Silent success for bots
    json_exit(200, true, "Заявка успешно отправлена");
}

$startedAt = (int)($data["formStartedAt"] ?? 0);
if ($startedAt > 0 && ($now * 1000 - $startedAt) < 1200) {
    json_exit(200, true, "Заявка успешно отправлена");
}

if (empty($data["consent"])) {
    client_error("Необходимо согласие на обработку персональных данных");
}

// ---- Fields ----
$limits = [
    "organization" => 200,
    "name" => 120,
    "email" => 254,
    "phone" => 24,
    "message" => 12000,
    "formType" => 32,
    "machineSlug" => 80,
    "machineModel" => 120,
    "context" => 200,
    "categoryId" => 40,
];

$organization = mb_substr(trim((string)($data["organization"] ?? "")), 0, $limits["organization"]);
$name         = mb_substr(trim((string)($data["name"] ?? "")), 0, $limits["name"]);
$email        = mb_substr(trim((string)($data["email"] ?? "")), 0, $limits["email"]);
$phone        = mb_substr(trim((string)($data["phone"] ?? "")), 0, $limits["phone"]);
$message      = mb_substr(trim((string)($data["message"] ?? "")), 0, $limits["message"]);
$formType     = mb_substr(trim((string)($data["formType"] ?? "contact")), 0, $limits["formType"]);
$machineSlug  = mb_substr(trim((string)($data["machineSlug"] ?? "")), 0, $limits["machineSlug"]);
$machineModel = mb_substr(trim((string)($data["machineModel"] ?? "")), 0, $limits["machineModel"]);
$context      = mb_substr(trim((string)($data["context"] ?? "")), 0, $limits["context"]);
$categoryId   = mb_substr(trim((string)($data["categoryId"] ?? "")), 0, $limits["categoryId"]);

$name = strip_crlf($name);
$email = strip_crlf($email);
$phone = strip_crlf($phone);
$organization = strip_crlf($organization);
$machineModel = strip_crlf($machineModel);

if ($name === "" || $message === "" || $email === "") {
    client_error("Не заполнены обязательные поля");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    client_error("Некорректный email");
}

$typeLabels = [
    "quote"   => "Запрос КП",
    "select"  => "Подбор станка",
    "contact" => "Сообщение",
];
$typeLabel = $typeLabels[$formType] ?? "Заявка";
$subject = strip_crlf("Stanki: {$typeLabel}" . ($machineModel !== "" ? " — {$machineModel}" : ""));

$safe = static function (string $value): string {
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
};

$bodyLines = [
    "Новая заявка с сайта Stanki",
    "Тип: {$typeLabel}",
];
if ($machineModel !== "") $bodyLines[] = "Модель: {$machineModel}";
if ($machineSlug !== "") $bodyLines[] = "Slug: {$machineSlug}";
if ($context !== "") $bodyLines[] = "Контекст: {$context}";
if ($categoryId !== "") $bodyLines[] = "Категория: {$categoryId}";
if ($organization !== "") $bodyLines[] = "Организация: {$organization}";
$bodyLines[] = "Имя: {$name}";
$bodyLines[] = "Email: {$email}";
if ($phone !== "") $bodyLines[] = "Телефон: {$phone}";
$bodyLines[] = "";
$bodyLines[] = "Сообщение:";
$bodyLines[] = $message;
$textBody = implode("\n", $bodyLines);

$htmlBody = '<!DOCTYPE html><html lang="ru"><body style="font-family:Arial,sans-serif;color:#222;">';
$htmlBody .= '<h1>Новая заявка — Stanki</h1><table>';
$htmlBody .= '<tr><td><b>Тип</b></td><td>' . $safe($typeLabel) . '</td></tr>';
if ($machineModel !== "") $htmlBody .= '<tr><td><b>Модель</b></td><td>' . $safe($machineModel) . '</td></tr>';
if ($context !== "") $htmlBody .= '<tr><td><b>Контекст</b></td><td>' . $safe($context) . '</td></tr>';
if ($organization !== "") $htmlBody .= '<tr><td><b>Организация</b></td><td>' . $safe($organization) . '</td></tr>';
$htmlBody .= '<tr><td><b>Имя</b></td><td>' . $safe($name) . '</td></tr>';
$htmlBody .= '<tr><td><b>Email</b></td><td>' . $safe($email) . '</td></tr>';
if ($phone !== "") $htmlBody .= '<tr><td><b>Телефон</b></td><td>' . $safe($phone) . '</td></tr>';
$htmlBody .= '<tr><td><b>Сообщение</b></td><td style="white-space:pre-wrap;">' . nl2br($safe($message)) . '</td></tr>';
$htmlBody .= '</table><p style="font-size:12px;color:#666;">' . date('d.m.Y H:i:s') . '</p></body></html>';

$recipientsEnv = getenv('STANKI_MAIL_TO') ?: '';
$recipients = array_values(array_filter(array_map('trim', explode(',', $recipientsEnv))));
if (count($recipients) === 0) {
    server_fail('STANKI_MAIL_TO is not configured');
}

$smtpHost = getenv('STANKI_SMTP_HOST') ?: '';
$smtpUser = getenv('STANKI_SMTP_USER') ?: '';
$smtpPass = getenv('STANKI_SMTP_PASS') ?: '';
$smtpPort = (int)(getenv('STANKI_SMTP_PORT') ?: 465);
$fromEmail = getenv('STANKI_MAIL_FROM') ?: $smtpUser;
$fromName = getenv('STANKI_MAIL_FROM_NAME') ?: 'Stanki Website';

$phpmailerException = __DIR__ . '/phpmailer/Exception.php';
if (!file_exists($phpmailerException) || $smtpHost === '' || $smtpUser === '' || $smtpPass === '' || $fromEmail === '') {
    server_fail('SMTP/PHPMailer is not configured');
}

require $phpmailerException;
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

try {
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->Port = $smtpPort;
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;
    $mail->CharSet = 'UTF-8';
    $mail->setFrom($fromEmail, $fromName);
    foreach ($recipients as $recipient) {
        $mail->addAddress($recipient);
    }
    $mail->addReplyTo($email, $name);
    $mail->Subject = $subject;
    $mail->isHTML(true);
    $mail->Body = $htmlBody;
    $mail->AltBody = $textBody;
    $mail->send();
    json_exit(200, true, "Заявка успешно отправлена");
} catch (Throwable $e) {
    server_fail($e->getMessage());
}
