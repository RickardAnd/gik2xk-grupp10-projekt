import ProductList from "../components/ProductList";
import { useParams, useLocation } from 'react-router-dom';

function Products() {
  console.log(useParams(), useLocation());
  const location = useLocation();
  return <ProductList pathname={location.pathname} />;
}

export default Products;