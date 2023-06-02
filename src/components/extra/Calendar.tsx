const Calendar = () => {
  const setDate = new Date("2023-09-24T00:00+0900");
  const now = new Date();
  const dis = setDate.getTime() - now.getTime();
  const min1 = 1000 * 60;
  const h = Math.ceil(dis / (min1 * 60 * 24));
  return (
    <>
      <img className="w-[75%]" src="/assets/calendar.png" />
      {h === 0 ? (
        <div className="bg-yellow-100 w-full text-center">
          오늘은 수단슈와 선형의 결혼식입니다!
        </div>
      ) : (
        <div className="bg-yellow-100 w-full text-center">
          {h > 0
            ? `수단슈와 선형의 결혼식이 ${h}일 남았습니다`
            : "2023년 9월 24일, 둘이 하나가 되었습니다"}
        </div>
      )}
    </>
  );
};

export default Calendar;
