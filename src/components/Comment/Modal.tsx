import { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Modal = ({ setModalOpen, modalOpen, data }: any) => {
  const navigate = useNavigate();

  const closeModal = (e: any) => {
    e.stopPropagation();
    setModalOpen(false);
    navigate(`/`);
  };
  const paramId = useParams().id;
  const modalData = data.find((item: any) => item.id === paramId);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: any) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal(e);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div
      ref={modalRef}
      className={`${
        modalOpen ? "" : "hidden"
      } w-[300px] h-[200px] z-[50] top-[50%] left-[30%] fixed bg-gray-400  border-2`}
    >
      {modalData && (
        <>
          <div>이름:{modalData.name}</div>
          <div>내용:{modalData.context}</div>
        </>
      )}

      <button onClick={closeModal} className="bg-purple-200">
        닫기
      </button>
    </div>
  );
};

export default Modal;
