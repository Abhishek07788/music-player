import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import ExploreIcon from "@mui/icons-material/Explore";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from "@mui/icons-material/Login";
import { assetsPATHS } from "../assets/paths";

const color = "#f94646";

const menuItems = [
  { text: "Home", icon: <HomeIcon /> },
  { text: "Trends", icon: <TrendingUpIcon /> },
  { text: "Library", icon: <LibraryMusicIcon /> },
  { text: "Discover", icon: <ExploreIcon /> },
];

const generalItems = [
  { text: "Settings", icon: <SettingsIcon /> },
  { text: "Log Out", icon: <LoginIcon /> },
];

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: "300px",
        bgcolor: "#0e0e0e",
        color: "#fff",
        padding: "20px",
        display: { xs: "none", md: "block" },
      }}
    >
      <img height={40} src={assetsPATHS.webLogo} alt="logo" />
      <List sx={{ mt: 2 }}>
        <ListItem>
          <Typography variant="caption">MENU</Typography>
        </ListItem>
        {menuItems.map((item, index) => (
          <ListItem button key={index}>
            <ListItemIcon sx={{ color }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ position: "absolute", bottom: "20px" }}>
        <ListItem>
          <Typography variant="caption">GENERAL</Typography>
        </ListItem>
        {generalItems.map((item, index) => (
          <ListItem button key={index}>
            <ListItemIcon sx={{ color }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
