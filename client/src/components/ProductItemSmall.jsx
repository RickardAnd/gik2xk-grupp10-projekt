
import { 
  Card, CardActionArea, CardMedia, CardContent, Typography, Button, CardActions,
  Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions 
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from "../services/CartService";
import { useOutletContext } from "react-router-dom";

function ProductItemSmall({ product }) {
    // Hämtar aktiv kund
    const { activeUserId } = useOutletContext();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [userMissingOpen, setUserMissingOpen] = useState(false);

    const handleAddToCart = async (e) => { 
        
        if (!activeUserId) {
          setUserMissingOpen(true); // Öppna Dialog
        return;
        }
        
        const result = await addToCart(activeUserId, product.id);
        
        if (result) {
            setSnackbarOpen(true); // Visa snygg Snackbar
        }
    };

    return (
        <Card sx={{ 
          width: '100%',
          height: '100%',
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'space-between' 
          }}>
      <CardActionArea 
      component={Link} 
      to={`/products/${product.id}`}
      sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <CardMedia
          component="img"
          height="280"
          image={product.imageUrl || product.image_url}
          alt={product.title}
          sx={{ objectFit: 'contain', p: 1 }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1"
          sx={{ 
            fontWeight: 'bold',
            height: '2.5em',
            overflow: 'hidden',
            lineHeight: '1.2em'
            }}>
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.price} kr
          </Typography>
        </CardContent>
      </CardActionArea>
      
      <CardActions sx={{ mt: 'auto' }}>
        <Button 
          size="small" 
          color="primary" 
          variant="contained" 
          fullWidth 
          onClick={handleAddToCart}
        >
          Lägg till
        </Button>
      </CardActions>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          {product.title} har lagts till i kundvagnen!
        </Alert>
      </Snackbar>

      <Dialog open={userMissingOpen} onClose={() => setUserMissingOpen(false)}>
        <DialogTitle>Ingen kund vald</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vänligen välj en kund uppe i menyn först.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserMissingOpen(false)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default ProductItemSmall;