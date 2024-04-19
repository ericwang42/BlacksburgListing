import React from 'react';

const Review = ({ review }) => {
    return (
        <div className="mb-3 p-3 border border-dark">
            <p>Rating: {review.rating}</p>
            <p>Description: {review.description}</p>
        </div>
    );
};

export default Review;
