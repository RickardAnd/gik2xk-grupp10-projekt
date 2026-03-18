import ProductList from "../components/ProductList";

function Products() {
    return (
        <div>
            <h2>Våra Fotbollströjor</h2>
            {/* Här lägger vi in komponenten som faktiskt hämtar och visar listan */}
            <ProductList /> 
        </div>
    );
}

export default Products;