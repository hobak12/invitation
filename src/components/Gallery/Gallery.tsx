import { useState, useRef } from "react";
import GalleryModal from "./GalleryModal";
import sliderData from "./sliderData";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";
const Gallery = () => {
  const [current, setCurrent] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const element = useRef<HTMLDivElement>(null);

  const onMoveToElement = () => {
    element.current?.scrollIntoView({
      block: "start",
    });
  };

  const onClickToggleGallery = () => {
    setOpen((current) => !current);
  };

  const onClickToggleGalleryModal = (index: number) => {
    setOpenModal((current) => !current);
    setCurrent(index);
  };

  const onClickClose = () => {
    onMoveToElement();
    onClickToggleGallery();
  };

  return (
    <div className="mb-[20%] sm:ml-1 ml-3 ">
      <div className={`${open ? "" : "h-[500px]"}  overflow-hidden `}>
        <div ref={element} className="flex flex-wrap sm:gap-2 gap-3">
          {sliderData.map((slide, index) => {
            return (
              <div
                className="w-[48%] "
                key={index}
                onClick={() => onClickToggleGalleryModal(index)}
              >
                <img
                  className="sm:h-[150px] sm:w-[180px] h-[300px] w-[340px] rounded-md  object-cover "
                  src={slide.image}
                  alt="갤러리 이미지"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className=" w-[20px] mx-auto mt-5 ">
        <button
          onClick={onClickToggleGallery}
          className={`${open ? "hidden" : ""}`}
        >
          <BsChevronDown className="text-4xl " />
        </button>
        <button onClick={onClickClose} className={`${open ? "" : "hidden"} `}>
          <BsChevronUp className="text-4xl " />
        </button>
      </div>
      <GalleryModal
        sliderData={sliderData}
        onClickToggleGalleryModal={onClickToggleGalleryModal}
        openModal={openModal}
        current={current}
        setCurrent={setCurrent}
      />
    </div>
  );
};

export default Gallery;
