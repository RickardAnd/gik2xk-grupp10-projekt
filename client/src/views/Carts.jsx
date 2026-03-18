import { useEffect, useState } from "react";
import { getCartByUserId } from "../services/CartService";
import { Typography, Container, List, ListItem, ListItemText, Divider } from "@mui/material";

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
            {cart && cart.cart_rows && cart.cart_rows.length > 0 ? (
                <List>
                    {cart.cart_rows.map((item) => (
                        <div key={item.id}>
                            <ListItem>
                                <ListItemText 
                                    primary={item.product.title} 
                                    secondary={`${item.quantity} st á ${item.product.price} kr`} 
                                />
                                <Typography variant="body1">
                                    {item.quantity * item.product.price} kr
                                </Typography>
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
            ) : (
                <Typography>Kundvagnen är tom.</Typography>
            )}
        </Container>
    );
}

export default Carts;