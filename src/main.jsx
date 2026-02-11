import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Pages & Components
import Dashboard from './pages/Dashboard.jsx'
import LoginSignUp from './pages/LoginSignUp.jsx'
import Landing from './pages/Landing.jsx'
import Layout from './Layouts/Layout.jsx'
import Myevents from './pages/Myevents.jsx'
import Events from './pages/Events.jsx'

// On définit les routes directement sans conditions
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/Loginandregister",
    element: <LoginSignUp /> 
  },
  {
    // Le Layout englobe les pages internes
    element: <Layout />, 
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/Myevents", element: <Myevents /> },
      { path: "/events", element: <Events /> }
    ]
  }
]);

function App() {
  // Plus de useEffect, plus de state user, juste le rendu du routeur
  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)