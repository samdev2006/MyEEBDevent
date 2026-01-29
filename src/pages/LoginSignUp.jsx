import React, { useState } from 'react'
import { Lock, Mail, User, AlertCircle } from 'lucide-react' // Ajout de AlertCircle
import backgroundImg from "../assets/background.jpg";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth, db } from '../firebase/config' 
import { doc, setDoc } from 'firebase/firestore'
import { Navigate } from 'react-router-dom';

function LoginSignUp({ user }) {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nom, setNom] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('') // État pour gérer les messages d'erreur

  const clearError = () => setError('');

  const handleRefreshStatus = async () => {
    setIsLoading(true);
    setError('');
    try {
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified) {
        window.location.reload();
      } else {
        setError("Le mail n'est toujours pas validé. Vérifiez vos spams !");
      }
    } catch (error) {
      setError("Erreur lors de l'actualisation.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password || !nom) {
      setError("Merci de remplir tous les champs !");
      return;
    }

    setIsLoading(true)
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      await sendEmailVerification(newUser);
      await setDoc(doc(db, "users", newUser.uid), {
        nom: nom,
        email: email,
        createdAt: new Date()
      });
      alert("Inscription réussie ! Un mail de vérification vous a été envoyé.");
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError("Cet email est déjà utilisé.");
      } else if (err.code === 'auth/weak-password') {
        setError("Le mot de passe doit contenir au moins 6 caractères.");
      } else {
        setError("Une erreur est survenue lors de l'inscription.");
      }
    } finally {
      setIsLoading(false)
    }
  };

  const handleSignIn = async () => {
    if(!email || !password) return
    setIsLoading(true)
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      // Gestion spécifique du mot de passe ou email incorrect
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError("Email ou mot de passe incorrect.");
      } else if (err.code === 'auth/too-many-requests') {
        setError("Trop de tentatives. Réessayez plus tard.");
      } else {
        setError("Erreur de connexion : vérifiez vos identifiants.");
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (user && user.emailVerified) {
    return <Navigate to="/dashboard" />
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    isLoginMode ? handleSignIn() : handleSignUp();
  };

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
            disabled={isLoading}
            onClick={() => { setIsLoginMode(true); setError(''); }}
            className={`w-1/2 text-lg font-medium transition-all z-10 ${isLoginMode ? "text-white" : "text-black"}`}
          >
            Se connecter
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => { setIsLoginMode(false); setError(''); }}
            className={`w-1/2 text-lg font-medium transition-all z-10 ${!isLoginMode ? "text-white" : "text-black"} `}
          >
            S'inscrire
          </button>
          <div className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 transition-all duration-300 ${isLoginMode ? "left-0" : "left-1/2"}`} />
        </div>

        <form className='space-y-4' onSubmit={handleSubmit}>
          
          {/* AFFICHAGE DU MESSAGE D'ERREUR */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={18} className="text-red-500" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {user && !user.emailVerified && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-sm text-blue-800 text-center animate-pulse">
              <p>Votre email n'est pas encore vérifié.</p>
              <button 
                type="button" 
                onClick={handleRefreshStatus}
                className="mt-2 font-bold underline block w-full hover:text-blue-600"
              >
                J'ai validé le mail, actualiser mon statut
              </button>
            </div>
          )}

          {!isLoginMode && (
            <label className='flex items-center gap-2'>
              <User size={20} className="text-gray-400" />
              <input
                type="text"
                disabled={isLoading}
                placeholder='Votre nom'
                onChange={(e) => { setNom(e.target.value); clearError(); }} 
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
              disabled={isLoading}
              onChange={(e) => { setPassword(e.target.value); clearError(); }}
              placeholder='Mot de passe'
              required
              className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 disabled:bg-gray-50'
            />
          </label>

          <button 
            type='submit'
            disabled={isLoading}
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
              disabled={isLoading}
              onClick={() => { setIsLoginMode(!isLoginMode); setError(''); }}
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