import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { addRating, getOne } from "../services/ProductService";
import { addToCart } from "../services/CartService";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [ratingValue, setRatingValue] = useState(5);
  const [submittingRating, setSubmittingRating] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  async function fetchProduct() {
    setLoading(true);
    setError("");
    try {
      const data = await getOne(productId);
      if (data) setProduct(data);
      else setError("Kunde inte hitta produkten.");
    } catch {
      setError("Något gick fel när produkten skulle hämtas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!Number.isFinite(productId)) {
      setProduct(null);
      setLoading(false);
      setError("Ogiltigt produkt-ID.");
      return;
    }
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const ratingSummary = useMemo(() => {
    const avgRaw = product?.["Medelbetyg"];
    const countRaw = product?.["Antalbetyg"];

    const avgNum = avgRaw == null ? null : Number(avgRaw);
    const countNum = countRaw == null ? null : Number(countRaw);

    return {
      avg: Number.isFinite(avgNum) ? avgNum : null,
      count: Number.isFinite(countNum) ? countNum : null,
    };
  }, [product]);

  const ratings = product?.ratings ?? [];

  async function handleSubmitRating(e) {
    e.preventDefault();
    if (!Number.isFinite(productId)) return;

    setSubmittingRating(true);
    setError("");
    try {
      await addRating(productId, { rating: ratingValue });
      await fetchProduct();
    } catch {
      setError("Kunde inte spara betyget.");
    } finally {
      setSubmittingRating(false);
    }
  }

  async function handleAddToCart() {
    if (!Number.isFinite(productId)) return;

    setAddingToCart(true);
    setError("");
    try {
      // Temporärt: använd verkligt user-id senare (login saknas än).
      const userId = 1;
      const result = await addToCart(userId, productId);
      if (result) alert(`${product?.title ?? "Produkt"} har lagts till i kundvagnen!`);
      else setError("Kunde inte lägga till i kundvagnen.");
    } catch {
      setError("Kunde inte lägga till i kundvagnen.");
    } finally {
      setAddingToCart(false);
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button variant="text" onClick={() => navigate(-1)}>
        Tillbaka
      </Button>

      {loading && (
        <Typography sx={{ mt: 2 }} color="text.secondary">
          Laddar produkt...
        </Typography>
      )}

      {!loading && error && (
        <Typography sx={{ mt: 2 }} color="error">
          {error}
        </Typography>
      )}

      {!loading && product && (
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
                  Betyg
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                  <Rating
                    value={ratingSummary.avg ?? 0}
                    precision={0.5}
                    readOnly
                    size="large"
                  />
                  <Typography variant="body2" color="text.secondary">
                    {ratingSummary.avg != null ? ratingSummary.avg.toFixed(1) : "0.0"} / 5
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {ratingSummary.count != null && ratingSummary.count > 0
                    ? `${ratingSummary.count} betyg`
                    : "Inga betyg ännu"}
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmitRating} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                  Sätt ditt betyg
                </Typography>
                <Rating
                  name="rating"
                  value={ratingValue}
                  onChange={(_event, newValue) => {
                    if (newValue != null) setRatingValue(newValue);
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

              <Divider sx={{ my: 2 }} />

              <Button
                variant="contained"
                onClick={handleAddToCart}
                disabled={addingToCart}
                fullWidth
                sx={{ mb: 2 }}
              >
                {addingToCart ? "Lägger till..." : "Lägg till i kundvagnen"}
              </Button>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                Betyg från kunder
              </Typography>

              {ratings.length > 0 ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {ratings.map((r) => (
                    <Paper
                      key={`${r.rating}_${String(r.createdAt)}`}
                      variant="outlined"
                      sx={{ p: 1 }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Rating value={r.rating} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary">
                          {r.createdAt
                            ? new Date(r.createdAt).toLocaleDateString("sv-SE")
                            : ""}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Inga betyg ännu.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default ProductDetail;