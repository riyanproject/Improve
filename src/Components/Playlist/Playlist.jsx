import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './Playlist.css'

const getYouTubeVideoID = (url) => {
  const regExp = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const Playlist = () => {
  const [link, setLink] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [videoTitles, setVideoTitles] = useState({});
  const [favorites, setFavorites] = useState([]);  // State for favorite videos
  const cardsRef = useRef(null);
  const navigate = useNavigate();

  const fetchVideoTitle = async (videoID) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoID}&format=json`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setVideoTitles((prev) => ({ ...prev, [videoID]: data.title }));
      } else {
        setVideoTitles((prev) => ({ ...prev, [videoID]: "Title not found" }));
      }
    } catch (error) {
      console.error("Error fetching video title:", error);
      setVideoTitles((prev) => ({ ...prev, [videoID]: "Error fetching title" }));
    }
  };

  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem("playlist")) || [];
    setPlaylist(storedPlaylist);
  }, []);

  useEffect(() => {
    playlist.forEach((videoLink) => {
      const videoID = getYouTubeVideoID(videoLink);
      if (videoID && !videoTitles[videoID]) {
        fetchVideoTitle(videoID);
      }
    });
  }, [playlist, videoTitles]);

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
    navigate(`/player1/${videoID}`);
  };

  const toggleFavorite = (videoID) => {
    setFavorites((prevFavorites) => 
      prevFavorites.includes(videoID) 
      ? prevFavorites.filter(id => id !== videoID) 
      : [...prevFavorites, videoID]
    );
  };

  const deleteVideo = (videoLink) => {
    const newPlaylist = playlist.filter(link => link !== videoLink);
    setPlaylist(newPlaylist);
    localStorage.setItem("playlist", JSON.stringify(newPlaylist));
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
          Add to Playlist +
        </button>
      </div>
      <div className="card-list" ref={cardsRef}>
        {playlist.map((videoLink, index) => {
          const videoID = getYouTubeVideoID(videoLink);
          const thumbnailUrl = videoID
            ? `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`
            : "";

          return (
            <div key={index} className="card">
              <img
                src={thumbnailUrl}
                alt={`Thumbnail for video ${index + 1}`}
                width="240"
                
                onClick={() => handleVideoClick(videoID)}
              />
              <div className="video-title-container">
                <p className="video-title">
                  {videoTitles[videoID] || "Loading..."}
                </p>
              </div>
              <div className="card-buttons">
                <button
                  className={`button-edit ${favorites.includes(videoID) ? 'favorite' : ''}`}
                  onClick={() => toggleFavorite(videoID)}
                >
                  {favorites.includes(videoID) ? '💖' : '❤︎'}
                </button>
                <button
                  className="button-delete"
                  onClick={() => deleteVideo(videoLink)}
                >
                  ✖
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playlist;