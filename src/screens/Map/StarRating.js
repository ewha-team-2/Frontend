// StarRating.js
import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import styled from "styled-components";

const StarSection = styled.div`
    margin: 10px 0;
    .star {
        color: yellow;
        font-size: 30px;
        cursor: pointer;
    }
`;

const StarRating = ({ starScore, setStarScore }) => {
    const ratingStarHandler = () => {
        let result = [];
        for (let i = 0; i < 5; i++) {
            result.push(
                <span key={i + 1} onClick={() => setStarScore(i + 1)}>
                    {
                        i + 1 <= starScore ?
                            <FaStar className="star" />
                            :
                            <FaRegStar className="star" />
                    }
                </span>
            );
        }
        return result;
    };

    return (
        <StarSection>
            {ratingStarHandler()}
        </StarSection>
    );
};

export default StarRating;
