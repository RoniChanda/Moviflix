import { Link } from "react-router-dom";
import "./Reviews.css";

export default function Reviews({ reviews }) {
  return (
    <div className="reviews">
      <h1 className="reviews_heading">Reviews</h1>
      {!reviews && <p style={{ fontSize: "1.6rem" }}>--</p>}
      {reviews && reviews.length === 0 && (
        <p style={{ fontSize: "1.6rem" }}>--</p>
      )}
      {reviews &&
        reviews.slice(0, 3).map((review) => (
          <div key={review.id} className="review_card">
            <div className="review_user">
              <img
                src={`${import.meta.env.VITE_IMAGE_BASE_URL}${
                  review.author_details.avatar_path
                }`}
                alt={review.author_details.username}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/images/blank_pp.png";
                }}
              />
              <div>
                <p>{review.author_details.username}</p>
                <span>
                  <i
                    className="fas fa-star icon"
                    style={{ color: "#f08c00" }}
                  ></i>
                  {review.author_details.rating}
                </span>
              </div>
            </div>

            <p className="review_content">
              {review.content.length > 300
                ? review.content.slice(0, 300) + " . . ."
                : review.content}
              {review.content.length > 300 && (
                <Link to={review.url} className="read_more">
                  Read more
                </Link>
              )}
            </p>
          </div>
        ))}
    </div>
  );
}
