import React, { useState, useEffect } from 'react';
import { Menu, X, LayoutDashboard, Tickets, CalendarPlus, LogOut } from 'lucide-react';
import logo from '../assets/logo.svg';
import { NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore'; // Import pour Firestore

function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [nom, setNom] = useState(''); // État pour stocker le nom de l'utilisateur

  // Récupération du nom depuis Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setNom(docSnap.data().nom);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération du nom:", error);
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => console.log('déconnexion'))
      .catch((error) => console.error(error));
  };

  const linkStyles = ({ isActive }) => 
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
      isActive 
      ? "bg-white/20 text-white font-bold" 
      : "text-white/80 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-400 shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          
          {/* LOGO ET MESSAGE BIENVENUE */}
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            {nom && (
              <span className="hidden lg:block text-white font-medium bg-white/10 px-3 py-1 rounded-full text-sm">
                Bon retour, {nom} !
              </span>
            )}
          </div>

          {/* LIENS DESKTOP */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/dashboard" className={linkStyles}>
              <LayoutDashboard size={18} />
              <span>Tableau de bord</span>
            </NavLink>
            
            <NavLink to="/Myevents" className={linkStyles}>
              <Tickets size={18} />
              <span>Mes évènements</span>
            </NavLink>

            <NavLink to="/events" className={linkStyles}>
              <CalendarPlus size={18} />
              <span>S'inscrire</span>
            </NavLink>
            
            <div className="h-6 w-[1px] bg-white/20 mx-2" /> {/* Séparateur */}

            <NavLink onClick={handleSignOut} className={linkStyles}>
              <LogOut size={18} />
              <span>Déconnexion</span>
            </NavLink>
          </div>

          {/* BOUTON MOBILE */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white hover:bg-white/10 p-2 rounded-md transition"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MENU MOBILE */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 border-t border-white/10 px-4 py-4 space-y-2">
          {nom && (
            <div className="px-4 py-2 text-cyan-100 font-bold border-b border-white/10 mb-2">
              Bonjour {nom}
            </div>
          )}
          <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className={linkStyles}>
            <LayoutDashboard size={20} />
            <span>Tableau de bord</span>
          </NavLink>
          
          <NavLink to="/Myevents" onClick={() => setIsOpen(false)} className={linkStyles}>
            <Tickets size={20} />
            <span>Mes évènements</span>
          </NavLink>

          <NavLink to="/events" onClick={() => setIsOpen(false)} className={linkStyles}>
            <CalendarPlus size={20} />
            <span>S'inscrire à un évènement</span>
          </NavLink>

          <NavLink onClick={handleSignOut} className={linkStyles}>
            <LogOut size={20} />
            <span>Déconnexion</span>
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;