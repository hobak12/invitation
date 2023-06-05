import { Comment } from "../components/Comment/index";
import { Music, Language, Calendar } from "../components/extra";
import { useTranslation } from "react-i18next";
import { Gallery } from "../components/Gallery";

const Main = () => {
  const { t } = useTranslation("main");
  return (
    <div className="font-basic text-lg mx-auto  w-[35%] shadow-xl" >
      <div className="flex flex-col items-center">
        <div className="flex items-center mt-2  w-full justify-between">
          <Language />
          <Music />
        </div>
        <div className="flex items-baseline mt-[8%] mb-[4%] ml-8">
          <div className="text-xl mr-2">{t("brideName")} </div>
          <div className="text-xs mr-2 ">그리고</div>
          <div className="text-xl"> {t("groomName")}</div>
        </div>
        <div className="text-2xl">{t("married")}</div>
        <img className="w-[90%] my-[7%]" src="/assets/marriage.png"></img>
        <div>{t("time")}</div>
        <div className="mb-[10%]">{t("place")}</div>
        <div className="text-center ">
          인연으로 만나 부부가 되는 날,
          <br />
          소중한 분들을 초대합니다.
          <br />
          결혼식은 한국 전통혼례로 진행할 예정입니다.
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
        <div>판데이 모한 , 레카의 아들 판데이 수단슈</div>
        <div>김원중, 이봉선의 딸 김선형</div>
        <div>{t("gallery")}</div>
        <Gallery />
        <Calendar />
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
    </div>
  );
};

export default Main;
