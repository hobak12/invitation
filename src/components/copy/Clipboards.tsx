import { ImPhone } from "react-icons/im";
import { CopyModal } from "./index";
import { useState } from "react";
import { accountData } from "./index";
import { isMobile } from "react-device-detect";

const Clipboards = () => {
  const [current, setCurrent] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = (index: number) => {
    setCurrent(index);
    setOpenModal((current) => !current);
  };

  return (
    <div className="w-full mb-[10%]">
      <div className="title ">연락처 & 마음 전하실 곳</div>
      <div className="flex flex-wrap my-[10%]">
        {accountData.map((item, index) => {
          return (
            <div className=" w-[40%] m-[5%] text-center" key={index}>
              <div className="text-xl sm:text-[17px]  font-bold mb-2">
                {item.person}
              </div>
              <div className="my-4">{item.name}</div>
              {isMobile ? (
                <a href={`tel:${item.phone}`}>
                  <ImPhone className="w-[50px]  mx-auto my-4" />
                </a>
              ) : (
                <div onClick={() => alert("이 기능은 모바일에서만 지원합니다")}>
                  <ImPhone className="w-[50px]  mx-auto my-4 hover:cursor-pointer" />
                </div>
              )}

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
