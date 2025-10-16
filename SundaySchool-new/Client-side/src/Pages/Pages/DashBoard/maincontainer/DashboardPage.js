import React, { useEffect, useState } from "react";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    users: 0,
    courses: 0,
    documents: 0,
    contents: 0,
  });

  useEffect(() => {
    fetch("http://localhost:2000/api/dashboard/reports")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <MainHeader pagetype="ዋና ገጽ" />

      <section className="section dashboard">
        <div className="container-fluid">
          <div className="row g-4">
            {/* ትምህርቶች */}
            <div className="col-lg-4 col-md-6 ">
               <Link to="/CouresReport" className="text-decoration-none d-flex flex-column align-items-center justify-content-center flex-grow-1 ">
              <div className="card info-card coursecard">
                <div className="card-body text-center">
                  <div className="d-flex justify-content-center align-items-center mb-3 rounded-circle bg-success">
                    <i className="bi bi-book-half fs-3"></i>
                  </div>
                  <h5 className="card-title">ትምህርቶች</h5>
                  <h6>{stats.courses}</h6>
                  <p>ይህ ካርድ በክፍል ውስጥ ተዘጋጅተው ያሉ ትምህርቶችን ይሰጣል። የተለያዩ ርዕሶችን እና የሚሰጡ አማራጮችን ይመልከቱ።</p>
                </div>
               
              </div>
              </Link>
              
            </div>

            {/* ይዘቶች */}
            <div className="col-lg-4 col-md-6">
              <Link to="/ContentsReport" className="text-decoration-none d-flex flex-column align-items-center justify-content-center flex-grow-1">
              <div className="card info-card coursecard">
                <div className="card-body text-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center bg-success text-white mx-auto my-3">
                    <i className="bi bi-collection fs-3"></i>
                  </div>
                  <h5 className="card-title">ይዘቶች</h5>
                  <h6>{stats.contents}</h6>
                  <p>ትምህርቶች እና ማስታወሻ ይዘቶች እዚህ ይታያሉ። እንዲሁም የተዛማጁ ሰነዶች እንዴት እንደ ተዘጋጁ ማረጋገጫ ይሰጣል።</p>
                </div>
              </div>
              </Link>
            </div>

            {/* ሰነዶች / ማስታወሻዎች */}
            <div className="col-lg-4 col-md-6">
             <Link to="/ContentsReport" className="text-decoration-none d-flex flex-column align-items-center justify-content-center flex-grow-1">
              <div className="card info-card coursecard">
                <div className="card-body text-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center bg-success text-white mx-auto my-3">
                    <i className="bi bi-file-earmark-text fs-3"></i>
                  </div>
                  <h5 className="card-title">ሰነዶች / ማስታወሻዎች</h5>
                  <h6>{stats.documents}</h6>
                  <p>ይህ ካርድ የተዘጋጀ ሰነዶችን እና ማስታወሻዎችን ይሰጣል። የተለያዩ ሰነዶችን እና የተዘጋጀ ዝርዝሮችን ይመልከቱ።</p>
                </div>
              </div>
              </Link>
            </div>

            {/* አባላት */}
            <div className="col-lg-4 col-md-6">
             <Link to="/ContentsReport" className="text-decoration-none d-flex flex-column align-items-center justify-content-center flex-grow-1">
              <div className="card info-card coursecard">
                <div className="card-body text-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center bg-success text-white mx-auto my-3">
                    <i className="bi bi-people fs-3"></i>
                  </div>
                  <h5 className="card-title">አባላት</h5>
                  <h6>{stats.users}</h6>
                  <p>ይህ ካርድ ክፍል አባላትን ይሰጣል። በክፍል ውስጥ ያሉ አባላት ብዛትን እና የሚገኙ ዝርዝሮችን ይመልከቱ።</p>
                </div>
              </div>
              </Link>
            </div>
          </div>

          {/* Footer section inside dashboard */}
          <div className="text-center mt-5 text-muted small">
            © {new Date().getFullYear()} ሰንበት ትምህርት ስርዓት | በ MYL Software የተሰራ
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
