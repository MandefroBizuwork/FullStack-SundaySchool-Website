import React, { useState, useEffect } from "react";
import "../Styles/Hero.css";

const slides = [
  {
    id: 1,
   headline:"እንኳን ወደ ድረ-ገጻችን በደህና መጡ",
    title: "በኢትዮጵያ ኦርቶዶክስ ተዋህዶ ቤተ ክርስቲያን የቅዱስ ሚካኤል ሰንበት ት/ቤት",
    description:
      "ሰንበት ትምህርት ቤታችን ለተማሪዎች በመንፈሳዊነት የተመሠረተ ትምህርት በማቅረብ፣  በቅዱሳን ትምህርት ላይ ተመስርቶ የሚያስተምር ማዕከል ነው። ከመንፈሳዊ ትምህርት ጋር በተስማሚ የማህበረሰብ እና የሕይወት ትምህርቶችንም በማቅረብ፣ የእውቀት እና የእምነት እድገትን እንዲያገኙ ይረዳል።",
      buttonText: "አባል ይሁኑ",
    image: require("../Assets/og.jpg"),
  },
  {
    id: 2,
   headline:"እንኳን ወደ ድረ-ገጻችን በደህና መጡ",
    title: "በኢትዮጵያ ኦርቶዶክስ ተዋህዶ ቤተ ክርስቲያን የቅዱስ ሚካኤል ሰንበት ት/ቤት",
    description:
      "ሰንበት ትምህርት ቤታችን ለተማሪዎች በመንፈሳዊነት የተመሠረተ ትምህርት በማቅረብ፣  በቅዱሳን ትምህርት ላይ ተመስርቶ የሚያስተምር ማዕከል ነው። ከመንፈሳዊ ትምህርት ጋር በተስማሚ የማህበረሰብ እና የሕይወት ትምህርቶችንም በማቅረብ፣ የእውቀት እና የእምነት እድገትን እንዲያገኙ ይረዳል።",
      buttonText: "አባል ይሁኑ",
    image: require("../Assets/1.jpg"),
  },
  {
    id: 3,
    headline:"እንኳን ወደ ድረ-ገጻችን በደህና መጡ",
    title: "በኢትዮጵያ ኦርቶዶክስ ተዋህዶ ቤተ ክርስቲያን የቅዱስ ሚካኤል ሰንበት ት/ቤት",
    description:
      "ሰንበት ትምህርት ቤታችን ለተማሪዎች በመንፈሳዊነት የተመሠረተ ትምህርት በማቅረብ፣  በቅዱሳን ትምህርት ላይ ተመስርቶ የሚያስተምር ማዕከል ነው። ከመንፈሳዊ ትምህርት ጋር በተስማሚ የማህበረሰብ እና የሕይወት ትምህርቶችንም በማቅረብ፣ የእውቀት እና የእምነት እድገትን እንዲያገኙ ይረዳል።",
      buttonText: "አባል ይሁኑ",
    image: require("../Assets/2.jpg"),
  },
  {
     id: 4,
   headline:"እንኳን ወደ ድረ-ገጻችን በደህና መጡ",
    title: "በኢትዮጵያ ኦርቶዶክስ ተዋህዶ ቤተ ክርስቲያን የቅዱስ ሚካኤል ሰንበት ት/ቤት",
    description:
      "ሰንበት ትምህርት ቤታችን ለተማሪዎች በመንፈሳዊነት የተመሠረተ ትምህርት በማቅረብ፣  በቅዱሳን ትምህርት ላይ ተመስርቶ የሚያስተምር ማዕከል ነው። ከመንፈሳዊ ትምህርት ጋር በተስማሚ የማህበረሰብ እና የሕይወት ትምህርቶችንም በማቅረብ፣ የእውቀት እና የእምነት እድገትን እንዲያገኙ ይረዳል።",
      buttonText: "አባል ይሁኑ",
    image: require("../Assets/3.jpg"),
}
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-carousel">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`carousel-slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
      <div className="overlay"></div>
       <div className="carousel-card">
        <div className="carousel-content">
          <h1 className="headline">{slide.headline}</h1>
          <h2 className="title">{slide.title}</h2>
          <h3 className="description">{slide.description}</h3>
          <h4 className="details">{slide.details}</h4>
          <button className="cta-btn">{slide.buttonText}</button>
        </div>
        {/* <div className="carousel-image">
          <img src={slide.image} alt={slide.title} />
        </div> */}
      </div>


        </div>
      ))}

      {/* Navigation Arrows */}
      <button className="nav-btn left" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="nav-btn right" onClick={nextSlide}>
        &#10095;
      </button>

      {/* Dots */}
      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          ></span>
        ))}
      </div>
       <div className="hero-curve">
       <svg  data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
       <path stroke="none"  fill="#F4F7FF" d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="_shape-fill_13pfy_228">
        </path>
       </svg>
      </div>
    </section>
  );
}

export default HeroCarousel;
