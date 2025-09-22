"use client"
import React, { useState, useEffect, useRef } from 'react';
// import './App.css'
import Comparison from '../component/Comparison';
import { Star, Section, Menu, X } from "lucide-react";
const Home = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [currentSection, setCurrentSection] = useState('hero'); // hero, comparison, results
  const [isDark, setIsDark] = useState(false);
  const [age, setAge] = useState(35);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [phone, setPhone] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalQuestions = 4;

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
        
        .dark .glass-card {
          background: rgba(45, 52, 54, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
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
      `}</style>

      <div className="text-gray-900">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 glass-card shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-teal-400 rounded-full flex items-center justify-center animate-heart-beat">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div>
                  <span className="text-md-xl text-sm font-bold bg-gradient-to-r from-red-400 to-teal-400 bg-clip-text text-transparent">
                    AssuranceMax.ch
                  </span>
                  <div className="text-xs text-gray-500">🇨🇭 Comparateur Suisse</div>
                </div>
              </div>

              {/* Navigation desktop */}
              <div className="hidden md:flex items-center space-x-6">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              <div className="hidden md:block text-center">
                <p className='text-xs text-md-xl text-gray-500'>avis clients</p>
                <div className="text-xs font-medium text-black">4.9/5 ⭐ 2,847 avis</div>
              </div>

              {/* Menu mobile */}
              <div className="md:hidden flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-xs font-medium text-black">4.9/5 ⭐</div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-700 hover:text-indigo-600"
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
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 font-medium transition-colors duration-200"
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
          <section id="hero" className="relative hero-bg text-white py-20">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Col gauche - Texte */}
              <div className="space-y-6 mt-5 mt-md-0">
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                  Comparateur d&apos;assurance{" "}
                  <span className="text-pink-300">maladie</span> Suisse
                </h1>
                <p className="text-md md:text-xl text-gray-100">
                  Notre plateforme compare instantanément toutes les caisses-maladie suisses pour vous.
                  <span className="font-bold"> Trouvez la meilleure offre en 3 clics !</span>
                </p>

                {/* Avantages */}
                <div className="flex flex-wrap gap-6 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <span className="text-pink-300 text-lg">📊</span>
                    Comparaison gratuite
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-300 text-lg">🏥</span>
                    Toutes les caisses-maladie
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-300 text-lg">⚡</span>
                    Résultats instantanés
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex gap-4">
                  <button onClick={handleStart} className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
                    Comparer les assurances →
                  </button>
                </div>

                {/* Stats de confiance */}
                <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="flex flex-wrap justify-between items-center gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">15+</div>
                      <div className="text-sm opacity-80">Assureurs comparés</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">50K+</div>
                      <div className="text-sm opacity-80">Clients satisfaits</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">2.1K CHF</div>
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
          <div id="comparison" ref={comparisonRef} className='mb-5'>
            <Comparison />
          </div>
        )}

        <section id="results" className="min-h-screen py-20 flex items-center  bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-md-4xl text-2xl font-bold mb-4">Les meilleurs assureurs suisses</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">Nous comparons les offres des assureurs les plus reconnus de Suisse pour vous garantir le meilleur choix</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8" id="results-container">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up border-2 border-gray-100 hover:border-primary" style={{ animationDelay: '0s' }}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl">🥇</span>
                    <div>
                      <h3 className="text-lg font-bold">CSS Assurance </h3>
                      <div className="flex items-center">
                        Meilleur rapport qualité-prix
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center my-6">
                  <div className="text-green-600 font-medium">Jusqu&apos;à 40%
                    d&apos;économies par an</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <span className="mr-2">🌍</span>
                    <span>Couverture mondiale</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="mr-2">🌿</span>
                    <span>Médecines alternatives</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="mr-2">📱</span>
                    <span>Téléconsultation 24h/7j</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up border-2 border-gray-100 hover:border-primary" style={{ animationDelay: '0.2s' }}>
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
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up border-2 border-gray-100 hover:border-primary" style={{ animationDelay: '0.4s' }}>
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
            </div>
          </div>
        </section>

        <section id="reviews" className='bg-gradient-to-br from-gray-50 to-blue-50 py-20'>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header de section */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
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
                <span className="text-2xl font-bold text-gray-900">4.9/5</span>
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

            {/* Call to action */}
            <div className="text-center mt-16">
              <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Rejoignez nos clients satisfaits !</h3>
                <p className="text-lg mb-6 opacity-90">
                  Plus de 50,000 familles suisses ont déjà économisé sur leurs assurances
                </p>
                <button
                  onClick={handleStart}
                  className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors duration-200 text-lg shadow-lg"
                >
                  Commencer ma comparaison gratuitement →
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer id="contact" className="bg-gray-900 text-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
              {/* Section contact */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Contact</h2>
                <p className="text-gray-400">Téléphone : <a href="tel:+41225552632" className="text-blue-400 hover:text-blue-600">+41225552632</a></p>
              </div>
            </div>

            {/* Bas de footer */}
            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
              &copy; 2026 Tous droits réservés.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
export default Home;