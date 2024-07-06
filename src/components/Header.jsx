import React, { memo } from "react";
import {
  Grid,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  const navList = ["Music", "Podcast", "Live", "Radio"];
  return (
    <Grid position="static" sx={{ padding: "5px" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", gap: "20px" }}>
          {navList.map((nav) => (
            <Typography
              key={nav}
              variant="subtitle2"
              component="div"
              sx={{ flexGrow: 1, color: "#fff" }}
            >
              {nav}
            </Typography>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#2e0000",
            borderRadius: "12px",
            padding: "0 10px",
            width: "300px",
          }}
        >
          <InputBase
            placeholder="Michael Jackson"
            sx={{ color: "inherit", flex: 1 }}
          />
          <IconButton type="submit" sx={{ padding: "10px", color: "inherit" }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </Grid>
  );
};

export default memo(Header);
