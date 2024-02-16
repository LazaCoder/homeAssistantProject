import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import { Card, CardHeader, CardContent, Typography, useTheme, Box } from '@mui/material';

const GaugeChart = ({ title, value, min, max, low, medium, high, unit }) => {
  const theme = useTheme();

  const getColor = (value, low, medium, high) => {
    if (value < low ) return theme.palette.success.main;
    if (value < medium && value > low) return theme.palette.warning.main;
    if (value < high ) return theme.palette.error.main;
    return theme.palette.error.main;
  };

  const radialGradient = (color) => `url(#${color}-gradient)`;

  const color = getColor(value, low, medium, high);

  const createEmptyLabels = (length) => {
    const labels = [];
    for (let i = 0; i < length; i++) {
      labels.push('');
    }
    return labels;
  };

  return (
    <Card elevation={0} >
      <CardHeader
        title={
          <Typography variant="h6" align="center" color={color}>
            {title}
          </Typography>
        }
      />
      <CardContent>
        <Box display="flex" justifyContent="center" alignItems="center" style={{marginBottom:"0px"}}>
          <svg style={{ position: 'absolute', zIndex: -1 }}>
            <defs>
              <radialGradient id="green-gradient">
                <stop offset="0%" stopColor={theme.palette.success.light} />
                <stop offset="100%" stopColor={theme.palette.success.dark} />
              </radialGradient>
              <radialGradient id="yellow-gradient">
                <stop offset="0%" stopColor={theme.palette.warning.light} />
                <stop offset="100%" stopColor={theme.palette.warning.dark} />
              </radialGradient>
              <radialGradient id="red-gradient">
                <stop offset="0%" stopColor={theme.palette.error.light} />
                <stop offset="100%" stopColor={theme.palette.error.dark} />
              </radialGradient>
            </defs>
          </svg>
          <ReactSpeedometer
            maxValue={max}
            minValue={min}
            value={value}
            needleColor={theme.palette.grey[800]}
            needleHeightRatio={0.7}
            needleBaseColor="none"
            segments={3}
            segmentColors={[
              radialGradient('green'),
              radialGradient('yellow'),
              radialGradient('red'),
            ]}
            textColor={theme.palette.text.primary}
            needleTransitionDuration={2000}
            needleTransition="easeElastic"
            width={250} 
            height={150} 
            customSegmentLabels={createEmptyLabels(3)}
            currentValueText={`${value} ${unit}`}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default GaugeChart;
