import { useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos, MdClose } from "react-icons/md";
const GalleryModal = ({ SliderData }: any) => {
  const [current, setCurrent] = useState<number>(0);
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
    <div>
      <div className="flex">
        {" "}
        <MdArrowBackIosNew />
        <MdArrowForwardIos />
        <MdClose />{" "}
      </div>
      갤러리 모달
    </div>
  );
};

export default GalleryModal;
