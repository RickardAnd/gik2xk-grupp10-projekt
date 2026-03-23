import { Box, Button, Rating, Typography } from "@mui/material";


// Komponent för att skapa ett formulär där användaren kan sätta ett nytt betyg på en produkt
function ProductRatingForm({
  ratingValue,
  onRatingChange,
  onSubmit,
  submittingRating,
}) {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
        Sätt ditt betyg
      </Typography>

      <Rating
        name="rating"
        value={ratingValue}
        onChange={(_event, newValue) => {
          if (newValue != null) onRatingChange(newValue);
        }}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 1 }}
        disabled={submittingRating}
      >
        {submittingRating ? "Sparar..." : "Spara betyg"}
      </Button>
    </Box>
  );
}

export default ProductRatingForm;

