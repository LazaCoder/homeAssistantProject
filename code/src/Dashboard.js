import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardHeader,
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline,
  useTheme,
  createTheme,
  ThemeProvider,
  Button,
  Modal,
  Menu,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  FormControl,
} from "@mui/material";
import { RadialGauge } from "react-svg-gauge";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GaugeChart from "./GaugeChart";
import LinearGauge from "./LinearGauge";
import { Switch } from "@mui/material";
import styled from '@emotion/styled';




const theme = createTheme({
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#DAF5FF",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#F2E8CF",
    },
  },
});

const Dashboard = () => {
  const { state } = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [sensorsData, setSensorsData] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [chartTypes, setChartTypes] = useState({});
  const [lightState, setLightState] = useState(false);
  const theme = useTheme();

  const navigate = useNavigate();

  const Logo = styled.img`
    height: 40px;
  `;

  const handleChartTypeChange = (id, newChartType) => {
    setChartTypes((prevChartTypes) => ({
      ...prevChartTypes,
      [id]: newChartType,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let newSensorsData = [];
        for (let entityId of state.array) {
          const response = await axios.get(
            `http://${state.data}/api/states/${entityId.id}`,
            {
              headers: {
                Authorization: `Bearer ${state.bearer}`,
              },
            }
          );
          newSensorsData.push({
            id: entityId.id,
            value: response.data.state,
            visible: true,
            name: entityId.name,
            unit: entityId.unit,
            roomName: entityId.roomName,
          });
        }
        setSensorsData(newSensorsData);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [state.array, state.bearer, state.data]);

  useEffect(() => {
    const fetchLightState = async () => {
      try {
        const response = await axios.get(
          `http://${state.data}/api/states/light.virtual_light`,
          {
            headers: {
              Authorization: `Bearer ${state.bearer}`,
            },
          }
        );
        setLightState(response.data.state === "on");
      } catch (error) {
        console.error("Error fetching light state:", error);
      }
    };

    fetchLightState();
    const interval = setInterval(fetchLightState, 5000); // Fetch state every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [state.bearer, state.data]);

  const handleNavigate = (path) => {
    handleMenuClose();
    navigate(path, { state });
  };

  const handleLightToggle = async () => {
    try {
      await axios.post(
        `http://${state.data}/api/services/light/${
          lightState ? "turn_off" : "turn_on"
        }`,
        {
          entity_id: "light.virtual_light",
        },
        {
          headers: {
            Authorization: `Bearer ${state.bearer}`,
          },
        }
      );
      setLightState(!lightState); // Update local state
    } catch (error) {
      console.error("Error toggling light state:", error);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleCloseModal = () => {
    setSelectedSensor(null);
  };

  const setGaugeValues = (unit) => {
    switch (unit) {
      case "lx":
        return {
          min: 0,
          max: 1000,
          low: 200,
          medium: 500,
          high: 800,
        };
      case "%":
        return {
          min: 0,
          max: 100,
          low: 20,
          medium: 50,
          high: 80,
        };
      case "°C":
        return {
          min: -10,
          max: 40,
          low: 0,
          medium: 20,
          high: 30,
        };
      case "°F":
        return {
          min: 14,
          max: 104,
          low: 32,
          medium: 68,
          high: 86,
        };
      case "hPa":
        return {
          min: 900,
          max: 1100,
          low: 950,
          medium: 1000,
          high: 1050,
        };
      default:
        return {
          min: 0,
          max: 100,
          low: 20,
          medium: 50,
          high: 80,
        };
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const sensorsByRoom = sensorsData.reduce((result, sensor) => {
    result[sensor.roomName] = [...(result[sensor.roomName] || []), sensor];
    return result;
  }, {});

  return (
    <div className="back">
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Logo src="./FER_logo.png" alt="FER Logo" />
          <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 10 }}>
            Nadzorna ploča
          </Typography>
          <Button color="inherit" onClick={handleBack}>
            Back to config
          </Button>
          <div>
            <IconButton
              edge="end"
              color="inherit"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleNavigate("/dashboard")}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("/history")}>
                History
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" >
        <Box
          padding={2}
          bgcolor=""
          minHeight="calc(100vh - 64px)"
        >
          {Object.entries(sensorsByRoom).map(([roomName, sensors]) => (
            <Accordion key={roomName}   sx={{
              bgcolor: '#00A7E1', 
              
            }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{color: 'white'}} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" style={{color:'#FFFF', fontWeight: 'bold'}}>{roomName}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2} style={{justifyContent: 'center'}}>
                  {sensors
                    .filter((sensor) => sensor.visible)
                    .map((sensorData) => {
                      const gaugeValues = setGaugeValues(sensorData.unit);
                      const chartType =
                        chartTypes[sensorData.id] || "GaugeChart"; // Default to GaugeChart
                      return (
                        <Grid item xs={12} sm={6} md={4} key={sensorData.id}>
                          <Card style={{borderRadius: 50, }} elevation ={2} >
                            <CardHeader
                              title={
                                <Box style={{ textAlign: "center" }}>
                                  <Typography variant="h5" component="div">
                                    {sensorData.name}
                                  </Typography>
                                  <FormControl>
                                    <Select
                                      value={chartType}
                                      onChange={(event) =>
                                        handleChartTypeChange(
                                          sensorData.id,
                                          event.target.value
                                        )
                                      }
                                      style={{ marginTop: "0px" }}
                                    >
                                      <MenuItem value="GaugeChart">
                                        GaugeChart
                                      </MenuItem>
                                      <MenuItem value="LinearChart">
                                        LinearChart
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                  {sensorData.id ===
                                    "input_number.virtual_light_brightness" && (
                                    <>
                                      <Switch
                                        checked={lightState}
                                        onChange={handleLightToggle}
                                      />
                                    </>
                                  )}
                                </Box>
                              }
                            />
                            <CardContent>
                              {chartType === "GaugeChart" ? (
                                <GaugeChart
                                  value={sensorData.value}
                                  min={gaugeValues.min}
                                  max={gaugeValues.max}
                                  low={gaugeValues.low}
                                  medium={gaugeValues.medium}
                                  high={gaugeValues.high}
                                  unit={sensorData.unit}
                                  
                                />
                              ) : (
                                <LinearGauge
                                  title={sensorData.name}
                                  value={sensorData.value}
                                  min={gaugeValues.min}
                                  max={gaugeValues.max}
                                  low={gaugeValues.low}
                                  high={gaugeValues.high}
                                  unit={sensorData.unit}
                                />
                              )}
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
};

export default Dashboard;
