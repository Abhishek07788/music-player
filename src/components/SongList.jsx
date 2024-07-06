import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import { useDrag, useDrop } from "react-dnd";
import { assetsPATHS } from "../assets/paths";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
  color: "#fff",
  cursor: "pointer",
}));

const ItemTypes = {
  SONG: "song",
};

const DraggableRow = ({ song, index, moveSong, onClick, currentSong }) => {
  const [, ref] = useDrag({
    type: ItemTypes.SONG,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.SONG,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveSong(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <TableRow
      onClick={() => onClick(song, index)}
      ref={(node) => ref(drop(node))}
      key={song.id}
      sx={
        currentSong.id === song.id
          ? {
              bgcolor: "#520000",
              borderLeft: "4px solid red",
              cursor: "move",
            }
          : { cursor: "move" }
      }
    >
      <StyledTableCell>{index + 1}</StyledTableCell>
      <StyledTableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component={"img"}
            src={song.cover}
            alt={song.title}
            sx={{ width: 50, height: 30, marginRight: "10px" }}
          />
          <Typography variant="body1" sx={{ color: "#fff" }}>
            {song.title}
          </Typography>
        </Box>
      </StyledTableCell>
      <StyledTableCell>{song.playing}</StyledTableCell>
      <StyledTableCell>{song.time}</StyledTableCell>
      <StyledTableCell sx={{ textAlign: "right" }}>
        <Typography variant="subtitle2" noWrap width={100}>
          {song.album}
        </Typography>
      </StyledTableCell>
    </TableRow>
  );
};

const SongList = ({ songs, moveSong, handleSetCurrentSong, currentSong }) => {
  return (
    <>
      <Box
        component={"img"}
        display={{ xs: "none", md: "block" }}
        height={300}
        width={"100%"}
        src={assetsPATHS.artist}
        alt={"artist"}
        pb={10}
      />
      <Stack
        px={2}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h6" fontWeight={"bold"}>
          Popular
        </Typography>
        <Typography variant="caption">See all</Typography>
      </Stack>
      <TableContainer component={Paper} sx={{ backgroundColor: "transparent" }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>TITLE</StyledTableCell>
              <StyledTableCell>PLAYING</StyledTableCell>
              <StyledTableCell>TIME</StyledTableCell>
              <StyledTableCell sx={{ textAlign: "right" }}>
                ALBUM
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.map((song, index) => (
              <DraggableRow
                onClick={handleSetCurrentSong}
                currentSong={currentSong}
                key={song.id}
                song={song}
                index={index}
                moveSong={moveSong}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SongList;
