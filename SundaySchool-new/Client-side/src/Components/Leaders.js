import React from "react";
import DoctorCard from "./DoctorCard";
import profile1 from "../Assets/manager.jfif";
import profile2 from "../Assets/teketay.jfif";
import profile3 from "../Assets/k.jfif";
import profile4 from "../Assets/profile-4.png";
import "../Styles/Leaders.css";

function Leaders() {
  return (
    <div className="doctor-section" id="leaders">
      <div className="dt-title-content">
        <h3 className="dt-title">
          <span>የደብሩ ሰበካ ጉባኤ አስተዳደር</span>
        </h3>

        <p className="dt-description">
        
        </p>
      </div>

      <div className="dt-cards-content">
        <DoctorCard
          img={profile1}
          name="መልአከ ሰላም ቀሲስ አዲስ"
          title="ዋና አስተዳዳሪ"
          stars="4.7"
          reviews="450"
        />
        <DoctorCard
          img={profile2}
          name="መልአከ ሰላም ቀሲስ ሞላ
"stars="4.7"
          reviews="450"
          title="ም/ሰብሳቢ"
          
        />
        <DoctorCard
          img={profile3}
          name="ስብከተ ወንጌል ሃላፊ"
          title="ስብከተ ወንጌል ሃላፊ"
          stars="4.7"
          reviews="450"
        />       
      </div>
    </div>
  );
}

export default Leaders;
