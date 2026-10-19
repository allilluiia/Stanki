import { Link } from "react-router-dom";
import { LegalDoc, LegalSection } from "@/components/legal/LegalDoc";
import { operatorDisplayName, siteConfig } from "@/lib/siteConfig";

const UPDATED = "19.10.2026";

export function CookiesPage() {
  return (
    <LegalDoc
      title="Политика использования cookie"
      lead={`Краткие правила применения файлов cookie и локального хранилища на сайте ${siteConfig.brand}.`}
      updated={UPDATED}
    >
      <LegalSection title="1. Что такое cookie">
        <p>
          Cookie — небольшие текстовые файлы, которые сайт может сохранять в
          браузере. Также сайт может использовать localStorage и аналогичные
          механизмы для хранения служебных отметок (например, вашего выбора в
          баннере cookie).
        </p>
      </LegalSection>

      <LegalSection title="2. Какие данные использует сайт">
        <p>В текущей версии сайта применяются:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="font-semibold text-ink">Необходимые</strong> —
            сохранение выбора в cookie-баннере (localStorage), обеспечение
            стабильной работы интерфейса и безопасности форм;
          </li>
          <li>
            <strong className="font-semibold text-ink">Функциональные</strong> —
            запоминание отдельных настроек отображения при их появлении на
            сайте.
          </li>
        </ul>
        <p>
          Рекламные и аналитические cookie третьих лиц на момент публикации
          этой редакции не подключаются. При появлении таких сервисов Политика
          будет обновлена, а баннер предложит отдельное согласие, если это
          потребуется.
        </p>
      </LegalSection>

      <LegalSection title="3. Зачем это нужно">
        <ul className="list-disc space-y-1 pl-5">
          <li>запомнить, что вы уже ответили на уведомление о cookie;</li>
          <li>корректно обрабатывать заявки и защищать формы от спама;</li>
          <li>обеспечить удобство и безопасность просмотра каталога.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Управление">
        <p>
          Вы можете принять все указанные категории или ограничиться
          необходимыми через баннер на сайте. Также можно очистить cookie и
          данные сайтов в настройках браузера — в этом случае баннер может
          появиться снова.
        </p>
      </LegalSection>

      <LegalSection title="5. Связь с Политикой ПДн">
        <p>
          Если cookie или иные технические данные относятся к персональным
          данным, их обработка регулируется{" "}
          <Link to="/privacy" className="text-accent hover:underline">
            Политикой обработки персональных данных
          </Link>
          . Оператор: {operatorDisplayName()}.
        </p>
      </LegalSection>
    </LegalDoc>
  );
}
