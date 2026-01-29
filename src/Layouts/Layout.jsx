import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

// On ajoute { user } ici pour le recevoir de App.jsx
function Layout({ user }) {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* TRÈS IMPORTANT : On transmet l'user à la Navbar */}
      <Navbar user={user} />
      
      <main className='flex-1'> 
          {/* On passe aussi l'user aux pages enfants (Dashboard, etc.) via le context */}
          <Outlet context={{ user }} />
      </main>
      
      <Footer />
    </div>
  )
}

export default Layout