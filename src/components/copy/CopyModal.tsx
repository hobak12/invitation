const CopyModal = ({
  accountData,
  current,
  onClickToggleModal,
  openModal,
}: any) => {
  const copyClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${text}`);
    } catch (error) {
      alert("복사실패");
    }
  };
  return (
    <div
      className={`${
        openModal ? "" : "hidden"
      } fixed bottom-0 top-0 left-0 right-0 bg-black bg-opacity-80 z-40 `}
    >
      {accountData.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="bg-white rounded-lg fixed top-0 bottom-0 left-0 right-0 h-fit w-[250px] m-auto  z-50 text-center leading-[35px] p-2"
          >
            {index === current && (
              <div key={index}>
                <div className="">{item.bank}</div>
                <div>{item.number}</div>
                <div>{item.name}</div>
                <div className=" flex ">
                  <button
                    className="button_account"
                    onClick={() => copyClipboard(item.number)}
                  >
                    복사
                  </button>
                  <button
                    className="button_account"
                    onClick={() => onClickToggleModal(index)}
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CopyModal;
