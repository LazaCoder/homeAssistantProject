import React from 'react';
import { LinearProgress, Typography, Box, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';

const ColorLinearProgress = styled(LinearProgress)(({ theme, value, min, low, high }) => {
  return {
    height: 20,
    borderRadius: 10,
    backgroundImage: `linear-gradient(to right, ${theme.palette.success.main}, ${theme.palette.warning.main}, ${theme.palette.error.main})`,
    backgroundColor: theme.palette.grey[300],
    '& .MuiLinearProgress-bar': {
      backgroundColor: 'transparent',
    },
  };
});

const ValueIndicator = styled('div')(({ theme, value }) => ({
  width: 0,
  height: 0,
  borderBottom: `10px solid ${theme.palette.primary.main}`,
  borderLeft: '5px solid transparent',
  borderRight: '5px solid transparent',
  position: 'relative',
  top: '10px',
  left: `calc(${value}% - 5px)`, // Shift the indicator by its own half-width
}));

const LinearGaugeChart = ({ title, value, min, max, low, high, unit }) => {
  const progressValue = ((value - min) / (max - min)) * 100;

  return (
    <Card elevation={0} style={{ marginTop: 30 }}>
      <CardContent>
        <Box bgcolor="#f7f7f7" borderRadius={4} p={2}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
            <Typography variant="body2">{min} {unit}</Typography>
            <Typography variant="body2">{max} {unit}</Typography>
          </Box>
          <ColorLinearProgress
            variant="determinate"
            value={progressValue}
            min={min}
            low={low}
            high={high}
            style={{ marginTop: '15%' }}
          />
          <ValueIndicator value={progressValue} />
          <Typography variant="subtitle1" sx={{ textAlign: 'center', fontSize: '18px', fontWeight: '500', marginBottom: '8px', marginTop: '15px', fontWeight: 'bold' }}>
            {value} {unit}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LinearGaugeChart;
