
import {Calendar} from "antd"
import {useNavigate} from "react-router-dom";
import Navbar from '../../component/NavBar'; // 네비게이션 바 컴포넌트 임포트
import Header from '../../component/Header';
import './styles.css';

function MyCalendar() {
    const navigate = useNavigate();
    const onSelect = (date) => {
        // 확인
        //console.log('Selected date:', date.format('YYYY-MM-DD'));

        const formattedDate = date.format('YYYY-MM-DD');
        navigate(`/plan`, { state: { date: formattedDate } });
    };


    ////////////////////////////////////////////////
    // 3. 시각화
    return (
        <div>
            <Header/>
            <Navbar/>
            <Calendar onSelect={onSelect}/>
        </div>
    );
}

export default MyCalendar;