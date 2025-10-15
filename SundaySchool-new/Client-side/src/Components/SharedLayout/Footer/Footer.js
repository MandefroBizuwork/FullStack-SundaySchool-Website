import React from "react";
import "../../../Styles/Footer.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFacebook, faTelegram, faYoutube,faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faCircleCheck,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
function Footer() {
  return (
    <div className="footer-section text-light" style={{backgroundColor:"#0A7163"}}>
      <div className="footer-container container d-flex flex-wrap justify-content-between">
        {/* About Section */}
        <div className="ft-info mb-4">
          <p className="ft-title fw-bold fs-5">
            ኦርቶዶክስ ሰንበት ትምህርት ቤት <span className="ft-sign">+</span>
          </p>
          <p className="ft-description" style={{ maxWidth: "300px" }}>
            በሰንበት ትምህርት ቤታችን ተማሪዎች ከመጽሐፍ ቅዱስ፣ ከቤተክርስቲያን ታሪክ 
            እና ከመንፈሳዊ ትምህርቶች ጋር የተያያዘ እውቀት ይማራሉ።
          </p>
        </div>

        {/* Programs / Courses */}
        <div className="ft-list mb-4">
          <p className="ft-list-title fw-bold">ትምህርቶች</p>
          <ul className="ft-list-items list-unstyled">
            <li><Link to="/courses#scripture" className="text-light">መጽሐፍ ቅዱስ</Link></li>
            <li><Link to="/courses#church-history" className="text-light">የቤተክርስቲያን ታሪክ</Link></li>
            <li><Link to="/courses#spiritual-lessons" className="text-light">መንፈሳዊ ትምህርቶች</Link></li>
            <li><Link to="/courses#hymns" className="text-light">የመዝሙር ትምህርት</Link></li>
            <li><Link to="/courses#life-lessons" className="text-light">ሕይወታዊ ትምህርቶች</Link></li>
          </ul>
        </div>

        {/* Legal / Info */}
        <div className="ft-list mb-4">
          <p className="ft-list-title fw-bold">አዋጅ መረጃ</p>
          <ul className="ft-list-items list-unstyled">
            <li><Link to="/legal" className="text-light">የአጠቃላይ መረጃ</Link></li>
            <li><Link to="/legal" className="text-light">የግላዊነት ፖሊሲ</Link></li>
            <li><Link to="/legal" className="text-light">የአገልግሎት ደንብ</Link></li>
            <li><Link to="/legal" className="text-light">እንዴት እንደሚሰራ</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="ft-list mb-4" id="contact">
          <p className="ft-list-title fw-bold">እኛን ያግኙ</p>
          <ul className="ft-list-items list-unstyled">
            <li><a href="mailto:info@orthodoxsundayschool.org" className="text-light">info@orthodoxsundayschool.org</a></li>
            <li><a href="mailto:contact@orthodoxsundayschool.org" className="text-light">contact@orthodoxsundayschool.org</a></li>
            <li><a href="tel:+251911123456" className="text-light">+251 911 123 456</a></li>
            <li><a href="tel:+251911654321" className="text-light">+251 911 654 321</a></li>
          </ul>
        </div>
      </div>

     <div className="ft-copyright text-center mt-4">
      <p>© 2025 ኦርቶዶክስ ሰንበት ትምህርት ቤት. ሁሉም መብቶች የተጠበቁ ናቸው።</p>

      <div className="d-flex justify-content-center flex-wrap gap-3 mt-2">
        <a
          href="https://web.facebook.com/profile.php?id=100082860816745"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary d-flex align-items-center gap-2"
        >
          <FontAwesomeIcon icon={faFacebook} /> Facebook
        </a>

        <a
          href="https://web.telegram.org/a/#-1002259641937"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-info d-flex align-items-center gap-2"
        >
          <FontAwesomeIcon icon={faTelegram} /> Telegram
        </a>

        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-danger d-flex align-items-center gap-2"
        >
          <FontAwesomeIcon icon={faYoutube} /> YouTube
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-warning d-flex align-items-center gap-2"
        >
          <FontAwesomeIcon icon={faInstagram} /> Instagram
        </a>
      </div>
    </div>
    </div>
  );
}

export default Footer;
