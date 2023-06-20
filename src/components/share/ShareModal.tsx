import { ImLink } from "react-icons/im";
import { useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";

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
          description: "부부가 되는 날,  소중한 분들을 초대합니다.", // 인자값으로 받은 title
          imageUrl: "/assets/marriage.png",
          link: {
            mobileWebUrl: route, // 인자값으로 받은 route(uri 형태)
            webUrl: route,
          },
        },
        buttons: [
          {
            title: "청첩장 보러가기",
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

  const test1 = "https://invitation-git-main-hobak12.vercel.app/";
  const test2 = "김선형 ♥ 판데이 수단슈 결혼합니다";

  return (
    <div
      className={`${
        openModal ? "" : "hidden"
      } fixed bottom-0 top-0 left-0 right-0 bg-black bg-opacity-80 z-40 `}
    >
      <div className="bg-white rounded-lg fixed top-0 bottom-0 left-0 right-0 h-fit w-[250px] m-auto z-50 ">
        <div>
          <div className="text-center border-b-2  py-4 ">공유하기</div>
          <button onClick={onClickToggleModal}>
            <RiCloseFill className="hover:bg-pink-200 rounded-full w-[22px] h-[22px]  absolute right-1 top-1 m-1" />
          </button>
        </div>

        <div className=" flex gap-10 justify-center mb-8 text-base">
          <button>
            <div
              onClick={() => copyClipboard(test1)}
              className="bg-gray-200 rounded-full p-2 w-fit mx-auto"
            >
              <ImLink />
            </div>
            <div className="mt-1">링크 복사 </div>
          </button>
          <button onClick={() => shareKakao(test1, test2)}>
            <img
              className="w-[30px] h-[30px] mx-auto"
              alt="kakaotalk share"
              src="https://self.cryucompany.com/kakaoButtonImg.png"
            />
            <div className="mt-1">카카오톡 공유</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
