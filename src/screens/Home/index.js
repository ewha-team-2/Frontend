import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AddButton,
  Container,
  ModalWrapper,
  ModalContent,
  CloseButton,
  SubmitButton,
  TravelList,
  TravelItem,
} from "./styles";
import Navbar from "../../component/NavBar";
import Header from "../../component/Header";

const Home = () => {
  const [travels, setTravels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTravel, setNewTravel] = useState({
    title: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const response = await axios.get('/travels', {
          withCredentials: true,
        });
        setTravels(response.data);
      } catch (error) {
        console.error("Failed to fetch travels:", error);
      }
    };
    fetchTravels();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTravel({ ...newTravel, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const travelData = {
      title: newTravel.title,
      start_date: newTravel.startDate,
      end_date: newTravel.endDate,
    };

    setTravels([...travels, travelData]);
    setIsModalOpen(false);

    try {
        const response = await axios.post('/travels', travelData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        if (response.status !== 201 && response.status !== 200) {
            throw new Error('Failed to create travel');
        }

        setTravels([...travels, response.data]);
        setNewTravel({ title: '', startDate: '', endDate: '' });
        setIsModalOpen(false);
    } catch (error) {
        console.error('Failed to create travel:', error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <AddButton onClick={() => setIsModalOpen(true)}>
          + 여행 일정 만들기
        </AddButton>
        {isModalOpen && (
          <ModalWrapper>
            <ModalContent onSubmit={handleSubmit}>
              <CloseButton onClick={() => setIsModalOpen(false)}>
                &times;
              </CloseButton>
              <input
                type="text"
                name="title"
                value={newTravel.title}
                onChange={handleInputChange}
                required
                placeholder="여행 제목"
              />
              <label>날짜</label>
              <input
                type="date"
                name="startDate"
                value={newTravel.startDate}
                onChange={handleInputChange}
                required
              />
              <input
                type="date"
                name="endDate"
                value={newTravel.endDate}
                onChange={handleInputChange}
                required
              />
              <SubmitButton type="submit">만들기</SubmitButton>
            </ModalContent>
          </ModalWrapper>
        )}

        <TravelList>
          <h2>내 여행</h2>
          {travels.map((travel, index) => (
            <TravelItem key={index}>
              <h3 className="title">{travel.title}</h3>
              <span className="date">
                {travel.start_date} - {travel.end_date}
              </span>
            </TravelItem>
          ))}
        </TravelList>
      </Container>
      <Navbar />
    </>
  );
};

export default Home;
