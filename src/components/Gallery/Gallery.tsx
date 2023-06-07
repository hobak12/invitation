import { useState, useRef } from "react";
import GalleryModal from "./GalleryModal";
import SliderData from "./SliderData";

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
    <div>
      <div className={`${open ? "" : "h-[500px]"}  overflow-hidden`}>
        <div ref={element} className="flex flex-wrap">
          {SliderData.map((slide, index) => {
            return (
              <div
                className="w-[50%]"
                key={index}
                onClick={() => onClickToggleGalleryModal(index)}
              >
                <img
                  className="h-[350px] w-[340px] rounded-md m-1 object-cover"
                  src={slide.image}
                  alt="갤러리 이미지"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className=" w-[20px] mx-auto m-5 ">
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
        SliderData={SliderData}
        onClickToggleGalleryModal={onClickToggleGalleryModal}
        openModal={openModal}
        current={current}
        setCurrent={setCurrent}
      />
    </div>
  );
};

export default Gallery;
