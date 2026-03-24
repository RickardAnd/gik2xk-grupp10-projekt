import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import heroImg from "../assets/images/Grusplan.jpg";

// Startsidan med en välkomnande bild, rubrik och knappar som leder till produktlistan och kundvagnen
function Home() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            {/* Bild ovanför rubriken */}
            <Box
              component="img"
              src={heroImg}
              alt="Produktbild"
              sx={{
                width: "50%",
                height: "auto",
                mb: 2,
                borderRadius: 2,
                display: "block",
              }}
            />
            {/* Rubrik och beskrivning */}
            <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
              Hitta din nästa favorittröja
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Upptäck fotbollströjor med tydlig info, lagersaldo och betyg från andra supportrar.
            </Typography>
                {/* Knappar som leder till produktlistan och kundvagnen*/}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                component={RouterLink}
                to="/products"
                variant="contained"
                size="large"
              >
                Visa alla produkter
              </Button>
              <Button
                component={RouterLink}
                to="/cart"
                variant="outlined"
                size="large"
              >
                Gå till kundvagn
              </Button>
            </Stack>
          </Grid>
                
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                height: { xs: 260, sm: 280 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >            
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;