import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function CourseDetail() {
  const { catid } = useParams();

  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);
  const [category, setcategory] = useState([]);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const api = `http://localhost:2000/course/coursedetail/${catid}`;
        const response = await fetch(api);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCourses(data.courses || []); // adjust key based on your backend response
        setcategory(data.category[0] || []);
        
      } catch (e) {
        setError(e.message);
        console.error(e.message);
      }
    };

    fetchCourseDetail();
  }, [catid]);
console.log(courses)
console.log(category)
  return (
    <section className=" my-5" style={{ padding: "100px 32px" }}>
   
      <h2 className="text-center mb-4 fw-bold shadow py-4">
        የክፍል ምድብ - <strong className="text-primary"><i>{category.CATGORYNAME}</i></strong>
       
      </h2>
    
       {/* <hr className="bg-danger" style={{lineHeight:"4px",border:"1px solid", backgroundColor:"orange"}}/>  */}
     

      {/* {error && <p className="text-danger text-center">{error}</p>} */}
 <div className="shadow bg-light px-5 " >
      {courses.length > 0 ? (
        <ul className="">
          {courses.map((item) => (
            <li key={item.id} className="list-group-item">
             <h1 className="text-center text-decoration-underline">{item.Title}</h1>
              <h1>{item.subtitle}</h1>
               <div
                className="formatted-content"
                dangerouslySetInnerHTML={{ __html: item.description }}
              >  
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-danger text-center py-5">በዚህ ምድብ  የተዘጋጀ ትምርት የለም!</h2>
      )}
      </div>
    </section>
  );
}
