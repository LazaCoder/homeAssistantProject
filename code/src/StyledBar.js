import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;
const StyledAppBar = styled(AppBar)`
  background-color: '#3f51b5'
  box-shadow: none;
`;

const StyledBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [toggleLuminosity, setToggleLuminosity] = useState(true);
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    airHumidity: 0,
    roomPressure: 0,
    luminosity: 0,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static">
      <Container maxWidth="md">
        <StyledToolbar>
          <Typography variant="h6" component="div">
            Home Assistant template
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link
                to="/dashboard"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Dashboard
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                O stranici
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                to="/history"
                style={{ textDecoration: "none", color: "inherit" }}
                
              >
                povijest
              </Link>
            </MenuItem>
          </Menu>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};

export default StyledBar;
