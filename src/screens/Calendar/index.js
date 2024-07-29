
import {Calendar} from "antd"
import {useNavigate} from "react-router-dom";
import Navbar from '../../component/NavBar'; // 네비게이션 바 컴포넌트 임포트
import Header from '../../component/Header';
import './styles.css';

function MyCalendar() {
    const navigate = useNavigate();
    const onSelect = (date) => {
        const formattedDate = date.format('YYYY-MM-DD');
        navigate(`/schedule`, { state: { date: formattedDate } });
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