
import { Card, CardActionArea, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductItemSmall({ product }) {
    const handleAddToCart = async (e) => { 
        
        const userId = 1; // Hårdkodat tills vi har login
        const result = await addToCart(userId, product.id);
        
        if (result) {
            alert(`${product.title} har lagts till i kundvagnen!`);
        }
    };

    return (
        <Card sx={{ height: '100%' }}>
      <CardActionArea component={Link} to={`/products/${product.id}`}>
        <CardMedia
          component="img"
          height="140"
          image={product.imageUrl || product.image_url}
          alt={product.title}
          sx={{ objectFit: 'contain', p: 1 }}
        />
        <CardContent>
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold' }}>
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.price} kr
          </Typography>
        </CardContent>
      </CardActionArea>
      
      <CardActions>
        <Button size="small" color="primary" variant="outlined" fullWidth onClick={(e) => {
          e.preventDefault(); // Hindrar Link-navigering när man trycker Köp
          handleAddToCart(product.id);
        }}>
          Lägg till
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductItemSmall;