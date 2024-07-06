import { Box, styled, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
  color: "#fff",
}));

const SongTableBody = React.forwardRef(
  ({ song, index, currentSong, handleSetCurrentSong, ...props }, ref) => {
    return (
      <TableRow
        ref={ref}
        onClick={() => handleSetCurrentSong(song, index)}
        sx={{
          bgcolor: currentSong.id === song.id ? "#520000" : "transparent",
          borderLeft:
            currentSong.id === song.id ? "4px solid red" : "transparent",
        }}
        {...props}
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
  }
);

export default SongTableBody;
