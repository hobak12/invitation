import { Comment } from "../components/comment/index";
import { Share } from "../components/share";
import { Music, Language, Calendar, Map } from "../components/extra";
import { Clipboards } from "../components/copy";
import { useTranslation } from "react-i18next";
import { Gallery } from "../components/Gallery";

const Main = () => {
  const { t } = useTranslation("main");
  return (
    <div className="bg-orange-100 bg-opacity-20 font-basic text-lg mx-auto w-[650px] h-[100%] md:w-full shadow-xl ')]">
      <div className="flex flex-col items-center">
        <div className="flex items-center mt-2  w-full justify-between">
          <Language />
          <Music />
        </div>
        <div className="flex items-baseline mt-[8%] mb-[4%] ml-8">
          <div className="text-xl mr-2">{t("brideName")} </div>
          <div className="text-xs mr-2 ">{t("and")}</div>
          <div className="text-xl"> {t("groomName")}</div>
        </div>
        <div className="text-2xl">{t("married")}</div>
        <img
          className="w-[90%] my-[7%]"
          alt="marriage"
          src="/assets/marriage.png"
        />
        <div>{t("time")}</div>
        <div className="mb-[10%]">{t("place")}</div>
        <div className="text-center ">
          인연으로 만나 부부가 되는 날,
          <br />
          소중한 분들을 초대합니다.
          <br />
          결혼식은 한국 전통혼례로 야외에서 진행할 예정입니다.
        </div>
        <button
          className="button my-[10%]"
          onClick={() => {
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSfWSB34WkeIedPglfTlANpQWqWBSYzUesLuv5c6J9CBWiwlqA/viewform?usp=sf_link"
            );
          }}
        >
          {t("attendance")}
        </button>
        <div className="flex gap-11">
          <div className="text-center m-5 ">
            {t("groomFatherName")}, {t("groomMotherName")}
            {t("'s")} {t("son")}
            <div className="text-xl my-2"> {t("groomName")}</div>
          </div>
          <div className="text-center m-5 ">
            {t("brideFatherName")}, {t("brideMotherName")}
            {t("'s")} {t("daughter")}
            <div className="text-xl my-2">{t("brideName")}</div>
          </div>
        </div>
        <Gallery />
        <Calendar t={t} />

        <div className="">{t("comment")}</div>

        <Comment />
      </div>
      <Map t={t} />
      <Clipboards />
      <Share />
    </div>
  );
};

export default Main;
