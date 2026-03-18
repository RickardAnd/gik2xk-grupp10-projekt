import ProductItemSmall from "./ProductItemSmall";
import { useEffect, useState } from "react";
import { getAll } from "../services/ProductService";

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
    <ul>
        {products?.length > 0 ? (
            products.map((product) => (
        <li key={`product_${product.id}`}>
            <ProductItemSmall product={product} />
        </li>
        ))
     ) : (
          <h3>Inga produkter att visa</h3>
        )}
    </ul> 
    );
}

export default ProductList;