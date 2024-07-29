import React, { useState } from 'react';
//import { useLocation } from 'react-router-dom'; 
import Itinerary from './components/Itinerary';
import './App.css';

const App = () => {
    //const location = useLocation(); // location 객체를 사용
    //const date = location.state?.date || 'No date selected'; // location.state에서 date를 가져옴
    //연동 후 주석 풀기

    // date를 사용하여 초기 itineraryData를 설정
    const [itineraryData, setItineraryData] = useState([
        {
            date: '2024.8.30',
            items: [
                {
                    title: '더 로얄 파크 호텔 후쿠오카',
                    price: '226,319 / 박',
                    type: '4성급',
                    memo: ''
                },
                {
                    title: '후루츠 가든 신선',
                    price: '약 10000~15000',
                    type: '카페',
                    memo: ''
                },
                {
                    title: '스미요시 신사',
                    price: '입장료 무료',
                    type: '신사',
                    memo: '오후 5:00 영업 종료'
                }
            ]
        }
    ]);

    const handleAddItem = (newItem) => {
        const updatedItinerary = [...itineraryData];
        updatedItinerary[0].items.push(newItem);
        setItineraryData(updatedItinerary);
    };

    return (
        <div className="App">
            {itineraryData.map((data, index) => (
                <Itinerary
                    key={index}
                    date={data.date}
                    items={data.items}
                    onAdd={handleAddItem}
                />
            ))}
        </div>
    );
};

export default App;
