import { Comment } from "../components/Comment/index";
import { Music, Language } from "../components/extra";
import { useTranslation } from "react-i18next";

const Main = () => {
  const { t } = useTranslation("main");
  return (
    <div className="flex flex-col mx-auto  bg-pink-200 w-[50%] ">
      <Language />
      <Music />
      <img className="" src="/assets/marriage painting.png"></img>

      <div>
        {t("brideName")} & {t("groomName")}
      </div>
      <div>{t("married")}</div>
      <div>{t("time")}</div>

      <div>{t("place")}</div>
      <div>
        인연으로 만나 부부가 되는 날, 소중한 분들을 초대합니다. 결혼식은 한국
        전통혼례 방식으로 진행할 예정입니다.
      </div>
      <button
        className="button"
        onClick={() => {
          window.open(
            "https://docs.google.com/forms/d/e/1FAIpQLSfWSB34WkeIedPglfTlANpQWqWBSYzUesLuv5c6J9CBWiwlqA/viewform?usp=sf_link"
          );
        }}
      >
        {t("attendance")}
      </button>
      <div>{t("gallery")}</div>
      <div>{t("comment")}</div>
      <div>{t("account")}</div>
      <div>{t("calender")}</div>
      <div>{t("map")} </div>
      <div>{t("share")}</div>
      <Comment />
    </div>
  );
};

export default Main;
