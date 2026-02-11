import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom"
import logo from '../assets/logo.svg';
import backgroundImg from "../assets/background.jpg";

function Landing() {

const TypewriterText = ({ texts, speed = 100, deleteSpeed = 50, pauseTime = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);


  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const currentText = texts[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentText.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, texts, speed, deleteSpeed, pauseTime]);

return (
    <span className="inline-block">
      {displayText}
      <span className={`inline-block w-1 h-8 bg-blue-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`} 
            style={{ verticalAlign: 'middle' }} />
    </span>
  );
};


const navigate = useNavigate()

const GoToLogin = () => {
    navigate("/Loginandregister")
}

  const typewriterTexts = [
    "Bienvenue sur MyEEBDevent",
    "Pour rester connectés aux évènements de ton assemblée",
    "Suivre en temps réel le déroulement de chaque évènement",
    "Vivre des moments mémorables avec le Seigneur",
  ];
  return (

    <div 
    className="min-h-screen bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: `url(${backgroundImg})` }}
      
    >
      <div className=" min-h-screen bg-black/50">
              {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="MyEEBDevent" className="h-10 w-auto" />
          </div>
          
          <button className="bg-gradient-to-r from-blue-500  text-white px-6 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition"
          onClick={GoToLogin}
          >
            Se connecter
          </button>

        </nav>
      </header>

      {/* Section HERO */}

      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">

          
          <div className="text-3xl md:text-4xl font-semibold text-white mb-8 h-16 flex items-center justify-center">
            <TypewriterText texts={typewriterTexts} speed={80} deleteSpeed={40} pauseTime={2000} />
          </div>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            La plateforme en ligne des églises les bénis de Dieu, ici vous povez vous incrire à tout les évènement de votre assemblée
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition border border-white/20"
            onClick={GoToLogin}
            >
              Commencer
            </button>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}

export default Landing