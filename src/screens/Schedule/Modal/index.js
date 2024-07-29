import React, { useState, useEffect } from "react";
import "./styles.css";

const Modal = ({
  mode,
  currentPlan,
  handleAddPlan,
  handleEditPlan,
  onClose,
}) => {
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    if (mode === "edit" && currentPlan) {
      setPlace(currentPlan.place_id);
      setTime(currentPlan.time.substring(11, 16));
      setDescription(currentPlan.description);
      setBudget(currentPlan.budget);
    }
  }, [mode, currentPlan]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlan = {
      plan_id: currentPlan ? currentPlan.plan_id : Date.now(),
      place_id: place,
      time: new Date(`1970-01-01T${time}:00.000Z`).toISOString(),
      description,
      budget,
      date: currentPlan
        ? currentPlan.date
        : new Date().toISOString().split("T")[0],
    };

    if (mode === "add") {
      handleAddPlan(newPlan);
    } else if (mode === "edit") {
      handleEditPlan(newPlan);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
            placeholder="장소"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="메모"
          />
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="가격"
          />
          <div className="save-button-div">
            <button className="save-button" type="submit">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
