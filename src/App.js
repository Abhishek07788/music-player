import React, { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SongList from "./components/SongList";
import NowPlaying from "./components/NowPlaying";
import { Box, Grid } from "@mui/material";
import { SongsData } from "./data/Songs";
import { styled } from "@mui/system";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";

const listBgcolor =
  "linear-gradient(180deg, rgba(75,0,1,1) 0%, rgba(17,9,9,1) 79%)";
const musicBgColor =
  "linear-gradient(180deg, rgba(40,9,9,1) 0%, rgba(17,9,9,1) 79%)";

const GridWithHiddenScrollbar = styled(Grid)(({ theme }) => ({
  overflow: "auto",
  background: listBgcolor,
  color: "#fff",
  height: "100vh",
  overflow: "auto",
  px: "15px",
  pb: 20,
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "-ms-overflow-style": "none", // IE and Edge
  "scrollbar-width": "none", // Firefox
}));

const App = () => {
  const [songs, setSongs] = useState(SongsData);
  const [currentSong, setCurrentSong] = useState({
    song: songs[0],
    index: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef(null);

  const handleSeek = useCallback((value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  }, []);

  const handleSetCurrentSong = useCallback((song, index) => {
    setCurrentSong({ song, index });
  }, []);

  const onPrevious = useCallback(
    (index) => {
      setCurrentSong({ song: songs[index], index });
    },
    [songs]
  );

  const onNext = useCallback(
    (index) => {
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

  const handleOnDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;
      const updatedSongs = Array.from(songs);
      const [movedSong] = updatedSongs.splice(result.source.index, 1);
      updatedSongs.splice(result.destination.index, 0, movedSong);
      setSongs(updatedSongs);
    },
    [songs]
  );

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Grid
        onClick={handleUserInteraction}
        container
        flexDirection={{ xs: "column-reverse", sm: "row", md: "row" }}
      >
        <Grid item md={2.5} sm={0} sx={{ background: "#0e0e0e" }}>
          <Sidebar />
        </Grid>
        <GridWithHiddenScrollbar item md={7} sm={7}>
          <Box display={{ xs: "none", md: "block" }}>
            <Header />
          </Box>
          <SongList
            currentSong={currentSong.song}
            songs={songs}
            handleSetCurrentSong={handleSetCurrentSong}
          />
        </GridWithHiddenScrollbar>
        <Grid
          item
          md={2.5}
          sm={5}
          sx={{
            background: musicBgColor,
            color: "#fff",
            display: "flex",
            alignItems: { xs: "center", sm: "center", md: "flex-end" },
          }}
        >
          <NowPlaying
            ref={audioRef}
            currentSong={currentSong}
            songs={songs}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNext={onNext}
            onPrevious={onPrevious}
            onSeek={handleSeek}
          />
        </Grid>
      </Grid>
    </DragDropContext>
  );
};

export default App;
