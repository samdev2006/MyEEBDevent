import React, { useState } from 'react';
import { Menu, X, LayoutDashboard, Tickets, CalendarPlus, LogOut } from 'lucide-react';
import logo from '../assets/logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Fonction de déconnexion simplifiée
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    setIsOpen(false);
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
          
          {/* LOGO A GAUCHE */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          </div>

          {/* LIENS DESKTOP (POUSSÉS À DROITE) */}
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
            
            <div className="h-6 w-[1px] bg-white/20 mx-2" /> 
            
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors">
              <LogOut size={18} />
              <span>Déconnexion</span>
            </button>
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

          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-white/80 hover:bg-white/10 hover:text-white">
            <LogOut size={20} />
            <span>Déconnexion</span>
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;