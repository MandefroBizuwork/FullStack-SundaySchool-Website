import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { toEthiopian } from "ethiopian-date";
import "../Styles/NewsSection.css";

const categories = [
  { id: 1, name: "ሁሉም" },
  { id: 2, name: "ዜና" },
  { id: 3, name: "ክንውን" },
  { id: 4, name: "መዝሙር" },
  { id: 5, name: "ትምህርት" },
  { id: 6, name: "ልዩ ይዘት" },
];

const PAGE_SIZE = 3;

export default function NewsSection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ሁሉም");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [contentsData, setContents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:2000/contents");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setContents(data.contents || []);
      } catch (e) {
        console.error("Fetch error:", e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContents();
  }, []);

  const filteredContents = useMemo(() => {
    if (!contentsData) return [];
    let filtered =
      category === "ሁሉም"
        ? contentsData
        : contentsData.filter((item) => item.category === category);

    if (query.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase()) ||
          item.content?.toLowerCase().includes(query.toLowerCase())
      );
    }

    return filtered;
  }, [contentsData, category, query]);

  const totalPages = Math.ceil(filteredContents.length / PAGE_SIZE);
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredContents.slice(start, start + PAGE_SIZE);
  }, [filteredContents, page]);

  const formatEthiopianDate = (iso) => {
    if (!iso) return "ቀን የለም";
    try {
      const date = new Date(iso);
      const [y, m, d] = toEthiopian(date.getFullYear(), date.getMonth() + 1, date.getDate());
      const months = [
        "መስከረም", "ጥቅምት", "ኅዳር", "ታህሳስ", "ጥር", "የካቲት",
        "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜን"
      ];
      return `${d} ${months[m - 1]} ${y} ዓ.ም`;
    } catch {
      return "ቀን መቀየር አልተቻለም";
    }
  };

  return (
    <section id="news" className="news-section py-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-4 section-title">
          📰 ዜናዎች፣ ወቅታዊ ክንውኖች እና ልዩ ይዘቶች
        </h2>

        {/* Search + Filter */}
        <div className="row justify-content-center mb-5 g-3">
          <div className="col-md-6">
            <div className="search-box shadow-sm">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="ፈልግ..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select
              className="form-select shadow-sm"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div className="row g-4">
            {paginated.length === 0 ? (
              <p className="text-center text-muted fs-5">ምንም መረጃ አልተገኘም።</p>
            ) : (
              paginated.map((item) => (
                <div key={item.id} className="col-lg-4 col-md-6">
                  <div className="news-card shadow-sm h-100 d-flex flex-column">
                    <div className="news-img-wrapper">
                      <img
                        src={
                          item.file_path
                            ? `http://localhost:2000/${item.file_path}`
                            : "/default-image.jpg"
                        }
                        alt={item.title}
                        className="news-img"
                      />
                    </div>

                    <div className="news-card-body d-flex flex-column p-3 flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-primary">{item.category}</span>
                        <small className="text-muted">{formatEthiopianDate(item.event_date)}</small>
                      </div>

                      <h5 className="fw-bold mb-2">{item.title}</h5>
                      <div
                        className="text-muted flex-grow-1"
                        dangerouslySetInnerHTML={{
                          __html: item.content?.slice(0, 120) || "<p>No content.</p>",
                        }}
                      ></div>

                      {/* See More Button FIXED AT BOTTOM */}
                      <div className="mt-auto pt-3">
                        <button
                          className="btn btn-outline-primary w-100 "
                          onClick={() => setSelected(item)}
                        >
                          ሙሉውን ክፈት <i className="bi bi-arrow-right-circle ms-1"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-container mt-5">
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage(page - 1)}>
                    ቀዳሚ
                  </button>
                </li>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <li key={i + 1} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setPage(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage(page + 1)}>
                    ቀጣይ
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal show={!!selected} onHide={() => setSelected(null)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selected?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <>
              {selected.file_path && (
                <img
                  src={`http://localhost:2000/${selected.file_path}`}
                  alt={selected.title}
                  className="img-fluid rounded mb-3"
                />
              )}
              <div className="mb-2">
                <span className="badge bg-primary me-2">{selected.category}</span>
                <small className="text-muted">{formatEthiopianDate(selected.event_date)}</small>
              </div>
              <div dangerouslySetInnerHTML={{ __html: selected.content }}></div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelected(null)}>
            ዝጋ
          </Button>
        </Modal.Footer>
      </Modal>
      <div class="et_pb_bottom_inside_divider" ></div>
    </section>
  );
}
