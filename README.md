# Stanki — каталог станков SZGH

B2B-сайт металлообрабатывающего оборудования SZGH: каталог, карточки моделей, сервис, документация, заявки.

## Стек

- Vite + React + TypeScript + Tailwind CSS
- React Router
- Сборка в `dist/`
- Заявки: `send-mail.php` (SMTP / PHPMailer на PHP-хостинге)

## Команды

```bash
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

По умолчанию `send-mail.php` **не** копируется в `dist` (GitHub Pages / static preview). Для production PHP-хостинга:

```bash
STANKI_COPY_PHP=1 npm run build
```

## Контакты и утверждения

Все бизнес-данные — в `src/lib/siteConfig.ts`:

- `company.phone` / `email` / `address` / реквизиты — опциональны; пустые поля не показываются в UI
- `company.isOfficialDistributor` — включать только с подтверждением
- `claims.*` — флаги сервисов (ПНР, ЗИП, гарантия и т.д.)

Не заполняйте выдуманными значениями.

## Почта

Frontend:

```bash
# Production API (absolute or same-origin)
VITE_MAIL_URL=https://example.com/send-mail.php

# GitHub Pages / demo без backend
VITE_PAGES_PREVIEW=true
# или
VITE_FORM_DEMO=true
```

Backend (`send-mail.php`) — только через environment:

- `STANKI_MAIL_TO`
- `STANKI_MAIL_FROM`
- `STANKI_SMTP_HOST` / `STANKI_SMTP_PORT` / `STANKI_SMTP_USER` / `STANKI_SMTP_PASS`
- `STANKI_ALLOWED_ORIGINS` (comma-separated)

PHPMailer должен быть доступен на хостинге (`phpmailer/` или autoload).

## Превью для заказчика

- Репозиторий: https://github.com/allilluiia/Stanki
- Живой превью: https://allilluiia.github.io/Stanki/

```bash
npm run deploy:pages
```
