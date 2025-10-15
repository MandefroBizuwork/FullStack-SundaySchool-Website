import React from "react";
import Doctor from "../Assets/doctor-book-appointment.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFacebook, faTelegram, faYoutube,faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faCircleCheck,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate  } from "react-router-dom";
import "../Styles/Contactus.css";

function Contactus() {
  const navigate = useNavigate();

  const handleBookAppointmentClick = () => {
    navigate("/appointment");
  };

  return (
 <div className="ba-section shadow my-2" id="contactus">
    <h3 className="w-100 text-center text-bold">
    ያግኙን
    <hr/>
  </h3>
          {/* Contact Info */}
<div className="d-flex  justify-content-between align-items-center">

<div className="col-lg-4 mb-4"  >
  <div className="  h-100"  >
    <div className="">
      <h5 className="card-title text-primary"><FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} />አድራሻ</h5>
      <p className="card-text text-muted">
        አዲስ አበባ, ኢትዮጵያ <br />
        ቅዱስ ጊዮርጊስ ቤተ ክርስቲያን አቅራቢያ
      </p>

      <h5 className="card-title text-primary mt-4"><FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} />ስልክ</h5>
      <p className="card-text text-muted">+251 911 000 000</p>

      <h5 className="card-title text-primary mt-4"><FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} />ኢሜይል</h5>
      <p className="card-text text-muted">info@sundayschool.org</p>
    </div>
  </div>
</div>


<div className="ba-image-content">
  <div style={{ width: "100%", height: "400px" }}>
    <iframe
      title="google-map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.2847575749847!2d38.75881937572444!3d9.037768088850145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8f4658bd2561%3A0x435e620b7cd166e5!2zTWFoaWJlcmUgS2lkdXNhbiBCdWlsZGluZyB8IDUgS2lsbyB8IOGIm-GIheGJoOGIrSDhiYXhi7HhiLPhipUg4YiF4YqV4Yy7IHwgNSDhiqrhiI4!5e0!3m2!1sam!2set!4v1757748310826!5m2!1sam!2set"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
       
    ></iframe>
  </div>
</div>

</div>


<div className="ba-text-content d-flex justify-content-between align-items-center">
  
  <p className="ba-checks ba-check-first">
   <a href="https://web.facebook.com/profile.php?id=100082860816745" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faFacebook} color="#1877F2" />
</a>Facebook
  </p>
  <p className="ba-checks ba-check-first">
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faTelegram} color="#1877F2" />
</a>Telegram
  </p>
    <p className="ba-checks ba-check-first">
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faYoutube} color="#f21818ff" />
</a>Youtube
  </p>
    <p className="ba-checks ba-check-first">
     <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faInstagram} color="#f21818ff" />
</a>Instagram
  </p>

 
</div>





 {/* Contact Form */}
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary mb-4">መልዕክት ይላኩልን</h5>
                <form>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ሙሉ ስም"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="ኢሜይል"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="መልዕክትዎን ያስገቡ"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg">
                    መልዕክት ላክ
                  </button>
                </form>
              </div>
            </div>
          </div>
       








</div>
  );
}

export default Contactus;
