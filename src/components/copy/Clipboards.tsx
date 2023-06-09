import { ImPhone } from "react-icons/im";
import { CopyModal } from "./index";
import { useState } from "react";
import { accountData } from "./index";

const Clipboards = () => {
  const [current, setCurrent] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = (index: number) => {
    setCurrent(index);
    setOpenModal((current) => !current);
  };

  return (
    <div className="w-full">
      <div className="title ">연락처 & 마음 전하실 곳</div>
      <div className="flex flex-wrap my-[10%]">
        {accountData.map((item, index) => {
          return (
            <div className=" w-[40%] m-[5%] text-center" key={index}>
              <div className="text-xl sm:text-lg font-bold mb-2">
                {item.person}
              </div>
              <div className="my-2">{item.name}</div>
              <a href={`tel:${item.phone}`}>
                <ImPhone className="w-[50px] bg-yel mx-auto my-2" />
              </a>
              <button
                className="button"
                onClick={() => onClickToggleModal(index)}
              >
                계좌번호
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex">
        <CopyModal
          accountData={accountData}
          current={current}
          onClickToggleModal={onClickToggleModal}
          openModal={openModal}
        />
      </div>
    </div>
  );
};

export default Clipboards;
