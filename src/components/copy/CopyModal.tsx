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
    <div>
      {accountData.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className={`${
              openModal ? "" : "hidden"
            } bg-pink-300 rounded-lg fixed top-0 bottom-0 left-0 right-0 h-fit w-[200px] m-auto`}
          >
            {index === current && (
              <div key={index}>
                <div>{item.bank}</div>
                <div>{item.number}</div>
                <div>{item.name}</div>
                <button
                  className="button"
                  onClick={() => copyClipboard(item.number)}
                >
                  복사
                </button>
                <button
                  className="button"
                  onClick={() => onClickToggleModal(index)}
                >
                  닫기
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CopyModal;
