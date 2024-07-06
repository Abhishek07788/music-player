import React, { memo } from "react";
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
import { assetsPATHS } from "../assets/paths";
import { Draggable, Droppable } from "react-beautiful-dnd";
import SongTableBody from "./SongTableBody";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
  color: "#fff",
}));

const SongList = ({ songs, handleSetCurrentSong, currentSong }) => {
  return (
    <>
      <Box
        component={"img"}
        display={{ xs: "none", sm: "block", md: "block" }}
        height={300}
        width={"90%"}
        margin={"auto"}
        src={assetsPATHS.artist}
        alt={"artist"}
        pb={10}
      />
      <Stack
        px={2}
        pt={2}
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
          <Droppable droppableId="droppable-1">
            {(provided) => (
              <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                {songs.map((song, index) => (
                  <Draggable key={song.id} draggableId={song.id} index={index}>
                    {(provided) => (
                      <SongTableBody
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        handleSetCurrentSong={handleSetCurrentSong}
                        currentSong={currentSong}
                        song={song}
                        index={index}
                        style={{ ...provided.draggableProps.style }}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </Table>
      </TableContainer>
    </>
  );
};

export default memo(SongList);
