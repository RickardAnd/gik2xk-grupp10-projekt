// Importerar nödvändiga komponenter och hooks från React och Material-UI
import ProductItemSmall from "./ProductItemSmall";
import { useEffect, useState } from "react";
import { getAll } from "../services/ProductService";
import { Grid, Container, Typography } from "@mui/material";

function ProductList() {
        const [products, setProducts] = useState([]);

    useEffect(() => {
        getAll().then((data) => {
            console.log("Data från backend:", data);
            if (data) {
                setProducts(data);
            }
        });
    }, []);

    return (  
    // Körde med container här ist för att få bättre kontroll
    // över layouten och centrerad text
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom align="center">
                Våra Fotbollströjor
            </Typography>

            {products?.length > 0 ? (
                // Skapade Grid-containern med mellanrum 
                <Grid 
                container 
                spacing={3} 
                justifyContent="center" 
                alignItems="stretch"
                >
                    {products.map((product) => (
                        // Skapade Grid-item för varje produkt
                        <Grid item key={`product_${product.id}`} 
                        xs={12} // 1 i bredd på små skärmar
                        sm={6} // 2 i bredd på medelstora skärmar
                        md={4} // 3 i bredd på större skärmar
                        display="flex"
                        flexDirection="column"
                        >
                            <ProductItemSmall product={product} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                    Inga produkter att visa
                </Typography>
            )}
        </Container>
    );
}

export default ProductList;