import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const getYouTubeVideoID = (url) => {
  const regExp = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const Playlist = () => {
  const [link, setLink] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const cardsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem("playlist")) || [];
    setPlaylist(storedPlaylist);
  }, []);

  const handleAddLink = () => {
    if (link.trim()) {
      const newPlaylist = [...playlist, link];
      setPlaylist(newPlaylist);
      localStorage.setItem("playlist", JSON.stringify(newPlaylist));
      setLink("");
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const currentCardsRef = cardsRef.current;
    currentCardsRef.addEventListener("wheel", handleWheel);

    return () => {
      currentCardsRef.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleVideoClick = (videoID) => {
    console.log("VideoId", videoID);
    navigate(`/player1/${videoID}`);
  };
  

  return (
    <div className="playlist-container">
      <div className="title-cards">
        <h2>My Playlist</h2>
      </div>
      <div className="input-container">
        <input
          type="text"
          className="form-control"
          placeholder="Enter YouTube Video Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-secondary btn-lg"
          onClick={handleAddLink}
        >
          Add Playlist +
        </button>
      </div>
      <div className="card-list" ref={cardsRef}>
        {playlist.map((videoLink, index) => {
          const videoID = getYouTubeVideoID(videoLink);
          const thumbnailUrl = videoID
            ? `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`
            : "";

          return (
            <div
              key={index}
              className="card"
              onClick={() => handleVideoClick(videoID)}
            >
              <img
                src={thumbnailUrl}
                alt={`Thumbnail for video ${index + 1}`}
                width="240"
                height="135"
              />
              <p>Video {index + 1}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playlist;
