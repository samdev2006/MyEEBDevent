import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { auth } from './firebase/config.js'
import { onAuthStateChanged } from 'firebase/auth'

// Pages & Components
import Dashboard from './pages/Dashboard.jsx'
import LoginSignUp from './pages/LoginSignUp.jsx'
import Landing from './pages/Landing.jsx'
import Layout from './Layouts/Layout.jsx'
import Myevents from './pages/Myevents.jsx'
import Events from './pages/Events.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

// 1. On passe 'user' partout où c'est nécessaire
const createRouter = (user) => createBrowserRouter([
  {
    index: true,
    element: <Landing />
  },
  {
    path: "Loginandregister",
    element: <LoginSignUp user={user} /> 
  },
  {
    element: (
      <ProtectedRoute user={user}>
        {/* CORRECTION : On passe l'user au Layout pour qu'il le donne à la Navbar */}
        <Layout user={user} /> 
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "Myevents", element: <Myevents /> },
      { path: "events", element: <Events /> }
    ]
  }
]);

function App() {
  const [user, setUser] = useState(null);
  const [isFetch, setIsFetch] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setIsFetch(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetch) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-900 text-white font-sans text-xl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="animate-pulse">Vérification de la session...</p>
        </div>
      </div>
    );
  }

  return <RouterProvider router={createRouter(user)} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)