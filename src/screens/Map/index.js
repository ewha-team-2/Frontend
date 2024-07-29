import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import Navbar from '../../component/NavBar';
import Header from '../../component/Header';
import {GoogleMap, Marker, StandaloneSearchBox} from "@react-google-maps/api";
import { useNavigate } from 'react-router-dom';
import './styles.css';

///////////////////////////////////////////////////////
// [맵 서비스]

const containerStyle = {
    width: '100%',
    height: '100vh',
};

// 서울특별시 서대문구 신촌
// 위도: 37.557553156582
// 경도: 126.95519756536
const location = {
    lat: 37.557553156582,
    lng: 126.95519756536,
};


///////////////////////////////////////////////////////
const MyMap = ({isLoaded}) => {
    
    ///////////////////////////////////////////////////////
    // [검색 서비스]
    // 검색에 필요한 변수, 함수들
    const [mapCenter, setMapCenter] = useState(location);
    const mapRef = useRef(null);
    const searchBoxRef = useRef(null);

    // 검색 후 클릭한 장소 정보
    // placeId는 해당 장소에 대해 작성된 리뷰를 보기위해 필요 (이 때, 리뷰는 구글 리뷰가 아닌 우리 사이트 자체 리뷰)
    const [place, setPlace] = useState([]);

    const onLoadSearchBox = useCallback((ref) => {
        searchBoxRef.current = ref;
    }, []);

    const onLoadMap = useCallback((map) => {
        mapRef.current = map;
        console.log('Map Loaded:', map);
    }, []);

    const onPlacesChanged = () => {
        if (searchBoxRef.current) {
            const places = searchBoxRef.current.getPlaces();
            if (places && Array.isArray(places) && places.length > 0) {
                // 클릭한 장소
                const place = places[0];
                
                // 구글맵에서 해당 장소로 이동
                const location = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                setMapCenter(location);
                mapRef.current.panTo(location);

                setPlace(place);

            } else {
                //setMessage(`No places found. ${searchBoxRef.current.getPlaces()} #${places.length}`);
            }
        } else {
            console.error('SearchBox ref is not set.');
            //setMessage('SearchBox ref is not set.');
        }
    };


    ///////////////////////////////////////////////////////
    // [페이지 전환]
    // reviews로 이동
    const navigate = useNavigate();
    const handleNavigateToReviews = () => {
        if(place)
            navigate('/reviews', { state: { place } });
    };

    ///////////////////////////////////////////////////////
    // [시각화]
    return isLoaded ? (
        <div className='container'>  
            <Header/>
            <Navbar /> {/* 네비게이션 바 추가 */}
            {/** 검색 화면 */}
            <div className="left-pane">
                <StandaloneSearchBox
                    onLoad={onLoadSearchBox}
                    onPlacesChanged={onPlacesChanged}
                >
                    <input
                        type="text"
                        placeholder="Search for places"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `95%`,
                            height: `32px`,
                            margin: '27px 0px 0px 2.5%',
                            padding: `10px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipsis`,
                        }}
                    />
                </StandaloneSearchBox>

                {/** 디버깅용, 테스트 
                <div className="message-box">
                    {message}
                </div>
                */}

                {/** 검색된 장소 */}
                <div className="searched-place">
                    <p><strong>{place.name}</strong></p>
                    <p>{place.formatted_address}</p>
                    <button className="btn" onClick={handleNavigateToReviews}>
                        리뷰
                    </button>
                </div>
            </div>

            {/** 맵 화면 */}
            <div className="right-pane">
                <GoogleMap
                    //bootstrapURLKeys={{ key: API_KEY }} // API 키를 useJsApiLoader 훅을 통해 로드했기 때문에 GoogleMap 컴포넌트에서 다시 API 키를 설정할 필요는 없다.
                    mapContainerStyle={containerStyle}
                    center={mapCenter}
                    zoom={15}
                    onLoad={onLoadMap}
                >
                <Marker position={mapCenter} // (추가사항) 마커로 구글맵 위에 특정 장소 표시
                />
                </GoogleMap>
            </div>
        </div>
    ) : (
        <div>Error</div>  
    );
  };


export default MyMap;
