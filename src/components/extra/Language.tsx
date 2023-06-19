import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const Language = () => {
  const { i18n } = useTranslation("main");

  const toggleLocales = useCallback(
    (locale: string) => {
      i18n.changeLanguage(locale);
    },
    [i18n]
  );

  return (
    <div className="border-2 border-pink-200">
      <button
        className={`${
          i18n.language !== "en-US" ? "bg-[#ffb6c1]" : ""
        } px-3 py-1 hover:shadow-md`}
        onClick={() => toggleLocales("ko-KR")}
        title="한글로 바꾸기"
      >
        한
      </button>
      <button
        className={`${
          i18n.language === "en-US" ? "bg-[#ffb6c1]" : ""
        } px-2 py-1 hover:shadow-md`}
        onClick={() => toggleLocales("en-US")}
        title="영어로 바꾸기"
      >
        En
      </button>
    </div>
  );
};

export default Language;
