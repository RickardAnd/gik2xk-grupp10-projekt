import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppBar, Box, Button, CssBaseline, Toolbar, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import UserSelect from "./components/UserSelect";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

const theme = createTheme({
  palette: {
    primary: { main: "#1C1C1C" },
    secondary: { main: "#C0A080" },
    background: { default: "#FFF8F0" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontStyle: "italic",
      letterSpacing: "1px",
      color: "#C0A080",
    },
    h1: {
      fontFamily: '"Playfair Display", serif',
    },
  },
});

function App() {
  // Aktivt KundId lagras här för kundvagnen.
  const [activeUserId, setActiveUserId] = useState(''); 
  

    const linkStyle = { 
    textDecoration: "none", 
    color: "inherit" 
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={linkStyle}>
                knickers.se
              </Link>
            </Typography>

            <div className="App">
             <UserSelect onUserChange={(id) => {
              // Koll så det funkar
              console.log("Valt ID i App.jsx:", id);
              // sätter aktivt kundid.
              setActiveUserId(id);
              }} />
            </div>

            <Button color="secondary" variant="outlined" sx={{ ml: 2 }}>
              <Link to="/products" style={linkStyle}>
                Produkter
              </Link>
            </Button>

            <Button color="secondary" variant="outlined" sx={{ ml: 2 }}>
              <Link to="/products/new" style={linkStyle}>
                Skapa produkt
              </Link>
            </Button>

            <Button color="secondary" variant="outlined" sx={{ ml: 2 }}>
              <Link to="/cart" style={linkStyle}>
                Kundvagn
              </Link>
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