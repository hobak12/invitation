import { ImLink } from "react-icons/im";
import { useEffect } from "react";

const ShareModal = ({ openModal, onClickToggleModal }: any) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const shareKakao = (route: any, title: any) => {
    // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_MAP_KEY); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
      }

      kakao.Link.sendDefault({
        objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
        content: {
          title: title, // 인자값으로 받은 title
          description: "설명", // 인자값으로 받은 title
          imageUrl: "이미지 url",
          link: {
            mobileWebUrl: route, // 인자값으로 받은 route(uri 형태)
            webUrl: route,
          },
        },
        buttons: [
          {
            title: "title",
            link: {
              mobileWebUrl: route,
              webUrl: route,
            },
          },
        ],
      });
    }
  };

  const copyClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${text}`);
    } catch (error) {
      alert("복사실패");
    }
  };

  const test1 = "http://localhost:3000";
  const test2 = "테스트 메세지";

  return (
    <div
      className={`${
        openModal ? "" : "hidden"
      } bg-pink-300 rounded-lg fixed top-0 bottom-0 left-0 right-0 h-fit w-[300px] m-auto z-50 shadow-md `}
    >
      <div className="text-center py-3 border-b-2 ">공유하기</div>
      <div className=" flex gap-10 justify-center">
        <button className="my-5">
          <div
            onClick={() => copyClipboard(test1)}
            className="bg-gray-200 rounded-full p-2 w-fit mx-auto"
          >
            <ImLink />
          </div>
          <div>링크 복사 </div>
        </button>
        <button onClick={() => shareKakao(test1, test2)}>
          <img
            className="w-[30px] h-[30px] mx-auto"
            alt="kakaotalk share"
            src="https://self.cryucompany.com/kakaoButtonImg.png"
          />
          <div>카카오톡 공유</div>
        </button>
      </div>
      <button onClick={onClickToggleModal} className="button">
        닫기
      </button>
    </div>
  );
};

export default ShareModal;
