import { useEffect } from "react";

declare global {
  export interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const Map = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.59035984926336, 127.04067085111706), //지도의 중심좌표.
      level: 4, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(
      37.59073497281094,
      127.04358664439376
    );

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    var iwContent =
        '<div style="font-size:14px; padding-left:4px;">세종대왕기념관 웨딩홀</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwPosition = new kakao.maps.LatLng(37.59073497281094, 127.04358664439376); //인포윈도우 표시 위치입니다

    // 인포윈도우를 생성하고 지도에 표시합니다
    var infowindow = new kakao.maps.InfoWindow({
      map: map, // 인포윈도우가 표시될 지도
      position: iwPosition,
      content: iwContent,
    });
    // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    infowindow.open(map, marker);
  }, []);

  return (
    <div>
      <div className="text-center ">오시는 길</div>
      <div className="border-2 text-center">
        <div>세종대왕 기념관 웨딩홀 (야외)</div>
        <div>서울 동대문구 회기로 56</div>
        <div>Tel:02-960-1700</div>
      </div>
      <div id="map" className="w-full h-[400px]"></div>
      <div className="flex justify-center bg-pink-200 my-3">
        <button
          className="button   flex"
          onClick={() => {
            window.open(
              "https://map.kakao.com/link/to/세종대왕기념관웨딩홀,37.59073497281094,127.04358664439376"
            );
          }}
        >
          <img
            className="w-[30px] h-[30px] "
            alt="naver"
            src="https://self.cryucompany.com/kakao-navi.png"
          />
          <div>카카오맵 길찾기</div>
        </button>
        <button
          className="button flex"
          onClick={() => {
            window.open(
              "https://map.naver.com/v5/?c=15,0,0,0,dh&lng=127.04358664439376&lat=37.59073497281094&type=0&title=세종대왕기념관웨딩홀"
            );
          }}
        >
          <img
            className="w-[30px] h-[30px] "
            alt="naver"
            src="https://self.cryucompany.com/naver-map.png"
          />
          <div>네이버 지도 길찾기</div>
        </button>
      </div>
    </div>
  );
};

export default Map;
