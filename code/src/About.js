import React from 'react';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';


const Container = styled(Box)`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin-bottom: 16px;
`;

const About = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        O stranici
      </Typography>
      <Typography variant="h6" gutterBottom>
        Autor:
      </Typography>
      <Typography variant="body1" gutterBottom>
        Ivan Lazarusic
      </Typography>
      <Typography variant="h6" gutterBottom>
        Fakultet:
      </Typography>
      <Typography variant="body1" gutterBottom>
        FER, Zagreb
      </Typography>
      <Typography variant="h6" gutterBottom>
        Mentor:
      </Typography>
      <Typography variant="body1" gutterBottom>
        Pavle Skocir
      </Typography>
      <Typography variant="h6" gutterBottom>
        O projektu:
      </Typography>
      <Typography variant="body1" gutterBottom>
        Ova web stranica je dio mog završnog rada za stjecanje diplome sveučilišnog prvostupnika. Prikazuje grafičke informacije o pametnom osvjetljenju kontroliranom pomoću Home Assistant-a na Raspberry Pi uređaju te koristi Philips Hue sustav pametne rasvjete.
      </Typography>
    </Container>
  );
};

export default About;
