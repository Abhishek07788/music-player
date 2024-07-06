import React, { forwardRef, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Slider,
  CircularProgress,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import LoopIcon from "@mui/icons-material/Loop";
import ShuffleIcon from "@mui/icons-material/Shuffle";

const NowPlaying = forwardRef((props, ref) => {
  const {
    currentSong,
    songs,
    isPlaying,
    currentTime,
    duration,
    onPlayPause,
    onNext,
    onPrevious,
    onSeek,
    loading,
  } = props;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (_, value) => {
    onSeek(value);
  };

  const handleNextSong = () => {
    onNext(songs.length - 1 === currentSong.index ? 0 : currentSong.index + 1);
  };
  useEffect(() => {
    if (currentTime === duration) {
      handleNextSong();
    }
  }, [currentTime, duration]);

  return (
    <Box
      sx={{
        bgcolor: "#760000",
        color: "#fff",
        m: 2,
        padding: "10px",
        borderRadius: "15px",
        width: "100%",
        textAlign: "center",
      }}
    >
      <Typography variant="caption">Now Playing</Typography>
      <Box
        component="img"
        src={currentSong.song.cover}
        alt={currentSong.song.title}
        sx={{
          width: "100%",
          height: { xs: 300, md: 120 },
          borderRadius: "10px",
          marginY: "10px",
        }}
      />
      <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
        {currentSong.song.title}
      </Typography>
      <Typography variant="caption">{currentSong.song.artist}</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginY: "10px",
        }}
      >
        <Typography variant="caption">{formatTime(currentTime)}</Typography>
        <Slider
          value={currentTime}
          min={0}
          max={duration}
          onChange={handleSeek}
          sx={{ color: "#fff", marginX: "25px", flexGrow: 1 }}
        />
        <Typography variant="caption">{formatTime(duration)}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton>
          <LoopIcon sx={{ color: "#fff" }} />
        </IconButton>
        <IconButton
          disabled={currentSong.index === 0}
          onClick={() => onPrevious(currentSong.index - 1)}
        >
          <SkipPreviousIcon sx={{ color: "#fff" }} />
        </IconButton>
        <IconButton onClick={onPlayPause}>
          {isPlaying && !loading ? (
            <PauseIcon sx={{ color: "#fff", fontSize: "30px" }} />
          ) : !isPlaying && !loading ? (
            <PlayArrowIcon sx={{ color: "#fff", fontSize: "30px" }} />
          ) : !isPlaying && loading ? (
            <CircularProgress
              style={{ width: "16px", height: "16px", color: "#fff" }}
            />
          ) : (
            <PauseIcon sx={{ color: "#fff", fontSize: "30px" }} />
          )}
        </IconButton>
        <IconButton onClick={handleNextSong}>
          <SkipNextIcon sx={{ color: "#fff" }} />
        </IconButton>
        <IconButton>
          <ShuffleIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Box>
      <audio ref={ref} src={currentSong?.song?.song} />
    </Box>
  );
});

export default NowPlaying;
