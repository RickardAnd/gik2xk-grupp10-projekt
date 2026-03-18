import ProductItemSmall from "./ProductItemSmall";
import { useEffect, useState } from "react";
import { getAll } from "../services/productService";

function ProductList() {
        const [products, setProducts] = useState([]);

    useEffect(() => {
        getAll(pathname).then((products) => {
            setProducts(products);
        });
    }, [pathname]);

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