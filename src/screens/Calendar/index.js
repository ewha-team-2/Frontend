import { Calendar } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../component/NavBar"; // 네비게이션 바 컴포넌트 임포트
import Header from "../../component/Header";
import "./styles.css";

function MyCalendar() {
  const [userInteraction, setUserInteraction] = useState(false);
  const onPanelChange = (date, mode) => {
    setUserInteraction(false);
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const onSelect = (date) => {
    // 날짜 셀 클릭일 때만 이벤트 발생
    if (date && date.format && userInteraction) {
      const formattedDate = date.format("YYYY-MM-DD");
      console.log(id, formattedDate);
      navigate(`/schedule/${id}`, { state: { date: formattedDate } });
    }
    // 초기화
    setUserInteraction(false);
  };

  ////////////////////////////////////////////////
  // 3. 시각화
  return (
    <div>
      <Header />
      <Navbar />
      <Calendar
        onPanelChange={onPanelChange}
        onSelect={(date) => {
          onSelect(date);
          // 날짜 셀 클릭 시만 selectedDate를 설정
          setUserInteraction(true);
        }}
      />
    </div>
  );
}

export default MyCalendar;
