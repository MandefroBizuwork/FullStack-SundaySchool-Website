import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button } from "react-bootstrap";
import "../Styles/NewsSection.css";
import { toEthiopian } from "ethiopian-date";

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

  // Fetch data from backend
  useEffect(() => {
    const fetchContents = async () => {
      try {
        setLoading(true);
        const api = "http://localhost:2000/contents";
        const response = await fetch(api);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setContents(data.contents || []); // Ensure key matches backend
      } catch (e) {
        console.error("Fetch error:", e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  // Filter + Search logic
  const filteredContents = useMemo(() => {
    if (!contentsData) return [];

    let filtered =
      category === "ሁሉም"
        ? contentsData
        : contentsData.filter((item) => item.category === category);

    if (query.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase()) ||
          item.content?.toLowerCase().includes(query.toLowerCase())
      );
    }

    return filtered;
  }, [contentsData, category, query]);

  // Pagination
  const totalPages = Math.ceil(filteredContents.length / PAGE_SIZE);
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredContents.slice(start, start + PAGE_SIZE);
  }, [filteredContents, page]);

  // Ethiopian Date Formatter
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
        "መስከረም",
        "ጥቅምት",
        "ኅዳር",
        "ታህሳስ",
        "ጥር",
        "የካቲት",
        "መጋቢት",
        "ሚያዝያ",
        "ግንቦት",
        "ሰኔ",
        "ሐምሌ",
        "ነሐሴ",
        "ጳጉሜን",
      ];

      return `${ethDay} ${months[ethMonth - 1]} ${ethYear} ዓ.ም`;
    } catch (err) {
      console.error("Ethiopian date conversion error:", err);
      return "ቀን መቀየር አልተቻለም";
    }
  }

  return (
    <section
      id="news"
      className="bg-white featured my-2 shadow"
      style={{ paddingTop: "100px", paddingBottom: "100px" }}
    >
      {/* Title */}
      <h2 className="fw-bold shadow-sm py-4 mb-5 text-center">
        ዜናዎች፣ ወቅታዊ ክንውኖች እና ልዩ ልዩ ይዘቶች
      </h2>

      {/* Search & Filter */}
      <div className="container mb-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="newssearch">
              <i className="bi bi-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="ፈልግ..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>
          <div className="col-md-3 mt-3 mt-md-0">
            <select
              className="form-select"
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
      </div>

      {/* Articles Grid */}
      <div className="container">
        {loading ? (
          <div className="text-center py-5">Loading...</div>
        ) : (
          <div className="row g-4">
            {paginated.length === 0 && (
              <div className="col-12">
                <div className="alert alert-info text-center">
                  ምንም መረጃ አልተገኘም።
                </div>
              </div>
            )}

            {paginated.map((item) => (
              <div key={item.id} className="col-sm-6 col-lg-4">
                <div className="card h-100 shadow border-0">
                  <div style={{ height: "180px", overflow: "hidden" }}>
                    <img
                      src={
                        item.file_path
                          ? `http://localhost:2000/${item.file_path}`
                          : "/default-image.jpg"
                      }
                      alt={item.title}
                      className="w-100"
                      style={{ objectFit: "cover", height: "100%" }}
                    />
                  </div>

                  <div className="card-body d-flex flex-column">
                    <div className="mb-2 d-flex justify-content-between align-items-center">
                      <span className="badge bg-primary"><strong>{item.category}</strong></span>
                      <small className="text-muted">
                        {formatEthiopianDate(item.event_date)}
                      </small>
                    </div>

                    <h4 className="card-title"><strong>{item.title}</strong></h4>
                    <div
                      className="formatted-content mb-3"
                      style={{ flexGrow: 1, overflow: "hidden" }}
                      dangerouslySetInnerHTML={{
                        __html:
                          item.content?.slice(0, 100) ||
                          "<p>No description available.</p>",
                      }}
                    ></div>

                    <button
                      className="btn btn-outline-primary w-100 mt-auto"
                      onClick={() => setSelected(item)}
                    >
                     ክፈት
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-5">
            <nav>
              <ul className="pagination mb-0">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    ቀዳሚ
                  </button>
                </li>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const n = i + 1;
                  return (
                    <li
                      key={n}
                      className={`page-item ${n === page ? "active" : ""}`}
                    >
                      <button className="page-link" onClick={() => setPage(n)}>
                        {n}
                      </button>
                    </li>
                  );
                })}

                <li
                  className={`page-item ${
                    page === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    ቀጣይ
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Modal (View Full Content) */}
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
                <span className="badge bg-primary me-2">
                  {selected.category}
                </span>
                <small className="text-muted">
                  {formatEthiopianDate(selected.event_date)}
                </small>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: selected.content }}
              ></div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelected(null)}>
            ዝጋ
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
