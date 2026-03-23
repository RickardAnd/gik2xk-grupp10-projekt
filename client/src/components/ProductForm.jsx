// Importerar nödvändiga komponenter och hooks från React och Material-UI
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { create, update, getOne } from '../services/ProductService';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

// En funktion som hanterar både skapande och redigering av produkter
function ProductForm() {
  const { id } = useParams(); // Hämtar ID om det finns i URL:en
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // State för att hantera produktdata och dialogöppning
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const [product, setProduct] = useState({
    title: '',
    body: '',
    imageUrl: '',
    price: '',
    stock: ''
  });

  // Om vi ska ändra (Edit), hämta den befintliga tröjan först
  useEffect(() => {
    if (isEditMode) {
      getOne(id).then((data) => {
        if (data) {
          setProduct(data);
        }
      });
    }
  }, [id, isEditMode]);

  // En funktion som hanterar ändringar i formuläret och uppdaterar state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // En funktion som hanterar formulärets "skickande" och, 
  // anropar rätt service beroende på om det är edit eller create
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = isEditMode 
      ? await update(product)  // Anropar update-service
      : await create(product); // Anropar create-service
    
    if (result) {
      setOpenSuccessDialog(true);
    }
  };

  // En funktion som sköter hoppet tillbaka till listan av produkter
const handleCloseDialog = () => {
  setOpenSuccessDialog(false);
  navigate('/products');
};

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          {isEditMode ? 'Redigera tröja' : 'Lägg till ny tröja'}
        </Typography>
        
        {/* Formuläret för att skapa eller redigera en produkt, med TextFields för varje fält */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Titel" name="title"
            value={product.title} onChange={handleChange}
            margin="normal" required
          />
          <TextField
            fullWidth label="Beskrivning" name="body"
            value={product.body} onChange={handleChange}
            margin="normal" multiline rows={3} required
          />
          <TextField
            fullWidth label="Bild-URL" name="imageUrl"
            value={product.imageUrl || product.image_url} 
            onChange={handleChange} margin="normal"
          />
          <TextField
            fullWidth label="Pris" name="price" type="number"
            value={product.price} onChange={handleChange}
            margin="normal" required
          />
          <TextField
            fullWidth label="Lager" name="stock" type="number"
            value={product.stock} onChange={handleChange}
            margin="normal" required
          />
          
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            {isEditMode ? 'Spara ändringar' : 'Skapa produkt'}
          </Button>

          {/* Knapp för att avbryta och gå tillbaka till produktsidan utan att spara ändringar */}
          <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate('/products')}>
            Avbryt
          </Button>
        </Box>
      </Paper>

        {/* Dialog som visas när en produkt har skapats eller uppdaterats framgångsrikt */}
      <Dialog open={openSuccessDialog} onClose={handleCloseDialog}>
        <DialogTitle>Framgång</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEditMode ? "Tröjan har uppdaterats!" : "Tröjan har skapats!"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            Gå till produktsidan
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ProductForm;