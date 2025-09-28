"use client"
import React, { useState, useEffect, useRef } from 'react';
// import './App.css'
import Comparison from '../component/Comparison';
import { Star, Section, Menu, X } from "lucide-react";
import Image from 'next/image';
import img from '../comp.png'
import Swal from 'sweetalert2';
const Home = () => {

  const [currentSection, setCurrentSection] = useState('hero'); // hero, comparison, results
  const [isDark, setIsDark] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  // Dark mode detection
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Animate counters
  useEffect(() => {
    if (currentSection === 'hero') {
      setTimeout(() => {
        // Counter animations would go here
      }, 1000);
    }
  }, [currentSection]);

  const generateResults = () => {
    const offers = [
      {
        name: "SwissHealth Premium 🏆",
        price: "156",
        originalPrice: "285",
        features: ["🌍 Couverture mondiale", "🌿 Médecines alternatives", "📱 Téléconsultation 24h/7j"],
        rating: 4.9,
        badge: "TOP CHOIX",
        badgeColor: "bg-green-500",
        emoji: "🥇"
      },
      {
        name: "AlpenAssure Plus 💎",
        price: "178",
        originalPrice: "285",
        features: ["⚡ Franchise modulable", "🚀 Remboursement express", "🏥 Réseau médical premium"],
        rating: 4.7,
        badge: "MEILLEUR PRIX",
        badgeColor: "bg-blue-500",
        emoji: "🥈"
      },
      {
        name: "HelvetiaCare Elite ⭐",
        price: "189",
        originalPrice: "285",
        features: ["👑 Service VIP", "🏨 Cliniques privées", "🔧 Assistance 24h/7j"],
        rating: 4.8,
        badge: "PREMIUM",
        badgeColor: "bg-purple-500",
        emoji: "🥉"
      }
    ];

    return offers;
  };

  const [showComparison, setShowComparison] = useState(false);
  const comparisonRef = useRef();

  // Scroll automatique après rendu
  useEffect(() => {
    if (showComparison && comparisonRef.current) {
      comparisonRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showComparison]);

  const handleStart = () => {
    setShowComparison(true);
  };

  // Navigation items
  const navItems = [
    { name: 'Accueil', href: '#hero' },
    { name: 'Comparaison', href: '#comparison' },
    { name: 'Assureurs', href: '#results' },
    { name: 'Avis', href: '#reviews' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };
  const [count, setCount] = useState(317); // valeur de départ

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        let newValue = prev + change;

        // borne min et max
        if (newValue < 317) newValue = 317;
        if (newValue > 350) newValue = 350;

        return newValue;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);




  const reviews = [
    {
      name: "Alice",
      role: "Client satisfait",
      text: "AssuranceMax.ch m'a aidé à trouver la meilleure assurance auto en Suisse. Très pratique !",
      rating: 5,
    },
    {
      name: "Bob",
      role: "Utilisateur",
      text: "Comparateur clair et rapide. Je recommande pour tout type d'assurance.",
      rating: 4,
    },
    {
      name: "Charlie",
      role: "Client fidèle",
      text: "Excellent suivi et interface intuitive pour comparer mes assurances.",
      rating: 5,
    },
    {
      name: "David",
      role: "Utilisateur",
      text: "Simple, rapide et fiable. Très bon comparateur suisse.",
      rating: 5,
    },
    {
      name: "Emma",
      role: "Client satisfait",
      text: "J'ai trouvé l'assurance parfaite pour ma voiture grâce à AssuranceMax.ch !",
      rating: 5,
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  // Auto-scroll toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  // Scroll effect
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.style.transition = "transform 0.7s ease";
      slider.style.transform = `translateX(-${currentIndex * (100 / 3)}%)`;
    }
  }, [currentIndex]);




  const [showFloatBtn, setShowFloatBtn] = useState(true);

  useEffect(() => {
    const cta = document.querySelector("#cta");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "cta") {
            setShowFloatBtn(!entry.isIntersecting);
            // bouton caché si la section "Rejoignez nos clients satisfaits !" est visible
          }
        });
      },
      { threshold: 0.2 } // visible si au moins 20% de la section est dans l'écran
    );

    if (cta) observer.observe(cta);

    return () => observer.disconnect();
  }, []);



  //declarer les etats pour le formulaire
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    adresse: "",

    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };
  const validatePhone = (phone) => {
    // Supprime les espaces pour simplifier
    const cleaned = phone.replace(/\s+/g, "");

    // Regex pour numéro suisse : commence par +41 ou 0 suivi de 9 chiffres
    const swissRegex = /^(\+41|0)[1-9]\d{8}$/;

    return swissRegex.test(cleaned);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});

    if (!validatePhone(contactData.phone)) {
      setErrors({ phone: "Le numéro doit être un numéro suisse valide." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://server-assurance.onrender.com/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsCompleted(true);

        setContactData({ firstName: "", lastName: "", adresse: "", email: "", phone: "" });
        Swal.fire({
          icon: "success",
          title: "Merci !",
          text: "Votre demande a été envoyée. Notre conseiller va vous rappeler.",

          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      } else {
        const fieldErrors = {};
        if (data.message) {
          const msgs = data.message.split(",");
          msgs.forEach((msg) => {
            if (msg.toLowerCase().includes("nom de famille")) fieldErrors.lastName = msg.trim();
            else if (msg.toLowerCase().includes("prénom")) fieldErrors.firstName = msg.trim();
            else if (msg.toLowerCase().includes("téléphone")) fieldErrors.phone = msg.trim();
            else if (msg.toLowerCase().includes("adresse")) fieldErrors.adresse = msg.trim();
          });
        }
        setErrors(fieldErrors);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur réseau ou serveur",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>


      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes rotating {
          from { transform: perspective(1000px) rotateX(-15deg) rotateY(0); }
          to { transform: perspective(1000px) rotateX(-15deg) rotateY(360deg); }
        }
        
        .gradient-bg {
          background:linear-gradient(135deg, #667eea 0 %, #764ba2 100 %);
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
    
        
        .emoji-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .category-card:hover {
          transform: translateY(-10px) scale(1.05);
        }

        .animate-wiggle { animation: wiggle 1s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce 3s infinite; }
        .animate-pulse-slow { animation: pulse 4s infinite; }
        .animate-slide-up { animation: slideUp 0.6s ease-out; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-heart-beat { animation: heartBeat 1.5s ease-in-out infinite; }

        .wrapper {
          width: 100%;
          height: 100vh;
          /* plein écran */
          position: relative;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .inner {
          --w: 100px;
          --h: 150px;
          --translateZ: calc((var(--w) + var(--h)) + 0px);
          --rotateX: -15deg;
          --perspective: 1000px;
          position: absolute;
          width: var(--w);
          height: var(--h);
          top: 25%;
          left: calc(50% - (var(--w) / 2) - 2.5px);
          z-index: 2;
          transform-style: preserve-3d;
          transform: perspective(var(--perspective));
          animation: rotating 20s linear infinite;
        }

        @keyframes rotating {
          from {
            transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(0);
          }
          to {
            transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(1turn);
          }
        }

        .card {
          position: absolute;
          border: 2px solid rgba(var(--color-card));
          border-radius: 12px;
          overflow: hidden;
          inset: 0;
          transform: rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(var(--translateZ));
        }



._7_i_XA {
    display: block;
    height: 60px;
    pointer-events: none;
    position: absolute;
    width: 100px

}

._7_i_XA {
    object-fit: fill
 
}




        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: #0000 radial-gradient(circle,
              rgba(var(--color-card), 0.2) 0%,
              rgba(var(--color-card), 0.6) 80%,
              rgba(var(--color-card), 0.9) 100%);
        }

        .hero-bg {
          background-image: 
            linear-gradient(135deg, rgba(102, 126, 234, 0.85) 0%, rgba(118, 75, 162, 0.85) 100%),
            url('https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        @media screen and (max-width:500px){
          .wrapper {
            height: 500px;
          }
        }


/* From Uiverse.io by Pravins01 */ 
/* From Uiverse.io by PriyanshuGupta28 */ 
.card2 {
  // width: 190px;
  // height: 254px;
  border-radius: 1rem;
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
}



      `}</style>

      <div className="text-gray-900">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 glass-card shadow-lg !bg-white ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3 mt-6">



                <Image src={img} alt="Logo" width={100} height={60} className="cursor-pointer " onClick={() => scrollToSection('#hero')} />





                {/* Navigation desktop */}
                <div className="hidden md:flex items-center space-x-6">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="text-gray-700 hover:text-indigo-600 cursor-pointer font-medium transition-colors duration-200"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className='flex flex-row space-x-3'>
                <div className="hidden md:block text-center">
                  <p className='text-xs text-md-xl text-gray-500'>avis clients</p>
                  <div className="text-xs font-medium text-black">4.7/5 ⭐ 2,847 avis</div>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <p className="text-xs text-green-600">En ligne : {count}</p>

                </div>
              </div>
              {/* Menu mobile */}
              <div className="md:hidden flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-xs font-medium text-black">4.7/5 ⭐</div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-700 cursor-pointer hover:text-indigo-600"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Menu mobile déroulant */}
            {isMobileMenuOpen && (
              <div className="md:hidden bg-white border-t border-gray-200">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full cursor-pointer text-left px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 font-medium transition-colors duration-200"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        {currentSection === 'hero' && (
          <section id="hero" className="relative hero-bg text-white py-20 mb-12 md:mb-16">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10 md:mt-20">
              {/* Col gauche - Texte */}
              <div className="space-y-6 mt-5 mt-md-0">
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                  Comparateur d&apos;assurance{" "}
                  <span className="text-pink-300">maladie</span> Suisse
                </h1>



                <div className="card2 w-full p-5">

                  <p className="text-md md:text-xl text-gray-100">
                    Notre plateforme compare instantanément toutes les caisses-maladie suisses pour vous. <br />
                    <span className="font-bold"> Trouvez la meilleure offre en 3 clics !</span>
                  </p>
                </div>

                {/* Avantages */}
                <div className="flex flex-wrap gap-6 text-sm md:text-base">
                  <button
                    onClick={handleStart}
                    className={`flex flex-row fixed animate-pulse text-md right-6 cursor-pointer bg-blue-600 font-bold text-white px-5 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 z-50`}
                    style={{
                      top: currentSection === 'hero' ? '80%' : '0%', // top différent selon section
                      marginTop: currentSection === 'hero' ? '60px' : '0px'
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="animate-spin h-5 w-5 mr-3 text-white"
                    >
                      <circle
                        strokeWidth="4"
                        stroke="currentColor"
                        r="10"
                        cy="12"
                        cx="12"
                        className="opacity-25"
                      ></circle>
                      <path
                        d="M4 12a8 8 0 018-8v8H4z"
                        fill="currentColor"
                        className="opacity-75"
                      ></path>
                    </svg>
                    Comparer les assurances
                  </button>




                  <div className="flex items-center gap-2">
                    <span className="text-green-300 text-lg">🏥</span>
                    Toutes les caisses-maladie
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-300 text-lg">⚡</span>
                    Résultats instantanés
                  </div>
                </div>



                {/* Stats de confiance */}
                <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="flex flex-wrap justify-between items-center gap-4 text-center">
                    <div>
                      <div className=" text-xl md:text-2xl font-bold">15+</div>
                      <div className="text-sm opacity-80">Assureurs comparés</div>
                    </div>
                    <div>
                      <div className=" text-xl md:text-2xl font-bold">20K+</div>
                      <div className="text-sm opacity-80">Clients satisfaits</div>
                    </div>
                    <div>
                      <div className=" text-xl md:text-2xl font-bold">2.1K CHF</div>
                      <div className="text-sm opacity-80">Économie moyenne/an</div>
                    </div>
                  </div>
                </div>

                {/* Logos assurances */}
                <p className="mt-4 text-sm opacity-80">Nous comparons toutes les principales caisses-maladie :</p>
                <div className="flex flex-wrap gap-4 text-sm md:text-base font-medium">
                  <span>CSS</span>
                  <span>Swica</span>
                  <span>Helsana</span>
                  <span>Concordia</span>
                  <span>Assura</span>
                  <span>Groupe Mutuel</span>
                </div>
              </div>

              {/* Col droite - Carrousel */}
              <div className="flex justify-center relative">
                <div className="wrapper">
                  <div className="inner" style={{ "--quantity": 10 }}>
                    <div className="card" style={{ "--index": 0, "--color-card": "142, 249, 252" }}>
                      <div className="img flex items-center justify-center">
                        <h5 className="font-bold">Swica</h5>
                      </div>
                    </div>
                    <div className="card" style={{ "--index": 1, "--color-card": "142, 252, 204" }}>
                      <div className="img flex items-center justify-center">
                        <h5 className="font-bold">Helsana</h5>
                      </div>
                    </div>
                    <div className="card" style={{ "--index": 2, "--color-card": "142, 252, 157" }}>
                      <div className="img flex items-center justify-center">
                        <h5 className="font-bold">Groupe Mutuel</h5>
                      </div>
                    </div>
                    <div className="card" style={{ "--index": 3, "--color-card": "215, 252, 142" }}>
                      <div className="img flex items-center justify-center">
                        <h5 className="font-bold">KPT</h5>
                      </div>
                    </div>
                    <div className="card" style={{ "--index": 4, "--color-card": "252, 252, 142" }}>
                      <div className="img flex items-center justify-center">
                        <h5 className="font-bold">CSS</h5>
                      </div>
                    </div>
                    <div className="card" style={{ "--index": 5, "--color-card": "252, 208, 142" }}>
                      <div className="img flex items-center justify-center">
                        <h5 className="font-bold">Concordia</h5>
                      </div>
                    </div>
                    <div className="card" style={{ "--index": 6, "--color-card": "252, 142, 142" }}>
                      <div className="img flex items-center justify-center">
                        <h5 className="font-bold">Sanitas</h5>
                      </div>
                    </div>
                    <div className="card" style={{ "--index": 7, "--color-card": "252, 142, 239" }}>
                      <div className="img flex items-center justify-center">
                        <h5 className="font-bold">Assura</h5>
                      </div>
                    </div>
                    <div className="card" style={{ "--index": 8, "--color-card": "204, 142, 252" }}>
                      <div className="img flex items-center justify-center">
                        <h5 className="font-bold">Swisslife</h5>
                      </div>
                    </div>
                    <div className="card" style={{ "--index": 9, "--color-card": "142, 202, 252" }}>
                      <div className="img flex items-center justify-center">
                        <h5 className="font-bold">Visana</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {showComparison && (
          <div id="comparison" ref={comparisonRef} className='mb-16'>
            <Comparison />
          </div>
        )}

        {/* Section des résultats */}
        <section id="results" className="py-16 mb-12 md:mb-16 ">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className=" text-2xl md:text-3xl font-bold mb-4">Les meilleurs assureurs suisses</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">Nous comparons les offres des assureurs les plus reconnus de Suisse pour vous garantir le meilleur choix</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8" id="results-container">
              <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up border-2 border-gray-100 hover:border-primary" style={{ animationDelay: '0.2s' }}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl">🥈</span>
                    <div>
                      <h3 className="text-lg font-bold">Helsana</h3>
                      <div className="flex items-center">
                        Spécialiste familial
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center my-6">
                  <div className="text-green-600 font-medium">Jusqu&apos;à 30%
                    d&apos;économies par an</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <span className="mr-2">⚡</span>
                    <span>Assurance famille</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="mr-2">⚡</span>
                    <span>Médecine alternative</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="mr-2">⚡</span>
                    <span>Conseil personnalisé</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white  rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up border-2 border-gray-100 hover:border-primary" style={{ animationDelay: '0.4s' }}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl">🥉</span>
                    <div>
                      <h3 className="text-lg font-bold">Assura</h3>
                      <div className="flex items-center">
                        Innovation digitale
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center my-6">
                  <div className="text-green-600 font-medium">Jusqu&apos;à 28%
                    d&apos;économies par an</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <span className="mr-2">👑</span>
                    <span>Remboursements rapides</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="mr-2">👑</span>
                    <span>IA diagnostique</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="mr-2">👑</span>
                    <span>App mobile primée</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white  rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up border-2 border-gray-100 hover:border-primary" style={{ animationDelay: '0s' }}> <div className="flex justify-between items-start mb-4"> <div className="flex items-center space-x-2"> <span className="text-3xl">🥇</span> <div> <h3 className="text-lg font-bold">CSS Assurance </h3> <div className="flex items-center"> Meilleur rapport qualité-prix </div> </div> </div> </div> <div className="text-center my-6"> <div className="text-green-600 font-medium">Jusqu&apos;à 40% d&apos;économies par an</div> </div> <ul className="space-y-3 mb-6"> <li className="flex items-center text-sm"> <span className="mr-2">🌍</span> <span>Couverture mondiale</span> </li> <li className="flex items-center text-sm"> <span className="mr-2">🌿</span> <span>Médecines alternatives</span> </li> <li className="flex items-center text-sm"> <span className="mr-2">📱</span> <span>Téléconsultation 24h/7j</span> </li> </ul> </div>
            </div>
          </div>
        </section>

        {/* Section des avis */}
        <section id="reviews" className='py-16 mb-12 md:mb-16 bg-gradient-to-br from-gray-50 to-blue-50'>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header de section */}
            <div className="text-center mb-16">
              <h2 className=" text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ce que disent nos clients
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez pourquoi plus de 50,000 familles suisses nous font confiance pour leurs assurances
              </p>
              <div className="flex items-center justify-center mt-6 space-x-2">
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-2xl font-bold text-gray-900">4.7/5</span>
                <span className="text-gray-600">(2,847 avis)</span>
              </div>
            </div>

            {/* Grid des avis */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Avis 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    M
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Marie Dubois</h4>
                    <p className="text-gray-500">Maman de 3 enfants</p>
                    <div className="flex mt-1">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic leading-relaxed">
                  "Grâce à AssuranceMax.ch, j'ai économisé plus de 2000 CHF par an sur notre assurance famille !
                  Le processus était simple et rapide. Je recommande vivement."
                </blockquote>
                <div className="mt-4 text-sm text-gray-500">
                  ✅ Économie réalisée: 2,100 CHF/an
                </div>
              </div>

              {/* Avis 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    J
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Jean-Luc Martin</h4>
                    <p className="text-gray-500">Entrepreneur, Genève</p>
                    <div className="flex mt-1">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic leading-relaxed">
                  "Interface très intuitive et service client exceptionnel. En 10 minutes,
                  j'avais comparé toutes les offres et trouvé la meilleure assurance pour mon profil."
                </blockquote>
                <div className="mt-4 text-sm text-gray-500">
                  ✅ Temps de comparaison: 10 minutes
                </div>
              </div>

              {/* Avis 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    S
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Sophie Chen</h4>
                    <p className="text-gray-500">Étudiante, Lausanne</p>
                    <div className="flex mt-1">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic leading-relaxed">
                  "Parfait pour les jeunes ! J'ai trouvé une assurance adaptée à mon budget d'étudiante.
                  Le comparateur est gratuit et sans engagement."
                </blockquote>
                <div className="mt-4 text-sm text-gray-500">
                  ✅ Assurance étudiante à partir de 89 CHF/mois
                </div>
              </div>

              {/* Avis 4 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    P
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Pierre Muller</h4>
                    <p className="text-gray-500">Retraité, Zurich</p>
                    <div className="flex mt-1">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic leading-relaxed">
                  "Excellent service ! À 65 ans, je pensais que changer d'assurance serait compliqué.
                  L'équipe m'a accompagné tout au long du processus."
                </blockquote>
                <div className="mt-4 text-sm text-gray-500">
                  ✅ Accompagnement personnalisé senior
                </div>
              </div>

              {/* Avis 5 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    A
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Anna Rossi</h4>
                    <p className="text-gray-500">Médecin, Bâle</p>
                    <div className="flex mt-1">
                      {Array(4).fill(0).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic leading-relaxed">
                  "En tant que professionnelle de santé, j'apprécie la transparence des informations.
                  Les détails des couvertures sont clairs et précis."
                </blockquote>
                <div className="mt-4 text-sm text-gray-500">
                  ✅ Comparaison détaillée des garanties
                </div>
              </div>

              {/* Avis 6 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    T
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Thomas Weber</h4>
                    <p className="text-gray-500">Ingénieur, Berne</p>
                    <div className="flex mt-1">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic leading-relaxed">
                  "Processus 100% digital et sécurisé. J'ai pu comparer et souscrire directement en ligne.
                  Gain de temps considérable !"
                </blockquote>
                <div className="mt-4 text-sm text-gray-500">
                  ✅ Souscription en ligne sécurisée
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section CTA */}
        <section className="py-16 mb-12 md:mb-16">
          <div id="cta" className="text-center">
            <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Rejoignez nos clients satisfaits !</h3>
              <p className="text-lg mb-6 opacity-90">
                Plus de 50,000 familles suisses ont déjà économisé sur leurs assurances
              </p>
              <button
                onClick={handleStart}
                className="bg-white cursor-pointer text-indigo-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors duration-200 text-lg shadow-lg"
              >
                Commencer ma comparaison gratuitement →
              </button>
            </div>
          </div>
        </section>

        {/* Section Contact */}
        <section id="contactf" className="py-16mb-12 md:mb-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className=" text-2xl md:text-3xl pt-10  font-bold mb-8 text-center">Contactez-nous</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Formulaire */}
              <div>
                <form className="bg-white p-6 rounded shadow-md space-y-4">
                  {/* Row Nom + Prénom */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Nom</label>
                      <input
                        type="text"
                        name="firstName"
                        value={contactData.firstName}
                        onChange={handleChangeForm}
                        placeholder="Votre nom"
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Prénom</label>
                      <input
                        type="text"
                        name="lastName"
                        value={contactData.lastName}
                        onChange={handleChangeForm}
                        placeholder="Votre prénom"
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={contactData.phone}
                        onChange={handleChangeForm}
                        placeholder="Votre téléphone"
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Adresse</label>
                      <input
                        type="text"
                        name="adresse"
                        value={contactData.adresse}
                        onChange={handleChangeForm}
                        placeholder="Votre adresse"
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                      {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse}</p>}
                    </div>
                  </div>
                  {/* message */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Message</label>
                    <textarea placeholder="Votre message" className="w-full border border-gray-300 p-2 rounded h-32" defaultValue={""} />
                  </div>

                  {/* Bouton */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    {loading ? "Envoi..." : "Envoyer"}
                  </button>
                </form>
              </div>

              {/* Google Maps */}
              <div className="h-80 md:h-auto">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2780.174616367804!2d6.136833276098012!3d46.19969547911582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c6502f49df79f%3A0x16d839b872b08a44!2sRue%20%C3%89tienne%20Dumont%2016%2C%202004%20Gen%C3%A8ve%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1706075667890!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-gray-900 text-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
              {/* Section contact */}


              <div className="relative">
                <div className="absolute inset-0 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl" />
                <div className="relative flex items-end gap-x-2 p-2">
                  <div className="flex items-center gap-4">
                    <div className="social-button">
                      <a
                        href="https://wa.me/0033648897038"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-12 h-12 rounded-full group block"
                      >
                        <div className="floater w-full h-full absolute top-0 left-0 bg-green-500 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
                        <div className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-green-500 rounded-full">
                          <svg className="socialSvg whatsappSvg bg-green-500" fill="white" viewBox="0 0 22 22" height={22} width={22}>
                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
                          </svg>
                        </div>
                      </a>
                    </div>
                    <div className="social-button">
                      <a href="https://www.facebook.com/share/1CHrUhMcZk/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                        <button className="relative w-12 h-12 rounded-full group">
                          <div className="floater w-full h-full absolute top-0 left-0 bg-blue-500 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
                          <div className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-blue-500 rounded-full">
                            <svg fill="none" viewBox="0 0 13 22" height={22} width={13} xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M7.71289 22H4.1898C3.60134 22 3.12262 21.5213 3.12262 20.9328V12.9863H1.06717C0.478672 12.9863 0 12.5074 0 11.9191V8.514C0 7.9255 0.478672 7.44683 1.06717 7.44683H3.12262V5.74166C3.12262 4.05092 3.6535 2.6125 4.65773 1.58207C5.6665 0.546992 7.07627 0 8.7346 0L11.4214 0.00438281C12.0089 0.00537109 12.4868 0.484086 12.4868 1.07151V4.23311C12.4868 4.82157 12.0083 5.30028 11.4199 5.30028L9.61091 5.30093C9.05919 5.30093 8.91868 5.41153 8.88864 5.44543C8.83914 5.50172 8.78023 5.66062 8.78023 6.09954V7.4467H11.284C11.4725 7.4467 11.6551 7.49319 11.812 7.58076C12.1506 7.76995 12.3611 8.12762 12.3611 8.51417L12.3597 11.9193C12.3597 12.5074 11.881 12.9861 11.2926 12.9861H8.78019V20.9328C8.78023 21.5213 8.30139 22 7.71289 22ZM4.41233 20.7103H7.49031V12.4089C7.49031 12.016 7.81009 11.6964 8.20282 11.6964H11.07L11.0712 8.73662H8.20265C7.80991 8.73662 7.49031 8.41706 7.49031 8.02411V6.09959C7.49031 5.59573 7.54153 5.0227 7.92185 4.59198C8.38144 4.07133 9.10568 4.01126 9.61056 4.01126L11.1971 4.01057V1.29375L8.73357 1.28975C6.06848 1.28975 4.41238 2.99574 4.41238 5.7417V8.02407C4.41238 8.4168 4.09277 8.73658 3.7 8.73658H1.28975V11.6964H3.7C4.09277 11.6964 4.41238 12.016 4.41238 12.4089L4.41233 20.7103Z"
                                className="group-hover:fill-[#171543] fill-white duration-300"
                              />
                            </svg>
                          </div>
                        </button>
                      </a>
                    </div>

                    <div className="social-button">
                      <button className="relative w-12 h-12 rounded-full group">
                        <div className="floater w-full h-full absolute top-0 left-0 bg-blue-500 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
                        <div className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-blue-500 rounded-full">
                          <svg y={0} xmlns="http://www.w3.org/2000/svg" x={0} width={100} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" height={100} className="w-8 h-8 shrink-0 fill-white">
                            <path d="M92.86,0H7.12A7.17,7.17,0,0,0,0,7.21V92.79A7.17,7.17,0,0,0,7.12,100H92.86A7.19,7.19,0,0,0,100,92.79V7.21A7.19,7.19,0,0,0,92.86,0ZM30.22,85.71H15.4V38H30.25V85.71ZM22.81,31.47a8.59,8.59,0,1,1,8.6-8.59A8.6,8.6,0,0,1,22.81,31.47Zm63,54.24H71V62.5c0-5.54-.11-12.66-7.7-12.66s-8.91,6-8.91,12.26V85.71H39.53V38H53.75v6.52H54c2-3.75,6.83-7.7,14-7.7,15,0,17.79,9.89,17.79,22.74Z" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bas de footer */}
            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
              &copy; 2025 Tous droits réservés.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
export default Home;