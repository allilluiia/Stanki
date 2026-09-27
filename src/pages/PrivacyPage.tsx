/**
 * Privacy policy — structural stub.
 * Owner must replace with legally reviewed text before production claims.
 */
export function PrivacyPage() {
  return (
    <div className="container-page page-start">
      <h1 className="section-title">Политика конфиденциальности</h1>
      <p className="section-lead">
        Порядок обработки персональных данных, передаваемых через формы сайта
        Stanki.
      </p>

      <div className="stack-after-lead max-w-3xl space-y-6 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="heading-3">
            Какие данные мы получаем
          </h2>
          <p className="mt-2">
            Через формы сайта могут передаваться: наименование организации, имя
            контактного лица, адрес электронной почты, номер телефона, текст
            сообщения, а также сведения об интересующей модели оборудования.
          </p>
        </section>

        <section>
          <h2 className="heading-3">
            Цель обработки
          </h2>
          <p className="mt-2">
            Данные используются для ответа на заявку, подготовки коммерческого
            предложения и дальнейшей коммуникации по запросу.
          </p>
        </section>

        <section>
          <h2 className="heading-3">
            Согласие
          </h2>
          <p className="mt-2">
            Отправка формы возможна только после явного согласия на обработку
            персональных данных. Для отзыва согласия направьте запрос на
            контактный email, указанный на сайте, либо через форму обратной связи.
          </p>
        </section>

        <section>
          <h2 className="heading-3">
            Хранение
          </h2>
          <p className="mt-2">
            Персональные данные хранятся в объёме, необходимом для обработки
            заявки и последующей коммуникации, и не используются для иных целей
            без отдельного согласия.
          </p>
        </section>
      </div>
    </div>
  );
}
