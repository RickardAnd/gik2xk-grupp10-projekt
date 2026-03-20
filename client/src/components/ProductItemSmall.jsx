
import { Card, CardActionArea, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { addToCart } from "../services/CartService";
import { useOutletContext } from "react-router-dom";

function ProductItemSmall({ product }) {
    // Hämtar aktiv kund
    const { activeUserId } = useOutletContext();

    const handleAddToCart = async (e) => { 
        
        if (!activeUserId) {
          alert("Vänligen välj en kund uppe i menyn först")
          return;
        }
        
        const result = await addToCart(activeUserId, product.id);
        
        if (result) {
            alert(`${product.title} har lagts till i kundvagnen!`);
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
          height="140"
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
    </Card>
  );
}

export default ProductItemSmall;