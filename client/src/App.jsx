import { Link, Outlet } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography, CssBaseline } from "@mui/material";
// 1. Importera Theme-verktygen
import { ThemeProvider, createTheme } from "@mui/material/styles";
import UserSelect from './components/UserSelect';
import React, { useState } from 'react';



// 2. Skapa ditt eget tema (Heritage Black & Gold)
const theme = createTheme({
  palette: {
    primary: {
      main: '#1C1C1C', // Charcoal-svart
    },
    secondary: {
      main: '#C0A080', // Antikt guld
    },
    background: {
      default: '#FFF8F0', // Krämvit
    }
  },
  typography: {
    // Standard-typsnitt för all vanlig text (brödtext, knappar)
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    
    // Specifika inställningar för din h6 (din logotyp-text "VAR-Rummet")
    h6: {
      fontFamily: '"Playfair Display", serif', // <-- Här lägger vi in retro-fonten!
      fontWeight: 700,
      fontStyle: 'italic', // Lite kursivt gör det extra elegant
      letterSpacing: '1px',
      color: '#C0A080', 
    },
    // Om du vill kan du lägga till h1, h2 osv. här på samma sätt senare
    h1: {
      fontFamily: '"Playfair Display", serif',
    }
  }
});

function App() {
  // Aktivt KundId lagras här för kundvagnen.
  const [activeUserId, setActiveUserId] = useState(''); 
  

    const linkStyle = { 
    textDecoration: "none", 
    color: "inherit" 
  };

  return (
    // 3. Slå in allt i ThemeProvider
    <ThemeProvider theme={theme}>
      {/* CssBaseline ser till att body får din background.default färg */}
      <CssBaseline /> 
      
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={linkStyle}>knickers.se</Link>
            </Typography>

            {/* Dropdown för användare */}
            <div className="App">
             <UserSelect onUserChange={(id) => {
              // Koll så det funkar
              console.log("Valt ID i App.jsx:", id);
              // sätter aktivt kundid.
              setActiveUserId(id);
              }} />
            </div>

            {/* KNAPP Se alla produkter */}
            <Button color="secondary" variant="outlined" sx={{ ml: 2 }}>
              <Link to="/products" style={linkStyle}>Produkter</Link>
            </Button>

            {/* KNAPP Skapa ny (Admin) */}
            <Button color="secondary" variant="outlined" sx={{ ml: 2 }}>
              <Link to="/products/new" style={linkStyle}>Skapa produkt</Link>
            </Button>

            {/* KNAPP för Kundvagn */}
            {/* Här kan vi använda sekundärfärgen (Guld) för att få den att sticka ut! */}
            <Button color="secondary" variant="outlined" sx={{ ml: 2 }}>
              <Link to="/cart" style={linkStyle}>Kundvagn</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Här renderas Home, Products, ProductDetail osv beroende på URL */}
      <Box sx={{ p: 3 }}> 
        {/* Vi vill komma åt activeUserId i products och cart viewn för att hålla koll på kunvagnen */}
        {/* Outlet context låter oss dela det från App.jsx */}
        <Outlet context={{ activeUserId}}/>
      </Box>
    </ThemeProvider>
  );
}

export default App;