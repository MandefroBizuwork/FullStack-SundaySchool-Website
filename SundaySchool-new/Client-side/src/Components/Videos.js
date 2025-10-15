import React, { useEffect, useState } from "react";
import { toEthiopian } from "ethiopian-date";



const Videos = () => {
  const [error, setError] = useState("");
  const [videosData, setVideosData] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = "AIzaSyDBsOJqKLRAFuHFykjJho-V-gku-nTWjd4";
  const CHANNEL_ID = "UCt7ArdWcW7xSxvNi7tdLpKg";
  const fetchVideos = async (pageToken = "") => {
    try {
      setLoading(true);
      const api = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=6&pageToken=${pageToken}`;
      const response = await fetch(api);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setVideosData((prev) => [...prev, ...data.items]); // append new videos
      setNextPageToken(data.nextPageToken || null);
    } catch (e) {
      setError(e.message);
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

function formatEthiopianDate(iso) {
  if (!iso) return "ቀን የለም";

  try {
    const date = new Date(iso);

    // Convert Gregorian → Ethiopian
    const [ethYear, ethMonth, ethDay] = toEthiopian(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );

    const months = [
      "መስከረም", "ጥቅምት", "ኅዳር", "ታህሳስ",
      "ጥር", "የካቲት", "መጋቢት", "ሚያዝያ",
      "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜን"
    ];

    const monthName = months[ethMonth - 1] || "";
    return `${ethDay} ${monthName} ${ethYear} ዓ.ም`;
  } catch (err) {
    console.error("Ethiopian date conversion error:", err);
    return "ቀን መቀየር አልተቻለም";
  }
}


  return (
    <section className="container-fluid shadow bg-light clearfix my-5" style={{padding:"100px 0"}}>
      <div className="job-listings">
        <h2 className="text-center shadow mb-4" style={{padding:"20px 0"}}>የቅርብ ጊዜ ቪዲዮዎች</h2>
        <div className="row">
          {error ? (
            <div className="alert alert-danger text-center">{error}</div>
          ) : videosData.length > 0 ? (
            videosData.map((item, index) => {
              const videoId = item.id.videoId;
              const { title, description, thumbnails, publishedAt } = item.snippet;
              return (
                <div className="col-md-4" key={index}>
                  <div className="card mb-4 shadow-sm">
                       <iframe
                        width="100%"
                        height="300"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>                   

                    <div className="card-body">
                      <h5 className="card-title">{title}</h5>
                      <p className="text-muted small">
                        ቀን፡ {formatEthiopianDate(publishedAt)}
                      </p>                    
                     
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center">ቪዲዮ አልተገኘም</div>
          )}
        </div>

        {/* ✅ More Videos button */}
        {nextPageToken && (
          <div className="text-center my-3">
            <button
              className="btn btn-outline-primary"
              onClick={() => fetchVideos(nextPageToken)}
              disabled={loading}
            >
              {loading ? "በመጫን ላይ..." : "ተጨማሪ ቪዲዮዎች"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
export default Videos;
