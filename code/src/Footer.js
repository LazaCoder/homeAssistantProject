// src/Footer.js
import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import styled from '@emotion/styled';

const FooterContainer = styled(Box)`
  background-color: ${({ darkMode }) => (darkMode ? '#424242' : '#3f51b5')};
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
`;

const FooterText = styled(Typography)`
  color: ${({ darkMode }) => (darkMode ? '#ffffff' : '#ffffff')};
`;

const Footer = ({darkMode}) => {
  return (
    <FooterContainer darkMode={darkMode}>
      
      <FooterText variant="body1">
        &copy; {new Date().getFullYear()} FER | Faculty of Electrical Engineering and Computing
      </FooterText>
      <FooterText variant="body1">
        <Link href="https://www.fer.unizg.hr/en" target="_blank" rel="noopener noreferrer" color="inherit">
          fer.unizg.hr
        </Link>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
