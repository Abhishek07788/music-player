import React, { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SongList from "./components/SongList";
import NowPlaying from "./components/NowPlaying";
import { Box, Grid } from "@mui/material";
import { SongsData } from "./data/Songs";
import { styled } from "@mui/system";

const listBgcolor =
  "linear-gradient(180deg, rgba(75,0,1,1) 0%, rgba(17,9,9,1) 79%)";
const musicBgColor =
  "linear-gradient(180deg, rgba(40,9,9,1) 0%, rgba(17,9,9,1) 79%)";

const GridWithHiddenScrollbar = styled(Grid)(({ theme }) => ({
  overflow: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "-ms-overflow-style": "none", // IE and Edge
  "scrollbar-width": "none", // Firefox
}));

const App = () => {
  const [songs, setSongs] = useState(SongsData);
  const [currentSong, setCurrentSong] = useState({ song: songs[0], index: -1 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleMetadata);
      audio.addEventListener("loadeddata", handleLoadedData);
    }
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleMetadata);
        audio.removeEventListener("loadeddata", handleLoadedData);
      }
    };
  }, []);

  const handleMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedData = () => {
    setLoading(false);
  };

  const handleSeek = useCallback((value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  }, []);

  const moveSong = useCallback(
    (from, to) => {
      const updatedSongs = [...songs];
      const [movedSong] = updatedSongs.splice(from, 1);
      updatedSongs.splice(to, 0, movedSong);
      setSongs(updatedSongs);
    },
    [songs]
  );

  const handleSetCurrentSong = useCallback((song, index) => {
    setLoading(true);
    setCurrentSong({ song, index });
  }, []);

  const onPrevious = useCallback(
    (index) => {
      setLoading(true);
      setCurrentSong({ song: songs[index], index });
    },
    [songs]
  );

  const onNext = useCallback(
    (index) => {
      setLoading(true);
      setCurrentSong({ song: songs[index], index });
    },
    [songs]
  );

  const handleUserInteraction = () => {
    setUserInteracted(true);
  };

  useEffect(() => {
    if (audioRef.current && currentSong.song && userInteracted) {
      audioRef.current.src = currentSong.song.song;
      play();
    }
  }, [currentSong.song, userInteracted]);

  const play = () => {
    if (audioRef.current) {
      setIsPlaying(true);
      audioRef.current.play();
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying]);

  return (
    <Box sx={{ display: "flex" }} onClick={handleUserInteraction}>
      <Sidebar />
      <Grid container flexDirection={{ xs: "column-reverse", md: "row" }}>
        <GridWithHiddenScrollbar
          item
          md={9}
          sx={{
            background: listBgcolor,
            color: "#fff",
            height: "100vh",
            overflow: "auto",
            px: "15px",
          }}
        >
          <Box display={{ xs: "none", md: "block" }}>
            <Header />
          </Box>
          <SongList
            currentSong={currentSong.song}
            songs={songs}
            moveSong={moveSong}
            handleSetCurrentSong={handleSetCurrentSong}
          />
        </GridWithHiddenScrollbar>
        <Grid
          item
          md={3}
          display={"flex"}
          alignItems={"flex-end"}
          sx={{
            background: musicBgColor,
            color: "#fff",
          }}
        >
          <NowPlaying
            ref={audioRef}
            currentSong={currentSong}
            songs={songs}
            isPlaying={isPlaying}
            loading={loading}
            currentTime={currentTime}
            duration={duration}
            onPlayPause={handlePlayPause}
            onNext={onNext}
            onPrevious={onPrevious}
            onSeek={handleSeek}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
