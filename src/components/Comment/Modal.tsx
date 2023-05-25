import { useParams } from "react-router-dom";

const Modal = ({ modalOpen, closeModal, data }: any) => {
  const paramId = useParams().id;
  const modalData = data.find((item: any) => item.id === paramId);
  console.log(modalData);

  return (
    <div>
      <div
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
    </div>
  );
};

export default Modal;
