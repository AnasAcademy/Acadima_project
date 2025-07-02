import { useTranslations } from "next-intl";
import Image from "next/image";

import bg from "@/assets/admin/startTechbg.png";
import StartTech from "@/assets/admin/startTech.svg";

export default function StartTechCard() {
  const t = useTranslations("techSupport");

  return (
    <>
<<<<<<< HEAD
      <div className=" mt-1  cardbg rounded-4 text-white min-nam-ht position-relative   z-0 ">
=======
      <div className=" mt-1  cardbg rounded-4 text-white  position-relative   z-0  min-tr-ht ">
>>>>>>> 6586ee9 (Modifications_p1)
        <Image src={bg} className=" w-100" alt="start tech" />
        <div className="p-3 position-absolute top-15">
          <h2 className="">{t("direct-contact")}</h2>
          <p className="text-black">{t("direct-contact-p")}</p>
          <button className=" btn btn-light custfontbtn btncolor white-c d-flex justify-content-center align-items-center gap-2">
            <StartTech />
            {t("direct-contact-button")}
          </button>
        </div>
      </div>
    </>
  );
}
