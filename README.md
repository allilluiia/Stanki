# Stanki — дистрибьютор SZGH

B2B-сайт поставки станков SZGH: каталог, карточки моделей, сервис, документация, заявки на email.

## Стек

- Vite + React + TypeScript + Tailwind CSS
- React Router
- Сборка в `dist/`
- Заявки: `send-mail.php` (SMTP / PHPMailer на хостинге)

## Команды

```bash
npm install
npm run dev
npm run build
npm run preview
```

После `npm run build` в `dist/` попадают статика и `send-mail.php`.

## Контакты

Плейсхолдеры в `src/lib/siteConfig.ts` и получатели в `send-mail.php`:
- email: `info@stanki.ru`
- телефон: `+7 (495) 000-00-00`

Замените перед продакшеном. Для SMTP задайте `STANKI_SMTP_*` или положите PHPMailer в `phpmailer/` на хостинге.

## Превью для заказчика

- Репозиторий: https://github.com/allilluiia/Stanki
- Живой превью: https://allilluiia.github.io/Stanki/

Обновить превью:

```bash
npm run deploy:pages
```

Альтернатива: workflow `.github/workflows/pages.yml` (нужен GitHub token со scope `workflow`).
