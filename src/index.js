import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './router/Main';
import ErrorPage from './router/ErrorPage';
import ProductDetail from './router/ProductDetail';
import Products from './router/Products';
import Cart from './router/Cart';
import NewProduct from './router/NewProduct';
import ProtectedRoute from './router/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '/',
        element: <Main />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/cart',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: '/products/new',
        element: (
          <ProtectedRoute reqireAdmin={true}>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: '/products/:productId',
        element: <ProductDetail />,
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
