import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { LeadForm, type LeadType } from "@/components/LeadForm";
import { getMachineBySlug } from "@/data/machines";
import { siteConfig } from "@/lib/siteConfig";

export function ContactsPage() {
  const [params] = useSearchParams();
  const typeParam = params.get("type");
  const machineSlug = params.get("machine") ?? undefined;
  const machine = machineSlug ? getMachineBySlug(machineSlug) : undefined;

  const type: LeadType = useMemo(() => {
    if (typeParam === "quote" || typeParam === "select" || typeParam === "contact") {
      return typeParam;
    }
    return "contact";
  }, [typeParam]);

  return (
    <div className="container-page py-12 sm:py-16">
      <h1 className="section-title">Контакты</h1>
      <p className="section-lead">
        Заявки обрабатываем по email. Укажите организацию, задачу и модель — ответим
        коммерческим предложением.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="panel flex items-center gap-4 rounded-sm p-5 transition hover:border-accent/40"
          >
            <Mail className="h-5 w-5 text-accent-soft" />
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-steel-400">
                Email
              </div>
              <div className="text-lg font-semibold text-white">{siteConfig.email}</div>
            </div>
          </a>
          <a
            href={siteConfig.phoneHref}
            className="panel flex items-center gap-4 rounded-sm p-5 transition hover:border-accent/40"
          >
            <Phone className="h-5 w-5 text-accent-soft" />
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-steel-400">
                Телефон
              </div>
              <div className="text-lg font-semibold text-white">{siteConfig.phone}</div>
            </div>
          </a>
          <div className="panel rounded-sm p-5 text-sm text-steel-300">
            Предпочтительный канал — почта. В письме приложите чертёж детали или
            список требований: это ускорит подбор и расчёт КП.
          </div>
        </div>

        <LeadForm
          type={type}
          machineSlug={machine?.slug}
          machineModel={machine?.model}
        />
      </div>
    </div>
  );
}
