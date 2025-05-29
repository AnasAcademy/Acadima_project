import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { FaUserTie, FaAward } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import { RiBarChart2Fill } from "react-icons/ri";


const DashboardCards = () => {
    const t = useTranslations("DashboardA");

    const locale = useLocale();
    const isRTL = locale === "ar"; 

    const cards = [
        { title: t("employees_registered"), value: t("employees_value"), icon: <FaUserTie size={18}  /> },
        { title: t("active_courses"), value: t("active_courses_value"), icon: <RiBarChart2Fill size={18} /> },
        { title: t("total_certificates"), value: t("total_certificates_value"), icon: <FaAward size={18} /> },
        { title: t("course_completion"), value: t("completion_value"), icon: <PiCertificateFill size={18} /> }
    ];

    return (
      <div className="  ">
        <div className="row g-2  ">
          {cards.map((card, index) => (
            <div key={index} className="col-6 col-md-6 col-xl-3">
              <div className="card dropshadow border-0 px-3 py-2 d-flex flex-row justify-content-start align-items-center rounded-4  min-dash-ht">
                <div className=" circbg text-white rounded-3 p-2">
                  {card.icon}
                </div>
                <div className={`mx-3 ${isRTL ? "ms-0" : "me-0"}`}>
                  <h6 className="m-0 ">{card.title}</h6>
                  <h3 className="m-0  fs-xs fs-6">{card.value}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default DashboardCards;