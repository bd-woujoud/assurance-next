
"use client"
import React, { useState, useEffect, useRef } from 'react';
// import './App.css'
import Comparison from '../component/Comparison';

const Home = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [currentSection, setCurrentSection] = useState('hero'); // hero, comparison, results
  const [isDark, setIsDark] = useState(false);
  const [age, setAge] = useState(35);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [phone, setPhone] = useState('');

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
          background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%);
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



@media screen and (max-width:500px){

     .wrapper {

    height: 500px;
  }
      `}</style>

      <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300">

        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 glass-card shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-teal-400 rounded-full flex items-center justify-center animate-heart-beat">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-red-400 to-teal-400 bg-clip-text text-transparent">
                    AssuranceMax.ch
                  </span>
                  <div className="text-xs text-gray-500">🇨🇭 Comparateur Suisse</div>
                </div>
              </div>
              <div className="text-center">
                <p>avis clients</p>
                <div className="text-sm font-medium">4.9/5 ⭐ 2,847 avis</div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}



        {currentSection === 'hero' && (


          <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600  text-white py-20">
            {/* <div className="absolute top-40 left-10 text-3xl emoji-float" style={{ animationDelay: '0s' }}>💊</div>
            <div className="absolute top-32 right-20 text-4xl emoji-float" style={{ animationDelay: '1s' }}>🩺</div>
            <div className="absolute bottom-20 left-20 text-4xl emoji-float" style={{ animationDelay: '2s' }}>💰</div>
            <div className="absolute top-1/2 right-10 text-5xl emoji-float" style={{ animationDelay: '3s' }}>🎯</div>
            <div className="absolute bottom-20 right-1/3 text-6xl emoji-float" style={{ animationDelay: '4s' }}>🔥</div> */}

            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

              {/* Col gauche - Texte */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                  Trouvez l&#39;assurance{" "}
                  <span className="text-pink-300">parfaite</span> en Suisse
                </h1>
                <p className="text-lg md:text-xl text-gray-100">
                  Comparez les meilleures offres d&#39;assurance maladie suisse en 2 minutes.{" "}
                  <span className="font-bold">Économisez jusquà 40% sur vos primes !</span>
                </p>

                {/* Avantages */}
                <div className="flex flex-wrap gap-6 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <span className="text-pink-300 text-lg">🛡️</span>
                    Sécurisé & Gratuit
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-300 text-lg">💰</span>
                    Économies garanties
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-300 text-lg">👨‍👩‍👧‍👦</span>
                    +50&#39;000 familles
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex gap-4">
                  <button onClick={handleStart} className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
                    Commencer ma comparaison →
                  </button>

                </div>

                {/* Logos assurances */}
                <p className="mt-4 text-sm opacity-80">Déjà utilisé par :</p>
                <div className="flex gap-6 text-sm md:text-base font-medium">
                  <span>CSS Assurance</span>
                  <span>Swica</span>
                  <span>Helsana</span>
                  <span>Concordia</span>
                </div>
              </div>

              {/* Col droite - Carrousel */}
              <div className="flex justify-center relative ">
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
          <div ref={comparisonRef} className='mb-5'>
            <Comparison />
          </div>
        )}

      </div>






      <section id="results" className="min-h-screen py-20 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800" style={{ display: 'block' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">

            <h2 className="text-4xl font-bold mb-4">Les meilleurs assureurs suisses</h2>
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
                <div className="text-3xl font-bold text-primary">156 CHF/mois</div>
                <div className="text-sm text-gray-500 line-through">Avant: 285 CHF</div>
                <div className="text-green-600 font-medium">Économie: 129 CHF/mois</div>
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
                    <h3 className="text-lg font-bold">Concordia</h3>
                    <div className="flex items-center">
                      Spécialiste familial
                    </div>
                  </div>
                </div>

              </div>
              <div className="text-center my-6">
                <div className="text-3xl font-bold text-primary">178 CHF/mois</div>
                <div className="text-sm text-gray-500 line-through">Avant: 285 CHF</div>
                <div className="text-green-600 font-medium">Économie: 107 CHF/mois</div>
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
                    <h3 className="text-lg font-bold">Swica</h3>
                    <div className="flex items-center">
                      Innovation digitale
                    </div>
                  </div>
                </div>

              </div>
              <div className="text-center my-6">
                <div className="text-3xl font-bold text-primary">189 CHF/mois</div>
                <div className="text-sm text-gray-500 line-through">Avant: 285 CHF</div>
                <div className="text-green-600 font-medium">Économie: 96 CHF/mois</div>
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


    </div>

  )
}
export default Home;