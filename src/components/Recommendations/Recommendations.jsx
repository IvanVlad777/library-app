import axios from "axios";
import React, { useEffect, useState } from "react";
import "./recommendations.css";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://openlibrary.org/search.json?q=bestseller&limit=20"
        );
        setRecommendations(response.data.docs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Book Recommendations</h2>
      <div className="book_list">
        {recommendations &&
          recommendations.map((book, i) => (
            <div key={i}>
              <h3>{book.title}</h3>
              {book.cover_i && (
                <img
                  src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={`Cover of ${book.title}`}
                />
              )}
              <p>By {book.author_name && book.author_name[0]}</p>
              <p>{book.first_publish_year}</p>
              <a
                href={`https://openlibrary.org${book.key}`}
                target="_blank"
                rel="noreferrer"
              >
                Learn more
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Recommendations;
