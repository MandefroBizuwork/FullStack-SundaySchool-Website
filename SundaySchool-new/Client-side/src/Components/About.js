import React from "react";
import Doctor from "../Assets/church.jfif";
import SolutionStep from "./SolutionStep";
import "../Styles/About.css";

function About() {
  return (
    <div className="about-section shadow my-2 py-5 featured my-2" id="about">
      
      <div className="about-image-content col-lg-6 mb-4 mb-lg-0">
       
        <img src={Doctor} alt="Doctor Group" className="about-image1 img-fluid rounded shadow" />
      </div>

      <div className="about-text-content bg-opacity-50 p-5 rounded" style={{backgroundColor:"rgb(228 230 231 / 50%)"}}>
        <h3 className="about-title">
          <span>ስለ ማኅበሩ መሰረታዊ መረጃዎች</span>
        </h3>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed" style={{marginTop:"30px"}}>
          የኦርቶዶክስ ሰንበት ትምህርት ቤታችን በማህበረሰቡ ልጆች እምነታቸውንና እውቀታቸውን
          በአንድነት እንዲያጠናክሩ ተቋቁሟል። በመጽሐፍ ቅዱስ፣ በቅዱሳን ታሪክ እና
          በቤተክርስቲያን ባህል ላይ የተመሠረተ ትምህርት እንዲያገኙ በትጋት እንሠራለን።
        </p>
        <SolutionStep
          title="ስያሜ"
          description="ማኅበረ ቅዱሳን እግዚአብሔር ያከበራቸው የነቢያት፣ የሐዋርያት፣ የጻድቃንና የሰማዕታት በአጠቃላይ የቅዱሳን ገድል፣ ትሩፋትና አማላጅነት የሚዘከርበት በመሆኑ ‹‹ማኅበረ ቅዱሳን›› የሚል ስያሜውን አግኝቷል፡፡"
        />

        <SolutionStep
          title="ራእይ"
          description="በእምነት የተመሠረተ፣ በትምህርት የተጠናከረ ማህበረሰብ መፍጠር።"
        />

        <SolutionStep
          title="ተልእኮ"
          description=" ተማሪዎች የመንፈሳዊ እና የማህበራዊ ሕይወትን አንድ በማድረግ የተሟላ እድገት እንዲያገኙ መርዳት።"
        />

        <p className="about-description">
          <h3>ዓላማዎች</h3>
          <hr/>
          <ul className="abautlist">
          <li>የቤተ ክርስቲያን ተቋማዊ አስተዳደር፣ የአሠራር ሥርዐትና አስተሳሰብ፣ በቴክኖሎጂ እና በልዩ ልዩ መንገዶች በመደገፍ ዘመኑን ለዋጀ ጠንካራ አገልግሎት ማብቃት፤</li>
          <li>የከፍተኛ ትምህርት ተቋማት ተማሪዎችን ሙሉ ሰብእናን የሚገነባ ሥርዐተ ትምህርት በማስተማር ዘመኑን የዋጁ ምሉዕ ኦርቶዶክሳዊ የሆኑ በቤተ ክርስቲያን አስተዳደራዊ መዋቅር የሚያገለግሉ እንዲሁም በማኅበራዊ፣ በኢኮኖሚያዊ በፖለቲካዊ እና በሀገር አስተዳደር ጉዳዮች መሪ/ንቁ ተሳታፊ አገልጋዮችን ማፍራት እና ማሠማራት፤</li>
          <li>የተተኪውን ትውልድ ምንጭ ለማጎልበት የሰ/ት/ቤቶችን አቅም በማጠናከር የሕጻናት እና የወጣቶችን የተተኪነት ሚና ማሳደግ፤</li>
          <li>ኦርቶዶክሳዊ መንፈሳዊነትን በተግባር የሚገልጽ ቤተሰብ እና አንድነቱን የጠበቀ ኦርቶዶክሳዊ ማኅበረሰብ በመገንባት የተደራጀ እና የተናበበ አገልግሎት መስጠት፤</li>
          <li>በተደራጀ እና ተደራሹን ማእከል ባደረገ መንገድ ስብከተ ወንጌልንና ሐዋርያዊ ተልእኮን ዘርፈ ብዙ በሆኑ መንገዶች በመላው ዓለም ማስፋፋት፤</li>
          <li>በቤተ ክርስቲያን ላይ የሚነዙትን የርእዮተ ዓለም፣ የሐሰት ትርክቶች እና የአጽራረ ቤተ ክርስቲያንን እንቅስቃሴ ጥናት እና ምርምር ላይ ተመርኩዞ መሞገት እና የተሳሳቱትን በማረም፣ በጠንካራ የዕቅበተ እምነት አገልግሎት የቤተ ክርስቲያንን ሕልውና ማስጠበቅ፤</li>
          <li>በተመረጡ ገዳማት እና አብነት ትምህርት ቤቶች የልኅቀት ማእከል እና የተለየ ክርስቲያናዊ ተልእኮ የሚፈጽሙ እንዲሆኑ የሚያስችል ሁለገብ የአእምሮ ልማት ድጋፍ ማድረግ፤</li>
          <li>ማኅበሩ ዘመኑን የዋጀ ተቋማዊ የአሠራር ሥርዓት በመዘርጋት ተልእኮውን ማሳካት የሚችልበት አቅም መፍጥር ( በአመራር፣ በሰው ኃይል፣ በመንፈሳዊነት፣ በግንኙነት፣ በዕውቀት፣በልማት፣ በፋይናንስ፣ በቴክኖሎጂ)፤</li>
          <li>ዓለም አቀፍ ግንኙነትና የትብብር አገልግሎትን መርሕ ያደረገ የኦርቶዶክሳውያን ኢኮኖሚያዊ፣ ማኅበራዊና ፖለቲካዊ ተሳትፎ ማሳደግ፣</li>
          </ul>
       </p>
 <button className="btn btn-primary">
          ተጨማሪ ይመልከቱ
        </button>
      </div>
    </div>
  );
}

export default About;
