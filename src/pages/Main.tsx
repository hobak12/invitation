import { Comment } from "../components/Comment/index";
const Main = () => {
  return (
    <div className="flex flex-col mx-auto  bg-pink-200 w-[60%] ">
      <div>music</div>
      <img className="" src="/assets/marriage painting.png"></img>
      <div>영어/한국어</div>
      <div>김선형 & 판데이 수단슈</div>
      <div>결혼합니다</div>
      <div>2023년 9월 15일 토요일 오전 10시 30분</div>
      <div>세종대왕 기념관 궁중의례원</div>
      <button>참석여부 조사 모달</button>
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
