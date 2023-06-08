import { useState } from "react";
import ShareModal from "./ShareModal";
import { FiShare2 } from "react-icons/fi";

const Share = ({ t }: any) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = () => {
    setOpenModal((current) => !current);
  };

  return (
    <footer className="bg-[#ffeef1] flex justify-center p-10">
      <div className="text-[8px]">Copyright © 2023 김선형</div>
      <button onClick={onClickToggleModal}>
        <div className="">
          <div className="border-[1px] border-black rounded-full p-1 w-fit mx-auto">
            <FiShare2 />
          </div>
          <div className="text-sm">{t("share")}</div>
        </div>
      </button>
      <ShareModal
        openModal={openModal}
        onClickToggleModal={onClickToggleModal}
      />
    </footer>
  );
};

export default Share;
