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
    // Körde med container här ist
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom align="center">
                Våra Fotbollströjor
            </Typography>

            {products?.length > 0 ? (
                // Skapade Grid-containern med mellanrum
                <Grid container spacing={3}>
                    {products.map((product) => (
                        // Varje item tar upp hälften (xs={6}) för att få 2 i bredd
                        <Grid item xs={6} key={`product_${product.id}`}>
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