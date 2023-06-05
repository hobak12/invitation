import { useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos, MdClose } from "react-icons/md";
const GalleryModal = ({
  SliderData,
  onClickToggleGalleryModal,
  openModal,
  current,
  setCurrent,
}: any) => {
  const length = SliderData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  console.log(Array.isArray(SliderData));
  if (!Array.isArray(SliderData) || SliderData.length <= 0) {
    return null;
  }

  return (
    <div
      className={`${
        openModal ? "" : "hidden"
      } bg-pink-200 p-2 w-[320px] h-fit fixed top-0 left-0 right-0 bottom-0 m-auto `}
    >
      {SliderData.map((slide, index) => {
        return (
          <div key={index}>
            {index === current && (
              <img
                src={slide.image}
                alt="gallery modal"
                className="  object-cover"
              />
            )}
          </div>
        );
      })}
      <div className="flex justify-between">
        <div className="flex">
          <MdArrowBackIosNew onClick={prevSlide} />
          <MdArrowForwardIos onClick={nextSlide} />
        </div>
        <MdClose onClick={onClickToggleGalleryModal} />
      </div>
    </div>
  );
};

export default GalleryModal;
