import { Link, Outlet } from "react-router-dom"
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import UserSelect from './components/UserSelect';

function App() {

    const linkStyle = { 
    textDecoration: "none", 
    color: "inherit" 
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={linkStyle}>Webbshoppen</Link>
            </Typography>

            <div className="App">
              <UserSelect />
      
            </div>

            {/* KNAPP Se alla produkter */}
            <Button color="inherit">
              <Link to="/products" style={linkStyle}>Produkter</Link>
            </Button>

            {/* KNAPP Skapa ny (Admin) */}
            <Button color="inherit">
              <Link to="/products/new" style={linkStyle}>Skapa ny</Link>
            </Button>

            {/* KNAPP för Kundvagn */}
            <Button color="inherit">
              <Link to="/cart" style={linkStyle}>Kundvagn</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Här renderas Home, Products, ProductDetail osv beroende på URL */}
      <Box sx={{ p: 3 }}> 
        <Outlet />
      </Box>
    </>
  )
}

export default App
