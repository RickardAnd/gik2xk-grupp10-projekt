import { useEffect, useState } from "react";
import { getCartByUserId } from "../services/CartService";
import { Typography, Container, List, ListItem, ListItemText, Divider, Box } from "@mui/material";
import { useOutletContext } from "react-router-dom"; // För att hämta activeUserId

// tar emot ett userId
function Carts() {
    const [cart, setCart] = useState(null);
    // Här tas KundId emot från App.jsx
    const { activeUserId } = useOutletContext();

    useEffect(() => {
        if(activeUserId) {
            // Kollar vad den hämtar (test)
            console.log("HÄR ÄR DATAN:", activeUserId); 
            getCartByUserId(activeUserId).then(data => {
            
            setCart(data);
            });
        }
    }, [activeUserId]);

    return (
        <Container>
            <Typography variant="h4" sx={{ my: 3 }}>Din Kundvagn</Typography>

            {/* Om ingen användare är vald */}
            {!activeUserId && <Typography>Välj en användare i menyn för att se vagnen</Typography>}

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