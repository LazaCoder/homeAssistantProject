import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 800,
    margin: "auto",
    marginTop: "5%",
    padding: "24px",
    borderWidth: "2px",
  },
  title: {
    marginBottom: "16px",
  },
  grid: {
    marginBottom: "16px",
  },
  addButton: {
    marginTop: "16px",
  },
  submitButton: {
    marginTop: "24px",
  },
  iconButton: {
    padding: "5px",
  },
}));

const ConfigurationPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [ipAddress, setIpAddress] = useState("");
  const [password, setPassword] = useState("");
  const [sensors, setSensors] = useState([]);
  const [names, setNames] = useState([]);
  const [units, setUnits] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [ipError, setIpError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [sensorError, setSensorError] = useState(false);

  const validateForm = () => {
    let valid = true;

    if (!ipAddress.trim()) {
      setIpError(true);
      valid = false;
    } else {
      setIpError(false);
    }

    if (!password.trim()) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    if (sensors.length === 0 || sensors.some((sensor) => !sensor.trim())) {
      setSensorError(true);
      valid = false;
    } else {
      setSensorError(false);
    }

    return valid;
  };

  const handleIpAddressChange = (event) => {
    setIpAddress(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSensorAdd = () => {
    setSensors([...sensors, ""]);
    setNames([...names, ""]);
    setUnits([...units, ""]);
    setRooms([...rooms, ""]);
  };

  const handleSensorRemove = (index) => {
    const updatedSensors = [...sensors];
    updatedSensors.splice(index, 1);
    setSensors(updatedSensors);

    const updatedNames = [...names];
    updatedNames.splice(index, 1);
    setNames(updatedNames);

    const updatedUnits = [...units];
    updatedUnits.splice(index, 1);
    setUnits(updatedUnits);

    const updatedRooms = [...rooms];
    updatedRooms.splice(index, 1);
    setRooms(updatedRooms);
  };

  const handleSensorChange = (event, index) => {
    const updatedSensors = [...sensors];
    updatedSensors[index] = event.target.value;
    setSensors(updatedSensors);
  };

  const handleNameChange = (event, index) => {
    const updatedNames = [...names];
    updatedNames[index] = event.target.value;
    setNames(updatedNames);
  };

  const handleUnitChange = (event, index) => {
    const updatedUnits = [...units];
    updatedUnits[index] = event.target.value;
    setUnits(updatedUnits);
  };

  const handleRoomChange = (event, index) => {
    const updatedRooms = [...rooms];
    updatedRooms[index] = event.target.value;
    setRooms(updatedRooms);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const sensorData = sensors.map((sensor, index) => ({
      id: sensor,
      name: names[index],
      unit: units[index],
      roomName: rooms[index] || "Not specified"
    }));

    navigate('/dashboard', { state: { data: ipAddress, array: sensorData, bearer: password } });

    setIpAddress("");
    setPassword("");
    setSensors([]);
    setNames([]);
    setUnits([]);
    setRooms([]);
  };

  // Save configurations to a file
  const saveConfigurations = () => {
    const configData = {
      ipAddress,
      password,
      sensors,
      names,
      units,
      rooms,
    };

    const dataBlob = new Blob([JSON.stringify(configData)], {
      type: "application/json",
    });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(dataBlob);
    downloadLink.download = "configurations.json";
    downloadLink.click();
  };

  // Load configurations from a file
  const loadConfigurations = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      const configData = JSON.parse(contents);
      setIpAddress(configData.ipAddress);
      setPassword(configData.password);
      setSensors(configData.sensors);
      setNames(configData.names);
      setUnits(configData.units);
      setRooms(configData.rooms);
    };
    reader.readAsText(file);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          variant="h4"
          component="h2"
          className={classes.title}
          gutterBottom
        >
          Configuration Page
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={12}>
              <TextField
                label="IP Address"
                value={ipAddress}
                onChange={handleIpAddressChange}
                error={ipError}
                helperText={ipError ? "Please enter an IP Address" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Long-Lived Access Token"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
                helperText={passwordError ? "Please enter a token" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h3" gutterBottom>
                Sensors & lights
              </Typography>
              {sensors.map((sensor, index) => (
                <Grid
                  container
                  spacing={5}
                  key={index}
                  className={classes.grid}
                >
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Entity id"
                      value={sensor}
                      onChange={(event) => handleSensorChange(event, index)}
                      error={sensorError && !sensor.trim()}
                      helperText={sensorError && !sensor.trim() ? "Please enter a Sensor entity id" : ""}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={names[index]}
                      onChange={(event) => handleNameChange(event, index)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth>
                      <InputLabel>Unit</InputLabel>
                      <Select
                        value={units[index]}
                        onChange={(event) => handleUnitChange(event, index)}
                      >
                        <MenuItem value="lx">lx</MenuItem>
                        <MenuItem value="%">%</MenuItem>
                        <MenuItem value="°C">°C</MenuItem>
                        <MenuItem value="°F">°F</MenuItem>
                        <MenuItem value="hPa">hPa</MenuItem>
                        {/* Add more units here */}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Room"
                      value={rooms[index]}
                      onChange={(event) => handleRoomChange(event, index)}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      color="error"
                      className={classes.iconButton}
                      onClick={() => handleSensorRemove(index)}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <IconButton
                color="primary"
                className={classes.iconButton}
                onClick={handleSensorAdd}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          className={classes.submitButton}
          type="submit"
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component="label"
          style ={{marginLeft:"10px"}}
          startIcon={<input type="file" style={{ display: "none" }} onChange={loadConfigurations} />}
        >
          Load Configurations
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={saveConfigurations}
        >
          Save Configurations
        </Button>
      </CardActions>
    </Card>
  );
};

export default ConfigurationPage;
