import { Link, Outlet } from "react-router-dom"
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";


function App() {

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Startsida</Link>
          </Typography>
          <Button color="inherit">
            <Link to="/products/new">Skapa ny produkt</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Outlet />
    </>
  )
}

export default App
