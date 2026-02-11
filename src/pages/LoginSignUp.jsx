import React, { useState } from 'react'
import { Lock, Mail, User } from 'lucide-react' 
import backgroundImg from "../assets/background.jpg";

function LoginSignUp() {
  const [isLoginMode, setIsLoginMode] = useState(true)

  // Variables minimales pour éviter que le HTML ne plante
  const isLoading = false; 
  const setEmail = () => {}; 
  const clearError = () => {};

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        
        <div className='flex justify-center mb-4'>
          <h2 className='text-3xl font-semibold text-center'>
            {isLoginMode ? "Bon retour !" : "Créez votre compte"}
          </h2>
        </div>

        <div className='relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden'>
          <button
            type="button"
            onClick={() => { setIsLoginMode(true) }}
            className={`w-1/2 text-lg font-medium transition-all z-10 ${isLoginMode ? "text-white" : "text-black"}`}
          >
            Se connecter
          </button>
          <button
            type="button"
            onClick={() => { setIsLoginMode(false); }}
            className={`w-1/2 text-lg font-medium transition-all z-10 ${!isLoginMode ? "text-white" : "text-black"} `}
          >
            S'inscrire
          </button>
          <div className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 transition-all duration-300 ${isLoginMode ? "left-0" : "left-1/2"}`} />
        </div>

        <form className='space-y-4' >
          {!isLoginMode && (
            <label className='flex items-center gap-2'>
              <User size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder='Votre nom'
                required
                className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 disabled:bg-gray-50'
              />
            </label>
          )}

          <label className='flex items-center gap-2'>
            <Mail size={20} className="text-gray-400" />
            <input
              type="email"
              disabled={isLoading}
              onChange={(e) => { setEmail(e.target.value); clearError(); }}
              placeholder='Adresse email'
              required
              className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 disabled:bg-gray-50'
            />
          </label>

          <label className='flex items-center gap-2'>
            <Lock size={20} className="text-gray-400" />
            <input
              type="password"
              placeholder='Mot de passe'
              required
              className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 disabled:bg-gray-50'
            />
          </label>

          <button 
            type='submit'
            className={`w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 text-white rounded-full text-lg font-medium transition flex justify-center items-center gap-2 ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"}`}
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              isLoginMode ? "Se connecter" : "S'inscrire"
            )}
          </button>

          <p className='text-center text-gray-600'>
            {isLoginMode ? "Pas encore de compte ?" : "Déjà un compte ?"}
            <button
              type="button"
              className='ml-1 text-cyan-600 font-bold hover:underline'
            >
              {isLoginMode ? "Inscrivez-vous" : "Connectez-vous"}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginSignUp