import { Comment } from "../components/Comment/index";
import { Music, Language } from "../components/extra";
import { useTranslation } from "react-i18next";

const Main = () => {
  const { t } = useTranslation("main");
  return (
    <div className="flex flex-col mx-auto  bg-pink-200 w-[50%] ">
      <Language />
      <Music />
      <img src="/assets/marriage painting.png"></img>

      <div>
        {t("brideName")} & {t("groomName")}
      </div>
      <div>{t("married")}</div>
      <div>{t("time")}</div>

      <div>{t("place")}</div>
      <div>
        인연으로 만나 부부가 되는 날, 소중한 분들을 초대합니다.
        <br />
        결혼식은 한국전통혼례 방식으로 진행할 예정입니다.
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
      <div>판데이 모한 , 레카의 아들 판데이 수단슈</div>
      <div>김원중, 이봉선의 딸 김선형</div>

      <div>d-day</div>
      <div>{t("gallery")}</div>

      <div>{t("calender")}</div>
      <img src="/assets/calendar.png"></img>
      <div>{t("map")} </div>
      <div>{t("share")}</div>
      <div className="">{t("comment")}</div>
      <Comment />

      <button>신랑측 연락처</button>
      <button>신부측 연락처</button>
      <div>{t("account")}</div>
      <button>신랑측 계좌번호 </button>
      <button>신부측 계좌번호 </button>
    </div>
  );
};

export default Main;
