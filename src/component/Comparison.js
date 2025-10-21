"use client"
import React, { useEffect, useRef, useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  TrendingUp,
  Award,
  Crown,
  Globe,
  Building,
  Mountain,
  MapPin,
  User,
  Heart,
  Home,
  UserCheck,
  CheckCircle,
  PlusCircle,
  Star,
  HelpCircle,
  Battery,
  UserPlus,
  ArrowLeft,
  ArrowRight,
  Check,
  Lock,
  Zap,
  Gift,
  Phone,
  CreditCard
} from 'lucide-react';


const quizData = [
  {
    question: "Quel âge avez-vous ?",
    iconColor: "text-blue-600",
    options: [
      { text: "18-25 ans", icon: GraduationCap },
      { text: "26-35 ans", icon: Briefcase },
      { text: "36-45 ans", icon: TrendingUp },
      { text: "46-55 ans", icon: Award },
      { text: "56-65 ans", icon: Crown },
    ],
    type: "info"
  },
  {
    question: "Dans quel canton habitez-vous ?",
    iconColor: "text-green-600",
    options: [
      { text: "Genève", icon: Globe },
      { text: "Zurich", icon: Building },
      { text: "Valais", icon: Mountain },
      { text: "Autre canton", icon: MapPin }
    ],
    type: "info"
  },
  {
    question: "Quelle est votre situation familiale ?",
    iconColor: "text-purple-600",
    options: [
      { text: "Célibataire", icon: User },
      { text: "En couple", icon: Heart },
      { text: "Famille avec enfants", icon: Home },
      { text: "Senior", icon: UserCheck }
    ],
    type: "info"
  },
  {
    question: "Quel type de couverture recherchez-vous ?",
    iconColor: "text-teal-600",
    options: [
      { text: "Assurance de base uniquement", icon: CheckCircle },
      { text: "Base + Complémentaire", icon: PlusCircle },
      { text: "Couverture complète", icon: Star },
      { text: "Je ne sais pas", icon: HelpCircle }
    ],
    type: "info"
  },
  {
    question: "À quelle fréquence consultez-vous un médecin ?",
    iconColor: "text-blue-600",
    options: [
      { text: "Rarement (1-2 fois/an)", icon: Battery },
      { text: "Occasionnellement (3-5 fois/an)", icon: Battery },
      { text: "Régulièrement (6-10 fois/an)", icon: Battery },
      { text: "Fréquemment (plus de 10 fois/an)", icon: Battery }
    ],
    type: "info"
  },
  // Question formulaire complet
  {
    // question: "Un conseiller en assurance expert vous contactera gratuitement pour expliquer vos résultats,identifier vos points faibles et vous proposer des solutions adaptées à votre profil.",

    iconColor: "text-green-600",
    type: "form",
    icon: UserPlus
  }
];

// Composant Progress Bar
const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <HelpCircle className="text-white" size={16} />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 ">Question</div>
            <div className="font-semibold text-gray-900 ">
              {current} sur {total}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// Composant Option Answer
const AnswerOption = ({ option, index, isSelected, onSelect }) => {
  const IconComponent = option.icon;

  return (
    <div
      onClick={() => onSelect(index)}
      className={`answer-option group relative overflow-hidden rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-102 hover:shadow-lg p-5 ${isSelected
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
        : 'border-gray-200  bg-white  hover:bg-gray-50 '
        }`}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${isSelected
            ? 'bg-white text-blue-600'
            : 'bg-gray-100  group-hover:bg-blue-600 group-hover:text-white'
            }`}>
            <IconComponent size={20} />
          </div>
        </div>
        <div className="flex-1">
          <div className="text-lg font-medium">
            {option.text}
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected
            ? 'border-white'
            : 'border-gray-300  group-hover:border-blue-600'
            }`}>
            {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant Form Question - MODIFIÉ pour appeler directement onConfirm
const FormQuestion = ({
  question,
  contactData,
  onChange,
  onConfirm, // Changé de onSubmit à onConfirm
  onPrevious,
  currentIndex,
  totalQuestions,
  loading,
  errors = {}
}) => {
  const isFormValid = contactData.firstName && contactData.lastName && contactData.phone && contactData.adresse;
  const IconComponent = question.icon;

  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      await onConfirm(); // Appel direct de la fonction de confirmation
    }
  };

  return (
    <div className="animate-fade-in">
      <ProgressBar
        current={currentIndex + 1}
        total={totalQuestions}
      />

      <div className="mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center shadow-lg mb-4">
            <IconComponent className={`${question.iconColor}`} size={32} />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900  mb-6 leading-relaxed text-center">
          {question.question}
        </h3>
        {/* Éléments de confiance */}
        <div className="grid grid-cols-3 gap-4 mt-8 mb-6">
          <div className="text-center p-4 bg-gray-50  rounded-xl">
            <Lock className="mx-auto text-blue-500 mb-2" size={32} />
            <div className="text-sm font-medium text-gray-700 ">100% sécurisé</div>
          </div>
          <div className="text-center p-4 bg-gray-50  rounded-xl">
            <Zap className="mx-auto text-yellow-500 mb-2" size={32} />
            <div className="text-sm font-medium text-gray-700 ">Envoi instantané</div>
          </div>
          <div className="text-center p-4 bg-gray-50  rounded-xl">
            <Gift className="mx-auto text-green-500 mb-2" size={32} />
            <div className="text-sm font-medium text-gray-700 ">Totalement gratuit</div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="block text-lg font-semibold mb-3 text-gray-700 ">
                <User className="inline mr-2 text-blue-500" size={20} />
                Prénom *
              </label>
              <input
                type="text"
                value={contactData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="Votre prénom"
                className="w-full px-4 py-3 border-2 border-gray-300  rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white  text-gray-900 "
                required
                disabled={loading}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div className="form-group">
              <label className="block text-lg font-semibold mb-3 text-gray-700 ">
                <CreditCard className="inline mr-2 text-purple-500" size={20} />
                Nom *
              </label>
              <input
                type="text"
                value={contactData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Votre nom de famille"
                className="w-full px-4 py-3 border-2 border-gray-300  rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white  text-gray-900 "
                required
                disabled={loading}
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>

            <div className="form-group">
              <label className="block text-lg font-semibold mb-3 text-gray-700 ">
                <Phone className="inline mr-2 text-green-500" size={20} />
                Téléphone *
              </label>
              <input
                type="tel"
                value={contactData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder=" CH +41 23 451 67 89"
                className="w-full px-4 py-3 border-2 border-gray-300  rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white  text-gray-900 "
                required
                disabled={loading}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div className="form-group">
              <label className="block text-lg font-semibold mb-3 text-gray-700 ">
                <MapPin className="inline mr-2 text-red-500" size={20} />
                Adresse *
              </label>
              <input
                type="text"
                value={contactData.adresse}
                onChange={(e) => handleChange('adresse', e.target.value)}
                placeholder="Votre adresse complète"
                className="w-full px-4 py-3 border-2 border-gray-300 d rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white  text-gray-900 "
                required
                disabled={loading}
              />
              {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse}</p>}
            </div>
          </div>


        </div>
        <p>Un conseiller en assurance expert vous contactera gratuitement pour expliquer vos résultats, identifier vos points faibles et vous proposer des solutions adaptées à votre profil.</p>
      </div>

      <div className="flex justify-between items-center pt-6">
        {currentIndex > 0 ? (
          <button
            onClick={onPrevious}
            disabled={loading}
            className="px-6 py-3 border border-gray-300  text-gray-700  rounded-xl hover:bg-gray-50  transition-all duration-300 font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <ArrowLeft className="mr-2" size={16} />
            Précédent
          </button>
        ) : <div></div>}

        <button
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
          className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <span className="flex items-center">
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Envoi en cours...
              </>
            ) : !isFormValid ? (
              'Veuillez remplir tous les champs'
            ) : (
              <>
                Être rappelé gratuitement
                <ArrowRight className="ml-2 text-sm group-hover:translate-x-1 transition-transform duration-300" size={16} />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

// Composant Question Screen - MODIFIÉ pour supprimer onNext
const QuestionScreen = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  contactData,
  onAnswerSelect,
  onFormChange,
  onPrevious,
  onConfirm,
  loading,
  errors = {}
}) => {
  if (question.type === 'form') {
    return (
      <FormQuestion
        question={question}
        contactData={contactData}
        onChange={onFormChange}
        onConfirm={onConfirm} // Passé onConfirm au lieu de onSubmit
        onPrevious={onPrevious}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        loading={loading}
        errors={errors}
      />
    );
  }

  return (
    <div className="animate-fade-in">
      <ProgressBar
        current={currentIndex + 1}
        total={totalQuestions}
      />

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900  mb-6 leading-relaxed text-center">
          {question.question}
        </h3>
        <div className="space-y-4 py-0">
          {question.options.map((option, index) => (
            <AnswerOption
              key={index}
              option={option}
              index={index}
              isSelected={selectedAnswer === index}
              onSelect={onAnswerSelect}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-6">
        {currentIndex > 0 ? (
          <button
            onClick={onPrevious}
            className="px-6 py-3 border border-gray-300  text-gray-700  rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium text-base flex items-center"
          >
            <ArrowLeft className="mr-2" size={16} />
            Précédent
          </button>
        ) : <div></div>}

        {/* Message informatif au lieu du bouton */}
        <div className="text-center text-gray-500">
          {selectedAnswer === null ? (
            <p className="text-sm">Sélectionnez une réponse pour continuer</p>
          ) : (
            <div className="text-sm flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Passage à la question suivante...
            </div>

            // <p className="text-sm flex items-center">
            //   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            //   Passage à la question suivante...
            // </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Composant Results Screen
const ResultsScreen = ({ onRestart }) => {
  const resultRef = useRef(null);

  useEffect(() => {
    resultRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div ref={resultRef} className="text-center animate-fade-in">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="text-green-600" size={48} />
      </div>
      <h2 className=" text-xl text-3xl font-bold text-gray-900 mb-4">
        Demande enregistrée avec succès !
      </h2>
      <p className="text-xl text-gray-600  mb-8">
        Votre demande va être traitée. Un conseiller vous contactera prochainement pour vous proposer les meilleures offres d&apos;assurance adaptées à votre profil.
      </p>
      <button
        onClick={onRestart}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Recommencer
      </button>
    </div>
  );
};

// Composant Principal - MODIFIÉ
const Comparison = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [errors, setErrors] = useState({});
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    adresse: ''
  });
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);

    // Passer automatiquement à la question suivante après un délai
    setTimeout(() => {
      const currentQuestion = quizData[currentQuestionIndex];

      // Enregistrer la réponse pour les questions à choix multiples
      const newUserAnswers = [...userAnswers];
      newUserAnswers[currentQuestionIndex] = {
        questionIndex: currentQuestionIndex,
        answerIndex: answerIndex,
        answerText: currentQuestion.options[answerIndex].text
      };

      setUserAnswers(newUserAnswers);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }, 800); // Délai de 800ms pour permettre à l'utilisateur de voir la sélection
  };

  const handleFormChange = (field, value) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }));
    // Effacer l'erreur pour ce champ quand l'utilisateur tape
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNext = () => {
    const currentQuestion = quizData[currentQuestionIndex];

    // Enregistrer la réponse pour les questions à choix multiples
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = {
      questionIndex: currentQuestionIndex,
      answerIndex: selectedAnswer,
      answerText: currentQuestion.options[selectedAnswer].text
    };

    setUserAnswers(newUserAnswers);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);

      // Restaurer la réponse précédente
      const previousAnswer = userAnswers[currentQuestionIndex - 1];
      const previousQuestion = quizData[currentQuestionIndex - 1];

      if (previousQuestion.type === 'form') {
        // Les données du formulaire sont déjà dans contactData
        setSelectedAnswer(null);
      } else {
        setSelectedAnswer(previousAnswer ? previousAnswer.answerIndex : null);
      }
    }
  };
  const questionRef = React.useRef(null);
  // Scroll vers la barre de question quand on change de question
  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentQuestionIndex]);
  const validatePhone = (phone) => {
    // Supprime les espaces pour simplifier
    const cleaned = phone.replace(/\s+/g, "");

    // Regex pour numéro suisse : commence par +41 ou 0 suivi de 9 chiffres
    const swissRegex = /^(\+41|0)[1-9]\d{8}$/;

    return swissRegex.test(cleaned);
  };

  // Fonction de confirmation directe - MODIFIÉE
  const handleConfirm = async () => {
    setLoading(true);
    setErrors({});

    // Validation du téléphone
    if (!validatePhone(contactData.phone)) {
      setErrors({ phone: "Le numéro doit être un numéro suisse valide." });
      setLoading(false);
      return;
    }

    // Enregistrer d'abord les données du formulaire dans userAnswers
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = {
      questionIndex: currentQuestionIndex,
      formData: contactData
    };
    setUserAnswers(newUserAnswers);

    try {
      const response = await fetch("https://server-assurance.onrender.com/users/register", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData)
      });

      const data = await response.json();

      if (response.ok) {
        // Afficher le message de succès
        setIsCompleted(true);
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
      setErrors({ general: "Erreur réseau ou serveur" });
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setContactData({
      firstName: '',
      lastName: '',
      phone: '',
      adresse: ''
    });
    setErrors({});
    setIsCompleted(false);
  };

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
            `}</style>

      <div className=" hidden md:block absolute top-40 left-10 text-3xl" style={{ animationDelay: '0s' }}>💊</div>
      <div className=" absolute top-32 right-20 text-4xl" style={{ animationDelay: '1s' }}>🩺</div>
      <div className=" hidden md:block   absolute bottom-20 left-20 text-4xl" style={{ animationDelay: '2s' }}>💰</div>
      <div className="absolute  top:2/3 md:top-1/2 right-10 text-5xl" style={{ animationDelay: '3s' }}>🎯</div>

      <div className="w-full max-w-3xl relative z-10 mt-[100px]">
        {!isCompleted ? (
          <QuestionScreen
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={quizData.length}
            selectedAnswer={selectedAnswer}
            contactData={contactData}
            onAnswerSelect={handleAnswerSelect}
            onFormChange={handleFormChange}
            onPrevious={handlePrevious}
            onConfirm={handleConfirm}
            loading={loading}
            errors={errors}
          />
        ) : (
          <ResultsScreen onRestart={handleRestart} />
        )}

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white  rounded-2xl p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Envoi en cours...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comparison;