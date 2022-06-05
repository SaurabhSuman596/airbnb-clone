import { urlFor } from '../sanity';

const Review = ({ review }) => {
  return (
    <div className="review-box">
      <h1>{review.rating}</h1>
      <h2>{review.traveller.name}</h2>
      <img src={urlFor(review.traveller.image)} alt="" />
    </div>
  );
};

export default Review;
