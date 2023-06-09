import { useEffect } from "react";
import { FaBus, FaSubway, FaInfo, FaMapMarkerAlt } from "react-icons/fa";
import { ImPhone } from "react-icons/im";

declare global {
  interface Window {
    kakao: any;
    Kakao: any;
  }
}
const { kakao } = window;

const Map = ({ t }: any) => {
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
    <div className="mb-[20%] ">
      <div className=" title  ">{t("map")}</div>

      <div className=" border-2 border-pink-200 text-center bg-white rounded-lg w-fit p-4 my-4 mx-auto">
        <div className="mb-2">{t("time")}</div>
        <div>{t("place")}</div>
      </div>

      <div id="map" className="w-full h-[400px] sm:h-[300px]"></div>
      <div className="flex justify-center gap-10  mt-[2%] mb-[5%]">
        <button
          className="mapButton flex"
          onClick={() => {
            window.open(
              "https://map.kakao.com/link/to/세종대왕기념관웨딩홀,37.59073497281094,127.04358664439376"
            );
          }}
        >
          <img
            className="sm:w-[25px] sm:h-[25px]  w-[30px] h-[30px] "
            alt="naver"
            src="https://self.cryucompany.com/kakao-navi.png"
          />
          <div>카카오맵</div>
        </button>
        <button
          className="mapButton flex"
          onClick={() => {
            window.open(
              "https://map.naver.com/v5/?c=15,0,0,0,dh&lng=127.04358664439376&lat=37.59073497281094&type=0&title=세종대왕기념관웨딩홀"
            );
          }}
        >
          <img
            className="sm:w-[25px] sm:h-[25px] w-[30px] h-[30px] "
            alt="naver"
            src="https://self.cryucompany.com/naver-map.png"
          />
          <div>네이버 지도</div>
        </button>
      </div>
      <div className="sm:ml-5 w-[85%]  mx-auto text-base sm:text-sm leading-loose">
        <div className="border-b-2 ">
          <div className="flex items-center gap-1 ">
            <FaMapMarkerAlt />
            <div>서울 동대문구 회기로 56</div>
          </div>
          <div className="flex items-center gap-1 ">
            <ImPhone />
            <div>02-960-1700</div>
          </div>
          <div className="flex items-center gap-1 mb-3 ">
            <FaInfo />
            <div>세종대왕기념관 내부 어디든 주차(200대)</div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 font-semibold mt-3">
            <FaBus /> <div>버스정류장</div>
          </div>

          <div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <a
                  className="text-blue-600"
                  href="https://map.kakao.com/?busStopId=11060701007"
                >
                  세종대왕기념관
                </a>
                <div className="sm:text-xs">(06279) | 97m </div>
              </div>
              <div className="">
                <div className="flex items-center">
                  <div className="busBlue">간선</div>
                  <div>201</div>
                </div>
                <div className="flex items-center">
                  <div className="busGreen">지선</div>
                  <div>1226</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between my-3">
              <div className="flex items-center">
                <a
                  className="text-blue-600"
                  href="https://map.kakao.com/?busStopId=11060701008"
                >
                  세종대왕기념관
                </a>
                <div className="sm:text-xs">(06278) | 148m</div>
              </div>
              <div className="">
                <div className="flex items-center">
                  <div className="busBlue">간선</div>
                  <div>201</div>
                </div>
                <div className="flex items-center">
                  <div className="busGreen">지선</div>
                  <div>1226</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between my-3">
              <div className="flex items-center">
                <a
                  className="text-blue-600"
                  href="https://map.kakao.com/?busStopId=11060701005"
                >
                  한국과학기술원,
                  <br />
                  홍릉초등학교
                </a>
                <div className="sm:text-xs"> (06274) | 220m </div>
              </div>
              <div className="relative left-[26px] sm:left-[24px] top-[9px]">
                <div className="flex items-center ">
                  <div className="busBlue">간선</div>
                  <div>201, 273 </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between my-3">
              <div className="flex items-center">
                <a
                  className="text-blue-600"
                  href="https://map.kakao.com/?busStopId=11060701004"
                >
                  국방연구원
                </a>
                <div className="sm:text-xs">(06276) | 238m</div>
              </div>
              <div className="">
                <div className="flex items-center">
                  <div className="busBlue">간선</div>
                  <div>273</div>
                </div>
                <div className="flex items-center">
                  <div className="busGreen">지선</div>
                  <div>1226</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 font-semibold mb-2">
            <FaSubway /> <div>지하철역</div>
          </div>

          <div className="flex items-center">
            <a
              href="https://map.kakao.com/?subwayId=SES2641"
              className="text-blue-600 mr-2"
            >
              고려대역
            </a>
            <div className="text-white bg-yellow-900 rounded-full text-sm w-5  h-5 text-center mr-2">
              6
            </div>
            <div className="mr-2">3번 출구</div>
            <div className="text-red-500 mr-2">도보 13분</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
