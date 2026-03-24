import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link, useOutletContext } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Snackbar,
  Alert
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { addRating, getOne, remove } from "../services/ProductService";
import { addToCart } from "../services/CartService";
import ProductItemLarge from "../components/ProductItemLarge";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);
  const { activeUserId } = useOutletContext();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Betyget användaren väljer.
  const [ratingValue, setRatingValue] = useState(5);
  const [submittingRating, setSubmittingRating] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUserMissingDialog, setOpenUserMissingDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Öppnar bekräftelse-rutan för radering.
  const handleClickDelete = () => {
  setOpenDeleteDialog(true);
};

  // Bekräftar radering och tar användaren tillbaka till listan.
async function handleConfirmDelete() {
  setOpenDeleteDialog(false);
  try {
    const result = await remove(productId);
    if (result) { 
      navigate("/products");
    } else {
      setError("Kunde inte radera produkten.");
    }
  } catch {
    setError("Ett fel uppstod vid radering.");
  }
}

  

  // Hämtar en specifik produkt via `productId`.
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

  // Räkna ut snittbetyg och antal betyg från produktdata.
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
  // Lägg till i kundvagn (kräver vald kund).
  async function handleAddToCart() {
  if (!Number.isFinite(productId)) return;

  if (!activeUserId) {
    setOpenUserMissingDialog(true);
    return;
  }

  setAddingToCart(true);
  try {
    const result = await addToCart(activeUserId, productId);
    if (result) {
      setSnackbarOpen(true);
    }
  } catch {
    setError("Kunde inte lägga till i kundvagnen.");
  } finally {
    setAddingToCart(false);
  }
}

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button variant="outlined" onClick={() => navigate(-1)}>
        Tillbaka
      </Button>

      {!loading && product && (
        <Button 
          variant="outlined"
          sx={{ ml: 2 }}
          color="success" 
          startIcon={<EditIcon />}
          component={Link}
          to={`/products/${id}/edit`}
        >
          Redigera
        </Button>
      )}

        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleClickDelete}
          sx={{ ml: 2 }}
        >
          Ta bort
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
        <ProductItemLarge
          product={product}
          ratingSummary={ratingSummary}
          ratingValue={ratingValue}
          onRatingChange={setRatingValue}
          onSubmitRating={handleSubmitRating}
          submittingRating={submittingRating}
          onAddToCart={handleAddToCart}
          addingToCart={addingToCart}
          ratings={ratings}
        />
      )}
      {/* Bekräftelse vid radering */}
  <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
    <DialogTitle>Bekräfta radering</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Är du säker på att du vill radera <strong>{product?.title}</strong>? Detta går inte att ångra.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpenDeleteDialog(false)}>Avbryt</Button>
      <Button onClick={handleConfirmDelete} color="error" variant="contained">
        Ja, radera
      </Button>
    </DialogActions>
  </Dialog>

  {/* När ingen kund är vald */}
  <Dialog open={openUserMissingDialog} onClose={() => setOpenUserMissingDialog(false)}>
    <DialogTitle>Välj kund</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Du måste välja en kund uppe i menyn innan du kan lägga till varor i kundvagnen.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpenUserMissingDialog(false)} color="primary" variant="contained">
        Jag förstår
      </Button>
    </DialogActions>
  </Dialog>

  {/* Snackbar efter lyckad tillägg */}
  <Snackbar 
    open={snackbarOpen} 
    autoHideDuration={3000} 
    onClose={() => setSnackbarOpen(false)}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  >
    <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
      {product?.title} har lagts till i kundvagnen!
    </Alert>
  </Snackbar>
    </Container>
  );
}

export default ProductDetail;