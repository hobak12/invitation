import { useState } from "react";
import ShareModal from "./ShareModal";
import { RiShareFill } from "react-icons/ri";

const Share = ({ t }: any) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = () => {
    setOpenModal((current) => !current);
  };

  return (
    <footer className="bg-[#ffeef1] flex justify-center items-center py-5">
      <div className="text-xs ">Copyright © 2023 김선형</div>

      <ShareModal
        openModal={openModal}
        onClickToggleModal={onClickToggleModal}
      />
      <button onClick={onClickToggleModal}>
        <div className=" relative sm:left-[60px] left-[190px] ">
          <div className="border-[1px] border-black rounded-full p-1 w-fit mx-auto">
            <RiShareFill />
          </div>
          <div className="text-sm sm:text-xs mt-1">{t("share")}</div>
        </div>
      </button>
    </footer>
  );
};

export default Share;
