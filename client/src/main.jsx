import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductEdit from "./views/ProductEdit.jsx";
import Products from "./views/Products.jsx";
import ProductDetail from "./views/ProductDetail.jsx";
import ProductForm from "./components/ProductForm.jsx";
import Home from "./views/Home.jsx";
import Carts from "./views/Carts.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  { path: '/',
    element: <App /> ,
    children: [
      { path: '/',
        element: <Home/>
      },
      { path: '/products/new',
        element: <ProductForm/>
      },
      { path: '/products',
        element: <Products/>
      },
      { path: '/products/:id',
        element: <ProductDetail/>
      },
      { path: '/products/:id/edit',
        element: <ProductForm/>
      },
      { 

        path: '/cart',
        element: <Carts />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
