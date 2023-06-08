import { MdArrowBackIosNew, MdArrowForwardIos, MdClose } from "react-icons/md";

const GalleryModal = ({
  sliderData,
  onClickToggleGalleryModal,
  openModal,
  current,
  setCurrent,
}: any) => {
  const length = sliderData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(sliderData) || sliderData.length <= 0) {
    return null;
  }

  return (
    <div
      className={`${
        openModal ? "" : "hidden"
      } bg-pink-200 rounded-2xl w-[500px] h-fit fixed top-0 left-0 right-0 bottom-0 m-auto `}
    >
      {sliderData.map((slide, index) => {
        return (
          <div key={index}>
            {index === current && (
              <img
                src={slide.image}
                alt="gallery modal"
                className=" object-cover h-[500px]  mx-auto"
              />
            )}
          </div>
        );
      })}
      <div className="bg-slate-200 p-2 mt-2 rounded-b-2xl">
        <div className="flex w-fit mx-auto bg">
          <MdArrowBackIosNew className="mx-4 text-2xl" onClick={prevSlide} />
          <MdArrowForwardIos className="mx-4 text-2xl" onClick={nextSlide} />
          <MdClose
            className="text-3xl absolute right-3 bottom-1 "
            onClick={onClickToggleGalleryModal}
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
