import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  LoadScript,
} from "@react-google-maps/api";
import Header from "../../component/Header";
import Navbar from "../../component/NavBar";
import "./styles.css";
import StarRating from "./StarRating"; // StarRating 컴포넌트 임포트

// 구글 맵 컨테이너 스타일
const containerStyle = {
  width: "100%",
  height: "100%",
};

// 초기 위치 설정
const initialLocation = {
  lat: 37.557553156582,
  lng: 126.95519756536,
};

// API 키를 여기에 입력하세요
const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY; // 여기에 실제 API 키를 입력하세요

const Map = () => {
  const [mapCenter, setMapCenter] = useState(initialLocation);
  const [place, setPlace] = useState(null); // 전체 place 객체 저장
  const [placeId, setPlaceId] = useState(null); // place_id만 저장
  const [reviews, setReviews] = useState([]); // 리뷰 데이터 저장
  const [starScore, setStarScore] = useState(0); // 별점 상태
  const [comment, setComment] = useState(""); // 댓글 상태
  const [avgRating, setAvgRating] = useState(0); // 평균 평점 상태
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // 모바일 여부 확인
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 구글 맵 로드 후 처리
  const onLoadMap = useCallback((map) => {
    mapRef.current = map;
    console.log("지도 로드됨:", map);
  }, []);

  // 장소 검색 후 처리
  const onPlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places && Array.isArray(places) && places.length > 0) {
        const selectedPlace = places[0];
        const location = {
          lat: selectedPlace.geometry.location.lat(),
          lng: selectedPlace.geometry.location.lng(),
        };
        setMapCenter(location); // 지도 중심 업데이트
        mapRef.current.panTo(location); // 지도 중심 이동
        setPlace(selectedPlace); // 전체 place 객체 설정
        setPlaceId(selectedPlace.place_id); // place_id만 별도로 설정
        fetchReviews(selectedPlace.place_id); // 선택된 장소의 리뷰를 가져옵니다.
      } else {
        console.error("장소를 찾을 수 없습니다.");
      }
    } else {
      console.error("SearchBox ref가 설정되지 않았습니다.");
    }
  };

  // 리뷰 데이터 가져오기
  const fetchReviews = async (placeId) => {
    try {
      const response = await fetch(`/reviews/${placeId}`, {
        credentials: "include",
      });
      const data = await response.json();
      setReviews(data.reviews);
      if (data.avgRating) {
        setAvgRating(data.avgRating); // 평균 평점 설정
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  // 리뷰 제출 처리
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (placeId) {
      const newReview = {
        rating: starScore,
        comment,
      };

      try {
        const response = await fetch(`/reviews/${placeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newReview),
        });

        if (response.ok) {
          const createdReview = await response.json();
          setReviews((prevReviews) => [createdReview, ...prevReviews]);
          setStarScore(0);
          setComment("");
          // 리뷰 제출 후 평균 평점 업데이트
          fetchReviews(placeId);
        } else {
          throw new Error("Failed to create review");
        }
      } catch (error) {
        console.log(error);
        alert("리뷰 작성에 실패했습니다.");
      }
    } else {
      alert("장소를 선택해주세요.");
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
      libraries={["places"]} // places 라이브러리를 로드합니다
    >
      <div className="container">
        <Header />
        <Navbar />
        <div className="left-pane">
          <StandaloneSearchBox
            onLoad={(ref) => (searchBoxRef.current = ref)}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="장소를 검색하세요"
              className="search-input"
            />
          </StandaloneSearchBox>
          <div className="searched-place">
            {place && (
              <>
                <p>
                  <strong>{place.name}</strong>
                </p>
                <p>{place.formatted_address}</p>
              </>
            )}
          </div>
          <div className="reviews-section">
            {place && (
              <form className="review-form" onSubmit={handleSubmitReview}>
                <h3>리뷰 작성하기</h3>
                <label>별점:</label>
                <StarRating starScore={starScore} setStarScore={setStarScore} />
                <label htmlFor="comment">리뷰:</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <div className="button_div">
                  <button type="submit">제출</button>
                </div>
              </form>
            )}
            <h3>평균 평점 : {avgRating ? avgRating.toFixed(2) : "0.00"} </h3>
            <h3>리뷰</h3>
            {reviews.length > 0 ? (
              <ul>
                {reviews.map((review, index) => (
                  <li key={index}>
                    {review.User && review.User.userProfilePic && (
                      <img
                        src={review.User.userProfilePic}
                        alt={`${review.User.name}'s profile`}
                        style={{ width: "30px", borderRadius: "50%" }}
                      />
                    )}
                    <br />
                    <strong>
                      닉네임: {review.User ? review.User.name : "Unknown"}
                    </strong>
                    <br />
                    평점: {review.rating}
                    <br />
                    리뷰: {review.comment}
                  </li>
                ))}
              </ul>
            ) : (
              <p>리뷰가 없습니다.</p>
            )}
          </div>
        </div>
        <div className="right-pane">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={15}
            onLoad={onLoadMap}
          >
            <Marker position={mapCenter} />
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
};

export default Map;
