import { Link } from "react-router-dom"


function App() {

  return (
    <>
    <ul>
      <li>
        <Link to="/">Startsida</Link>
      </li>
      <li>
        <Link to="/products/new">Skapa ny produkt</Link>
      </li>
    </ul>
    </>
  )
}

export default App
