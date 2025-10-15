import "../Styles/featured.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toEthiopian } from "ethiopian-date";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // show 4 cards at a time
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const api = "http://localhost:2000/documents";
        const response = await fetch(api);

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setDocuments(data.Documents || []);
        console.log(data.Documents);
      } catch (e) {
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Limit description length
  const truncateDescription = (htmlString, limit = 150) => {
    const plainText = htmlString.replace(/<[^>]+>/g, "");
    if (plainText.length <= limit) return plainText;
    return plainText.slice(0, limit) + "...";
  };

  // Convert Gregorian → Ethiopian
  function formatEthiopianDate(iso) {
    if (!iso) return "ቀን የለም";

    try {
      const date = new Date(iso);
      const [ethYear, ethMonth, ethDay] = toEthiopian(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );

      const months = [
        "መስከረም", "ጥቅምት", "ኅዳር", "ታህሳስ",
        "ጥር", "የካቲት", "መጋቢት", "ሚያዝያ",
        "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜን"
      ];

      const monthName = months[ethMonth - 1] || "";
      return `${ethDay} ${monthName} ${ethYear} ዓ.ም`;
    } catch (err) {
      console.error("Ethiopian date conversion error:", err);
      return "ቀን መቀየር አልተቻለም";
    }
  }

  // Load more handler
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section className="featured my-5 shadow">
      <h2 className="mb-5 fw-bold shadow-sm py-3 text-center">
        የቅርብ ጊዜ መንፈሳዊ ጽሁፎች
      </h2>

      <div className="container">
        <div className="row g-4">
          {loading ? (
            <h5 className="text-center text-muted">በመጫን ላይ...</h5>
          ) : documents.length > 0 ? (
            documents.slice(0, visibleCount).map((item) => (
              <div
                className="col-md-6 col-lg-4 col-sm-12"
                data-aos="fade-up"
                key={item.id}
              >
                <div className="card shadow-sm text-center h-100 border-0">
                  <div className="card-body">
                    {item.file_path && (
                      <img
                        className="img-fluid mb-3 rounded"
                        src={`http://localhost:2000/${item.file_path}`}
                        alt={item.title}
                        style={{
                          maxHeight: "200px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                    )}

                    <h4 className="fw-bold text-primary">{item.title}</h4>

                    <p className="text-secondary small text-start">
                      {truncateDescription(item.description, 160)}
                    </p>

                    <small className="text-muted d-block mb-2">
                      {formatEthiopianDate(item.created_at)}
                    </small>

                    <Link
                      to={`/documents/${item.id}`}
                      className="btn btn-outline-primary btn-sm mt-2"
                    >
                      ሙሉውን ያንብቡ
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h4 className="text-danger text-center py-5">
              በዚህ ምድብ የተዘጋጀ ጽሑፍ የለም!
            </h4>
          )}
        </div>

        {/* Load more button */}
        {visibleCount < documents.length && (
          <div className="text-center mt-4">
            <button
              className="btn btn-outline-primary px-4"
              onClick={handleLoadMore}
            >
              ተጨማሪ ይመልከቱ
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Documents;
