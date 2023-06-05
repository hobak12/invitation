import { useState } from "react";
import GalleryModal from "./GalleryModal";
import SliderData from "./SliderData";
const Gallery = () => {
  const [open, setOpen] = useState<boolean>(false);
  const onClickToggleGallery = () => {
    setOpen((current) => !current);
  };
  return (
    <div>
      <div className={`${open ? "" : "h-[500px]"}  overflow-hidden`}>
        <div className="flex flex-wrap">
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
      <button onClick={onClickToggleGallery} className="button">
        더보기
      </button>
      <button onClick={onClickToggleGallery} className="button">
        작게보기
      </button>
      <GalleryModal SliderData={SliderData} />
    </div>
  );
};

export default Gallery;
