import { Comment } from "../components/Comment/index";
import { Music, Language } from "../components/extra";
import { useTranslation } from "react-i18next";

const Main = () => {
  const { t } = useTranslation("main");
  return (
    <div className="flex flex-col mx-auto  bg-pink-200 w-[60%] ">
      <Music />
      <Language />
      <img className="" src="/assets/marriage painting.png"></img>
      <div>{t("test")}</div>
      <div>
        {t("brideName")} & {t("groomName")}
      </div>
      <div>{t("married")}</div>
      <div>{t("time")}</div>

      <div>{t("place")}</div>
      <button
        onClick={() => {
          window.open(
            "https://docs.google.com/forms/d/e/1FAIpQLSfWSB34WkeIedPglfTlANpQWqWBSYzUesLuv5c6J9CBWiwlqA/viewform?usp=sf_link"
          );
        }}
      >
        {t("attendance")}
      </button>
      <div>갤러리</div>
      <div>방명록</div>
      <div> 마음전하실 곳</div>
      <div> 달력</div>
      <div> 지도 </div>
      <div> 공유</div>
      <Comment />
    </div>
  );
};

export default Main;
