import { ImPhone } from "react-icons/im";
import { CopyModal } from "./index";
import { useState } from "react";
import { AccountData } from "./index";

const Clipboards = () => {
  const [current, setCurrent] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = (index: number) => {
    setCurrent(index);
    setOpenModal((current) => !current);
  };

  return (
    <div className="w-full">
      <div className="w-fit mx-auto text-2xl font-bold my-3">
        연락처 & 마음 전하실 곳
      </div>
      <div className="flex flex-wrap">
        {AccountData.map((item, index) => {
          return (
            <div className="bg-pink-200 w-[48%] m-[1%] text-center" key={index}>
              <div className="text-xl font-bold mb-2">{item.person}</div>
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
        {/* <div>
          <div>신랑측</div>
          <div>신랑 수단슈 판데이</div>
          <a href="tel:+358503245019">
            <ImPhone />
          </a>
          <button className="button"> 계좌번호</button>
        </div>
        <div>
          <div>신부측</div>
          <div>신부 김선형</div>
          <a href="tel:01075772564">
            <ImPhone />
          </a>

          <button className="buttons"> 계좌번호</button>
          <div>신부 아버지 김원중 </div>
          <a href="tel:01084642564">
            <ImPhone />
          </a>
          <button className="buttons"> 계좌번호</button>

          <button>신부 어머니 이봉선</button>
          <a href="tel:01081312564">
            <ImPhone />
          </a>
          <button className="buttons"> 계좌번호</button>
        </div> */}
        <CopyModal
          AccountData={AccountData}
          current={current}
          onClickToggleModal={onClickToggleModal}
          openModal={openModal}
        />
      </div>
    </div>
  );
};

export default Clipboards;
