import { useEffect, useState } from "react";
import { getCartByUserId } from "../services/CartService";
import { Typography, Container, List, ListItem, ListItemText, Divider, Box } from "@mui/material";

function Carts() {
    const [cart, setCart] = useState(null);
    const userId = 1; // Temporärt för att testa

    useEffect(() => {
        getCartByUserId(userId).then(data => {
            setCart(data);
        });
    }, []);

    return (
        <Container>
            <Typography variant="h4" sx={{ my: 3 }}>Din Kundvagn</Typography>
            {cart && cart.products && cart.products.length > 0 ? (
            <>
                <List>
                    {cart.products.map((item) => (
                        <div key={item.id}>
                            <ListItem>
                                <ListItemText 
                                    primary={item.title} 
                                    secondary={`${item.quantity} st á ${item.price} kr`} 
                                />
                                <Typography variant="body1">
                                    {item.itemTotal} kr
                                </Typography>
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
                
                <Box sx={{ mt: 3, textAlign: 'right'}}>
                    <Typography variant="h5">
                            Totalbelopp: {cart.totalSum} kr
                    </Typography>
                </Box>
            </>
            ) : (
                <Typography>Kundvagnen är tom.</Typography>
            )}
        </Container>
    );
}

export default Carts;