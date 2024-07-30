import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Head, PlanList, PlanItem, AddButton } from "./styles.js";
import Header from "../../component/Header";
import Navbar from "../../component/NavBar";
import Modal from "./Modal/index.js";

const Schedule = () => {
  //연동
  const location = useLocation(); // location 객체를 사용
  const date = location.state?.date || "No date selected"; // location.state에서 date를 가져옴

  //const date = "2025-08-05"; //연동 전
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentPlan, setCurrentPlan] = useState(null);
  const [plans, setPlans] = useState([
    {
      plan_id: 1,
      place_id: "더 로얄 파크 호텔",
      description: "4성급",
      budget: 226319,
      date: "2024-08-06",
      time: "2024-08-06T10:00:00.000Z",
    },
    {
      plan_id: 2,
      place_id: "후루츠 가든 신선",
      description: "오후",
      budget: 10000,
      date: "2024-08-06",
      time: "2024-08-07T12:00:00.000Z",
    },
    {
      plan_id: 3,
      place_id: "스시마요 신사",
      description: "오후 5:00 영업 종료",
      date: "2024-08-06",
      time: "2024-08-08T14:00:00.000Z",
    },
  ]);

  /*
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/travels/${id}/plans?date=${date}`,
          {
            withCredentials: true,
          }
        );
        setPlans(response.data);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      }
    };
    fetchPlans();
  }, [id, date]);
  */

  const handleModalOpen = (mode, plan = null) => {
    setModalMode(mode);
    setCurrentPlan(plan);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddPlan = (newPlan) => {
    setPlans([...plans, newPlan]);
    handleModalClose();
  };

  const handleEditPlan = (updatedPlan) => {
    setPlans(
      plans.map((plan) =>
        plan.plan_id === updatedPlan.plan_id ? updatedPlan : plan
      )
    );
    handleModalClose();
  };

  const handleDeletePlan = (planId) => {
    setPlans(plans.filter((plan) => plan.plan_id !== planId));
  };

  return (
    <>
      <Header />

      {isModalOpen && (
        <Modal
          mode={modalMode}
          currentPlan={currentPlan}
          handleAddPlan={handleAddPlan}
          handleEditPlan={handleEditPlan}
          onClose={handleModalClose}
        />
      )}

      <Container>
        <Head>
          <div className="date-circle">{date.split("-")[2]}</div>
          <span className="date">{date}</span>
          <button className="add-button" onClick={() => handleModalOpen("add")}>
            항목 추가
          </button>
        </Head>
        <PlanList>
          {plans.map((item, index) => (
            <PlanItem key={index} item={item}>
              <div className="item-time">
                {item.time && <span>{item.time.substring(11, 16)}</span>}
              </div>
              <div className="item-content">
                <button
                  className="edit-button"
                  onClick={() => handleModalOpen("edit", item)}
                >
                  편집
                </button>

                <span className="place">{item.place_id}</span>
                {item.description && (
                  <span className="description">{item.description}</span>
                )}
                {item.budget && <span className="budget">{item.budget} ₩</span>}
              </div>
            </PlanItem>
          ))}
        </PlanList>
      </Container>
      <Navbar />
    </>
  );
};

export default Schedule;
