import { useTranslations } from "next-intl";
import Arrow from "@/assets/admin/arrow down.svg";
import RightArrow from "@/assets/admin/rightArrow.svg";

export default function FrequentlyAskedQues() {
  const t = useTranslations("techSupport");
  const faqs = t.raw("faqs");


  return (
    <div className="cardbg  p-3 rounded-4">
      <h2 className="fw-bold mb-3">{t("faq-title")}</h2>

      <div className="d-flex flex-column gap-2">
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            className={` d-flex justify-content-start gap-2 align-items-center px-3 py-2 rounded  ${
              num === 2 ? " text-primary" : "bg-light"
            }`}
          >
            <RightArrow size={18} />

            <span>{t(`q${num}`)}</span>
          </button>
        ))}
      </div>

      <div className=" mt-3">
        <a
          href="#"
          className="text-primary fw-bold d-inline-flex align-items-end gap-2"
        >
          <Arrow size={16} />
          {t("view-all-faq")}
        </a>
      </div>
    </div>
  );
}
