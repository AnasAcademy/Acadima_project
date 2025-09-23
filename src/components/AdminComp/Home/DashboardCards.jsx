import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const DashboardCards = ({ cards, minHeight }) => {
  const t = useTranslations("DashboardA");

  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="   ">
      <div className="row g-2  ">
        {cards.map((card, index) => (
          <div key={index} className="col-12 col-md-6 col-xl-3">
            <div
            style={{ minHeight: minHeight || "93" }} 
             className="card dropshadow border-0 px-3 py-2 d-flex flex-row justify-content-start align-items-center rounded-4  min-dash-ht">
              <div className=" circbg text-white rounded-3 p-2">
                {card.icon}
              </div>
              <div className={`mx-3 ${isRTL ? "ms-0" : "me-0"}`}>
                <h6 className="m-0 ">{card.title}</h6>
                <h3 className="m-0  fs-xs fs-6 fw-bold">{card.value}</h3>
                {card.value2}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;
