import { useTranslations } from "next-intl";
import Arrow from "@/assets/admin/arrow down.svg";
import RightArrow from "@/assets/admin/rightArrow.svg";

export default function FrequentlyAskedQues() {
  const t = useTranslations("techSupport");
  const faqs = t.raw("faqs");


  return (
    <div className="cardbg  p-3 rounded-4 h-100">
      <h2 className="fw-bold py-3">{t("faq-title")}</h2>

      <div className="d-flex flex-column gap-2">
        {faqs.map((faq, index) => (
          <button
            key={index}
            className="d-flex justify-content-start gap-2 align-items-center py-3 bg-white border-0 border-bottom"
            style={{ fontWeight: 500 }}
          >
            <RightArrow size={18} />
            <span className="text-end">{faq[`q${index + 1}`]}</span>
          </button>
        ))}
        <div className="text-primary fw-semibold d-flex align-items-center gap-2 py-3" role="button">
          <Arrow size={18} />
          {t("view-all-faq")}
        </div>
      </div>
    </div>
  );
}
