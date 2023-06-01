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
    <div>
      <button onClick={() => toggleLocales("en-US")} title="영어로 바꾸기">
        En
      </button>
      <button onClick={() => toggleLocales("ko-KR")} title="한글로 바꾸기">
        Ko
      </button>
    </div>
  );
};

export default Language;
