import { useState, useRef } from "react";
import GalleryModal from "./GalleryModal";
import SliderData from "./SliderData";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
const Gallery = () => {
  const [open, setOpen] = useState<boolean>(false);
  const element = useRef<HTMLDivElement>(null);

  const onMoveToElement = () => {
    element.current?.scrollIntoView({
      block: "start",
    });
  };

  const onClickToggleGallery = () => {
    setOpen((current) => !current);
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
              <div className="w-[50%] " key={index}>
                <img
                  className="h-[250px] w-[260px] rounded-md m-1 object-cover"
                  src={slide.image}
                  alt="갤러리 이미지"
                />
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={onClickToggleGallery}
        className={`${open ? "hidden" : ""}`}
      >
        <BsChevronDown />
      </button>
      <button onClick={onClickClose} className={`${open ? "" : "hidden"} `}>
        <BsChevronUp />
      </button>
      <GalleryModal SliderData={SliderData} />
    </div>
  );
};

export default Gallery;
