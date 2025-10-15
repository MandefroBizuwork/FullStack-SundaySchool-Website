import React from "react";
import InformationCard from "./InformationCard";
import { faHeartPulse, faTruckMedical, faTooth } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";

function Info() {
  return (
    <div className="info-section shadow my-2" id="services">
        
      <div className="info-title-content">
        <h3 className="info-title">
          <span>የቅርብ ጊዜ</span>
        </h3>
        <p className="info-description">
        የሰውን ልጅ የውድቀት ታሪክ ስንመለከት፣ የመጀመሪያው መንሥኤ የክፉ ምክር ውጤት እንደሆነ እንረዳለን። አባታችን አዳም የእግዚአብሔርን ሕግ ጠብቆ ለሰባት ዓመታት ያህል በገነት ቢኖርም፣ በሰይጣን ክፉ ምክር ተታሎ እግዚአብሔርን ያህል ጌታ ገነትን የመሰለ ቦታ አጥቷል። ይህ የሆነው በክፉ ምክር ምክንያት ነው። ዛሬም በዚህች ምድር፣ እንደ ጥንቱ ሁሉ፣ በማወቅም ሆነ ባለማወቅ በክፉ ምክር የሚያታልሉና ላልተገባ ነገር የሚዳርጉ ክፉ አማካሪዎች አይጠፉም።

በተቃራኒው ደግሞ ለበጎ ነገር የሚያነሣሱ፣ ትክክለኛውን መንገድ የሚያሳዩ፣ መርተው ወደ እግዚአብሔር የሚያደርሱ እንደ ሐዋርያው ፊልጶስ ያሉ መልካም አማካሪዎችና የልብ ወዳጆችም ብዙ ናቸው። (ዮሐ ፩፥፵፮-፶፩)
        </p>
      </div>
   

      <div className="info-cards-content">
        <InformationCard
          title="Emergency Care"
          description="Our Emergency Care service is designed to be your reliable support
            in critical situations. Whether it's a sudden illness, injury, or
            any medical concern that requires immediate attention, our team of
            dedicated healthcare professionals is available 24/7 to provide
            prompt and efficient care."
          icon={faTruckMedical}
        />

        <InformationCard
          title="Heart Disease"
          description="Our team of experienced cardiologists and medical experts use
            state-of-the-art technology to assess your cardiovascular health and
            design personalized treatment plans. From comprehensive screenings
            to advanced interventions, we are committed to helping you maintain
            a healthy heart and lead a fulfilling life."
          icon={faHeartPulse}
        />

        <InformationCard
          title="Dental Care"
          description="Smile with confidence as our Dental Care services cater to all your
            oral health needs. Our skilled dentists provide a wide range of
            treatments, from routine check-ups and cleanings to cosmetic
            procedures and restorative treatments."
          icon={faTooth}
        />
      </div>
    </div>
  );
}

export default Info;
