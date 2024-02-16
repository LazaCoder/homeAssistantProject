import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Typography, Grid, Box, Select,MenuItem, AppBar, Toolbar, IconButton,Menu } from '@mui/material';
import { makeStyles } from "@mui/styles";
import MenuIcon from '@mui/icons-material/Menu';
import styled from '@emotion/styled';
import HistoryChart from './HistoryChart';
import { groupBy } from 'lodash';



const RoomTitle = styled(Typography)`
  margin-top: 16px;
  color: #ffffff;
  text-align: center;
  font-size: 1.5em;
`;


const StyledBody = styled(Box)`
  background-color: ${(props) => (props.darkMode ? '#303030' : '#ffffff')};
`;

const MainContent = styled(Box)`
  padding: 16px;
  min-height: calc(100vh - 64px - 100px);
  background: linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);
  transition: background 0.5s;
`;

const useStyles = makeStyles((theme) => ({
  panel: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '16px',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0 6px 10px 4px rgba(33, 203, 243, .3)',
    },
  },
  chartTitle: {
    marginBottom: '8px',
    color: '#3f51b5',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: '0.0075em',
  },
  sensorName: {
    color: '#f50057',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
  appBar: {
    marginBottom: '0px',
    backgroundColor: '#3f51b5',
    transition: 'background-color 0.3s ease-in-out',
  },
  menuButton: {
    marginRight: '16px',
  },
  title: {
    flexGrow: 1,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: '0.0075em',
  },
}));
const HistoryPanel = () => {
  const classes = useStyles();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path, { state })
  };

  const sensorsByRoom = groupBy(state.array, 'roomName');

  return (
    <StyledBody>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            History Panel
          </Typography>
          <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleNavigation("/history")}>History</MenuItem>
            <MenuItem onClick={() => handleNavigation("/dashboard")}>Dashboard</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <MainContent>
        {Object.entries(sensorsByRoom).map(([roomName, sensors]) => (
          <div key={roomName}>
            <RoomTitle>{roomName}</RoomTitle>
            <Grid container spacing={2}>
              {sensors.map((sensor) => (
                <Grid item xs={12} sm={6} md={sensors.length <= 2 ? 12 / sensors.length : 4} key={sensor.id}>
                  <Box className={classes.panel}>
                    <Typography variant="h6" align="center" className={classes.chartTitle}>
                      {sensor.name}
                    </Typography>
                    <HistoryChart ipAddress={state.data} entityId={sensor.id} unit={sensor.unit} bearer = {state.bearer} />
                    <Typography variant="subtitle1" align="center" className={classes.sensorName}>
                      Sensor: {sensor.id}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </MainContent>
    </StyledBody>
  );
};


export default HistoryPanel;
