import { Comment } from "../components/comment";
import { Share } from "../components/share";
import { Music, Calendar, Map } from "../components/extra";
import { Clipboards } from "../components/copy";
import { useTranslation } from "react-i18next";
import { Gallery } from "../components/gallery";
import Petals from "../components/keyframe/Petals";

const Main = () => {
  const { t } = useTranslation("main");

  const snow = () => {
    let animationDelay = "0s";
    let fontSize = "100px";
    let arr = Array.from(
      "Snowflakes are awesome!!! They are like little pieces of magic!!! Love flak"
    );
    return arr.map((el, i) => {
      animationDelay = `${(Math.random() * 30).toFixed(2)}s`;
      console.log(animationDelay);
      fontSize = `${Math.floor(Math.random() * 25) + 10}px`;
      let style = {
        animationDelay,
        fontSize,
      };
      return <Petals key={i} id={i} style={style} />;
    });
  };

  return (
    <div>
      <div
        id="container"
        className="bg-orange-100 bg-opacity-10 font-basic sm:text-base text-lg mx-auto w-[600px] h-[100%] sm:w-full shadow-xl ')]"
      >
        <div className="z-[40] h-0 ">{snow()}</div>
        <div className="flex flex-col items-center">
          <div className="z-[100] flex justify-center w-full bg-orange-100 bg-opacity-10">
            <Music />
          </div>{" "}
          <div className="my-[10%] text-center">
            <div className="flex items-baseline mb-[4%] ml-8 text-xl sm:text-lg">
              {t("brideName")}
              <span className="text-xs mx-2">&</span>
              {t("groomName")}
            </div>
            <div className="text-2xl sm:text-xl">{t("married")}</div>
          </div>
          <img
            className="w-[90%] mb-[5%]"
            alt="marriage"
            src="/assets/marriage.png"
          />
          <div className="mb-[5%] border-2 border-pink-200  p-4 text-center bg-white rounded-lg">
            <div className="mb-2">{t("time")}</div>
            <div>{t("place")}</div>
          </div>
          <div className="mb-[20%]">
            <span className="font-semibold text-lg sm:text-base">
              한국 전통혼례
            </span>
            로 <span className="font-semibold text-lg sm:text-base">야외</span>
            에서 진행합니다.
          </div>
          <div className=" w-[90%] rounded-3xl mb-[20%] bg-white   text-center leading-loose">
            <div className="my-[20%]">
              <div className="mb-[10%]">
                <div className="flex justify-center items-baseline">
                  <div>
                    {t("groomFatherName")} · {t("groomMotherName")}
                  </div>
                  <div className="text-xs mx-1 text-[#999]">
                    {t("'s")} {t("son")}
                  </div>
                </div>
                <div className="my-2 "> {t("groomName")}</div>
              </div>
              <div>
                <div className="flex justify-center items-baseline ">
                  <div>
                    {t("brideFatherName")} · {t("brideMotherName")}
                  </div>
                  <div className="text-xs mx-1 text-[#999]">
                    {t("'s")} {t("daughter")}
                  </div>
                </div>
                <div className=" my-2">{t("brideName")}</div>
              </div>
            </div>

            <div className="text-center leading-[48px] mb-[20%]">
              평생 함께하고 싶은 사람을 만나
              <br />
              부부의 연을 맺고자 합니다.
              <br />
              서로 아끼고 사랑하며 살겠습니다.
              <br />
              참석해주셔서 축복해주시면
              <br />큰 기쁨으로 간직하겠습니다.
            </div>

            <button
              className="bg-[#ffb6c1] mb-[20%] rounded py-1 px-2 font-semibold text-xl sm:text-lg  hover:shadow-md"
              onClick={() => {
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSfWSB34WkeIedPglfTlANpQWqWBSYzUesLuv5c6J9CBWiwlqA/viewform?usp=sf_link"
                );
              }}
            >
              {t("attendance")}
            </button>
          </div>
          <Gallery />
          <Calendar t={t} />
          <div className=" title">{t("comment")}</div>
          <Comment />
        </div>
        <Map t={t} />
        <Clipboards />
        <Share t={t} />
      </div>
    </div>
  );
};

export default Main;
