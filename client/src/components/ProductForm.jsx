import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { create, update, getOne } from '../services/ProductService'; 

function ProductForm() {
  const { id } = useParams(); // Hämtar ID om det finns i URL:en
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = isEditMode 
      ? await update(product)  // Anropar din update-service
      : await create(product); // Anropar din create-service
    
    if (result) {
      alert(isEditMode ? "Tröjan har uppdaterats!" : "Tröjan har skapats!");
      navigate('/products');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          {isEditMode ? 'Redigera tröja' : 'Lägg till ny tröja'}
        </Typography>
        
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

          <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate('/products')}>
            Avbryt
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ProductForm;