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
      } fixed bottom-0 top-0 left-0 right-0 bg-black bg-opacity-80 z-40 `}
    >
      <div
        className={`${
          openModal ? "" : "hidden"
        } bg-white rounded-lg sm:w-full w-[650px] h-fit fixed top-0 left-0 right-0 bottom-0 m-auto z-50`}
      >
        {sliderData.map((slide, index) => {
          return (
            <div key={index}>
              {index === current && (
                <img
                  src={slide.image}
                  alt="gallery modal"
                  className=" object-cover sm:h-[400px] h-[500px] p-1 mx-auto"
                />
              )}
            </div>
          );
        })}
        <div className="bg-slate-200 p-2  rounded-b-lg">
          <div className="flex w-fit mx-auto bg">
            <button>
              <MdArrowBackIosNew
                className="mx-4 text-2xl"
                onClick={prevSlide}
              />
            </button>
            <button>
              <MdArrowForwardIos
                className="mx-4 text-2xl"
                onClick={nextSlide}
              />
            </button>
            <button>
              <MdClose
                className="text-3xl absolute right-3 bottom-1 "
                onClick={onClickToggleGalleryModal}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
