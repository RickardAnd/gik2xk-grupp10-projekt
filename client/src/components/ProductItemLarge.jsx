import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import ProductCustomerRatings from "./ProductCustomerRatings";
import ProductRatingForm from "./ProductRatingForm";
import ProductRatingSummary from "./ProductRatingSummary";

// Visar en stor ruta med all info om en produkt (bild, pris, betyg och köp-knapp)
function ProductItemLarge({
  product,
  ratingSummary,
  ratingValue,
  onRatingChange,
  onSubmitRating,
  submittingRating,
  onAddToCart,
  addingToCart,
  ratings,
}) {
  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          {product.imageUrl ? (
            <Box
              component="img"
              src={product.imageUrl}
              alt={product.title}
              sx={{
                width: "100%",
                maxHeight: 360,
                objectFit: "contain",
                mb: 2,
                borderRadius: 1,
              }}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: 320,
                border: "1px dashed",
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                borderRadius: 1,
              }}
            >
              <Typography color="text.secondary">Ingen bild</Typography>
            </Box>
          )}

          <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
            {product.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-wrap" }}
            color="text.secondary"
          >
            {product.body}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {product.price} kr
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Lager: {product.stock ?? "okänt"}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Snittbetyg
            </Typography>
            <ProductRatingSummary
              avg={ratingSummary.avg}
              count={ratingSummary.count}
            />
          </Box>

          <ProductRatingForm
            ratingValue={ratingValue}
            onRatingChange={onRatingChange}
            onSubmit={onSubmitRating}
            submittingRating={submittingRating}
          />

          <Divider sx={{ my: 2 }} />

          <Button
            variant="contained"
            onClick={onAddToCart}
            disabled={addingToCart}
            fullWidth
            sx={{ mb: 2 }}
          >
            {addingToCart ? "Lägger till..." : "Lägg till i kundvagnen"}
          </Button>

          <ProductCustomerRatings ratings={ratings} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ProductItemLarge;