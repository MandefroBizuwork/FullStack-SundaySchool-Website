import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoginModal from "../../LoginModal";
import SignUpModal from "../../SignUpModal";
import "../../../Styles/Navbar.css";
import { HashLink } from "react-router-hash-link";
import Logo from "../../../Assets/logo.PNG"; 
function Navbar() {
  const [nav, setNav] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Modals
  const [showSigninModal, setShowSignin] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // Scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`navbar-section ${showNavbar ? "show" : "hide"}`}
      role="navigation"
      aria-label="Main Navigation"
    >
      {/* Modals */}
      <LoginModal showModal={showSigninModal} onclose={() => setShowSignin(false)} />
      <SignUpModal showModal={showSignupModal} onclose={() => setShowSignupModal(false)} />

      {/* Logo */}
      <h1 className="navbar-title">
        {/* <Link to="/">
        ኦርቶዶክስ ሰንበት ትምህርት ቤት <span className="navbar-sign">+</span>
        </Link> */}
        <div className="navbar-logo">
  <Link to="/">
    <img
      src={Logo}
      alt="ኦርቶዶክስ ሰንበት ትምህርት ቤት"
      className="navbar-logo-img"
    />
  </Link>
</div>
      </h1>

      {/* Desktop Menu */}
      <ul className="navbar-items">
        <li><HashLink smooth to="/" className="navbar-links">ቀዳሚ ገጽ</HashLink></li>
        <li><HashLink smooth to="/Courses" className="navbar-links">ትምህርቶች</HashLink></li>
        <li><HashLink smooth to="/NewsSection" className="navbar-links">አዲስ መረጃዎች</HashLink></li>  
        <li><HashLink smooth to="/Video" className="navbar-links">ቪዲዮ</HashLink></li>
        <li><HashLink smooth to="/#about" className="navbar-links">ስለኛ</HashLink></li>
        {/* <li><a href="#contactus" className="navbar-links">ያግኙን</a></li> */}
        <li> <HashLink smooth to="/#contactus" className="navbar-links" >ያግኙን</HashLink></li>
      </ul>

      {/* Auth Buttons (Desktop) */}
      <div className="auth-buttons ms-auto navbar-items">
        <Link onClick={() => setShowSignupModal(true)} className="navbar-links butns">ተመዝገብ</Link>
        <Link onClick={() => setShowSignin(true)} className="navbar-links butns">ግባ</Link>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <button onClick={() => setNav(false)} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </button>

        <ul className="mobile-navbar-links">
          <li><Link onClick={() => setNav(false)} to="/">ቀዳሚ ገጽ</Link></li>
          <li><Link onClick={() => setNav(false)} to="/Courses">ትምህርቶች</Link></li>         
          <li><a onClick={() => setNav(false)} href="#reviews">ቪዲዮ</a></li>
           <li><a onClick={() => setNav(false)} href="#about">ስለኛ</a></li>
          <li><a onClick={() => setNav(false)} href="#contactus">ያግኙን</a></li>
          <li><Link onClick={() => { setNav(false); setShowSignupModal(true); }} className="butns">ተመዝገብ</Link></li>
          <li><Link onClick={() => { setNav(false); setShowSignin(true); }} className="butns">ግባ</Link></li>
        </ul>
      </div>

      {/* Hamburger Icon */}
      <button className="mobile-nav" onClick={() => setNav(true)}>
        <FontAwesomeIcon icon={faBars} className="hamb-icon" />
      </button>
    </nav>
  );
}

export default Navbar;
