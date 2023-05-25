const Modal = ({ modalOpen, closeModal }: any) => {
  return (
    <div>
      <div
        className={`${
          modalOpen ? "" : "hidden"
        } w-[300px] h-[200px] z-[50] top-[50%] left-[30%] fixed bg-gray-400  border-2`}
      >
        <div>이름:</div>
        <div>내용:</div>
        <button onClick={closeModal} className="bg-purple-200">
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
