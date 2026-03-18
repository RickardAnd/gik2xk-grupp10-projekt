function ProductItemSmall() {
    return (
        <div className="product-card" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <img src={product.imageUrl} alt={product.title} style={{ width: '150px' }} />
            <h4>{product.title}</h4>
            <p>{product.price} kr</p>
            <button>Visa detaljer</button>
        </div>
    );
}

export default ProductItemSmall;