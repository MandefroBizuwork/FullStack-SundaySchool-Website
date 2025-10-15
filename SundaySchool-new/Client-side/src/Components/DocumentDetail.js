import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toEthiopian } from "ethiopian-date";
function DocumentDetail() {
  const { id } = useParams();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocumentDetail = async () => {
      try {
        const res = await fetch(`http://localhost:2000/documents/${id}`);
        const data = await res.json();
        setDocuments(data.Documents || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentDetail();
  }, [id]);

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (documents.length === 0) {
    return (
      <div className="text-center my-5 text-danger">
        Document not found or invalid response.
      </div>
    );
  }
function formatEthiopianDate(iso) {
  if (!iso) return "ቀን የለም";

  try {
    const date = new Date(iso);

    // Convert Gregorian → Ethiopian
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
  return (
    <section className="my-5" style={{ padding: "100px 32px" }}>
      <div className="py-5">
        {documents.map((doc) => (
          <div key={doc.id} className="shadow p-4 mb-4">
           

            {doc.file_path ? (
              <img
                src={`http://localhost:2000/${doc.file_path}`}
                alt={doc.title}
                className="img-fluid mb-3 rounded"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            ) : (
              <p className="text-muted">No image available.</p>
            )}
 <h2 className="fw-bold text-primary mb-3">{doc.title}</h2>
            <div
              className="formatted-content"
              dangerouslySetInnerHTML={{
                __html: doc.description || "<p>No description available.</p>",
              }}
            ></div>

            <p className="text-muted mt-3">
              {/* By {doc.author_name || "Unknown"} —{" "} */}
              {doc.created_at
                ? formatEthiopianDate(doc.created_at)
                : "Unknown date"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DocumentDetail;
