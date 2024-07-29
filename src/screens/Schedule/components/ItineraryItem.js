import React, { useState } from 'react';
import Modal from 'react-modal';
import './ItineraryItem.css';

const ItineraryItem = ({ item }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleButtonClick = () => {
    setModalIsOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setModalIsOpen(false); // 모달 닫기
  };

  return (
    <div className={`itinerary-item ${item.type}`}>
      <button className="item-button" onClick={handleButtonClick}>
        편집
      </button>
      <div className="item-header">
        <span className="item-title">{item.title}</span>
      </div>
      <div className="item-footer">
        <span className="item-type">{item.type}</span> 
        <span className="item-price">{item.price}</span>
        {item.time && <span className="item-time">{item.time}</span>}
      </div>
      {item.memo && <div className="item-memo">{item.memo}</div>}

      {/* 모달 컴포넌트 */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="편집하기">
        <h2>편집하기</h2>
        {/* 편집할 내용 폼 */}
        <form>
        <label>제목:</label>
          <input type="text" defaultValue={item.title} />

          <label> 종류:</label>
          <input type="text" defaultValue={item.type} />

          <label> 가격:</label>
          <input type="text" defaultValue={item.price} />

          <label> 메모:</label>
          <input type="text" defaultValue={item.memo} />

          {/* 추가적인 필드들 */}
          <button type="button" onClick={closeModal}>닫기</button>
          <button type="submit">저장</button>
        </form>
      </Modal>
    </div>
  );
};

export default ItineraryItem;