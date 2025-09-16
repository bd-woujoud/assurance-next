"use client"
import React, { useState } from 'react';

// Données du quiz avec formulaire complet
const quizData = [
  {
    question: "Quel âge avez-vous ?",
    iconColor: "text-blue-600",
    options: [
      { text: "18-25 ans", icon: "fas fa-graduation-cap" },
      { text: "26-35 ans", icon: "fas fa-briefcase" },
      { text: "36-45 ans", icon: "fas fa-chart-line" },
      { text: "46-55 ans", icon: "fas fa-award" },
      { text: "56-65 ans", icon: "fas fa-crown" },
    ],
    type: "info"
  },
  {
    question: "Dans quel canton habitez-vous ?",
    iconColor: "text-green-600",
    options: [
      { text: "Genève", icon: "fas fa-globe" },
      { text: "Zurich", icon: "fas fa-city" },
      { text: "Valais", icon: "fas fa-mountain" },
      { text: "Autre canton", icon: "fas fa-map-pin" }
    ],
    type: "info"
  },
  {
    question: "Quelle est votre situation familiale ?",
    iconColor: "text-purple-600",
    options: [
      { text: "Célibataire", icon: "fas fa-user" },
      { text: "En couple", icon: "fas fa-heart" },
      { text: "Famille avec enfants", icon: "fas fa-home" },
      { text: "Senior", icon: "fas fa-user-check" }
    ],
    type: "info"
  },
  {
    question: "Quel type de couverture recherchez-vous ?",
    iconColor: "text-teal-600",
    options: [
      { text: "Assurance de base uniquement", icon: "fas fa-check-circle" },
      { text: "Base + Complémentaire", icon: "fas fa-plus-circle" },
      { text: "Couverture complète", icon: "fas fa-star" },
      { text: "Je ne sais pas", icon: "fas fa-question-circle" }
    ],
    type: "info"
  },
  {
    question: "À quelle fréquence consultez-vous un médecin ?",
    iconColor: "text-blue-600",
    options: [
      { text: "Rarement (1-2 fois/an)", icon: "fas fa-battery-quarter" },
      { text: "Occasionnellement (3-5 fois/an)", icon: "fas fa-battery-half" },
      { text: "Régulièrement (6-10 fois/an)", icon: "fas fa-battery-three-quarters" },
      { text: "Fréquemment (plus de 10 fois/an)", icon: "fas fa-battery-full" }
    ],
    type: "info"
  },
  // Question formulaire complet
  {
    question: "Pour finaliser votre demande, merci de remplir vos coordonnées",
    iconColor: "text-green-600",
    type: "form",
    icon: "fas fa-user-plus"
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
            <i className="fas fa-question text-white text-sm"></i>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Question</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {current} sur {total}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
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
  return (
    <div
      onClick={() => onSelect(index)}
      className={`answer-option group relative overflow-hidden rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-102 hover:shadow-lg p-5 ${isSelected
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${isSelected
            ? 'bg-white text-blue-600'
            : 'bg-gray-100 dark:bg-gray-600 group-hover:bg-blue-600 group-hover:text-white'
            }`}>
            <i className={`${option.icon} text-lg`}></i>
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
            : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-600'
            }`}>
            {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant Form Question (formulaire complet)
const FormQuestion = ({ question, contactData, onChange, onNext, onPrevious, currentIndex, totalQuestions }) => {
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const isFormValid = contactData.firstName && contactData.lastName && contactData.phone && contactData.adresse;

  const handleChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <div className="animate-fade-in">
      <ProgressBar
        current={currentIndex + 1}
        total={totalQuestions}
      />

      <div className="mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center shadow-lg mb-4">
            <i className={`${question.icon} text-2xl ${question.iconColor}`}></i>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 leading-relaxed text-center">
          {question.question}
        </h3>

        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="block text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
                <i className="fas fa-user mr-2 text-blue-500"></i>
                Prénom *
              </label>
              <input
                type="text"
                value={contactData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="Votre prénom"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
                <i className="fas fa-id-card mr-2 text-purple-500"></i>
                Nom *
              </label>
              <input
                type="text"
                value={contactData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Votre nom de famille"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
                <i className="fas fa-phone mr-2 text-green-500"></i>
                Téléphone *
              </label>
              <input
                type="tel"
                value={contactData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="76 123 45 67"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
                <i className="fas fa-map-marker-alt mr-2 text-red-500"></i>
                Adresse *
              </label>
              <input
                type="text"
                value={contactData.adresse}
                onChange={(e) => handleChange('adresse', e.target.value)}
                placeholder="Votre adresse complète"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Éléments de confiance */}
          <div className="grid grid-cols-3 gap-4 mt-8 mb-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <i className="fas fa-lock text-2xl text-blue-500 mb-2"></i>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">100% sécurisé</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <i className="fas fa-bolt text-2xl text-yellow-500 mb-2"></i>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Envoi instantané</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <i className="fas fa-gift text-2xl text-green-500 mb-2"></i>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Totalement gratuit</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6">
        {currentIndex > 0 ? (
          <button
            onClick={onPrevious}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium text-base"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Précédent
          </button>
        ) : <div></div>}

        <button
          onClick={onNext}
          disabled={!isFormValid}
          className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <span className="flex items-center">
            {!isFormValid
              ? 'Veuillez remplir tous les champs'
              : isLastQuestion
                ? 'Terminer'
                : 'Question suivante'
            }
            <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

// Composant Question Screen
const QuestionScreen = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  contactData,
  onAnswerSelect,
  onFormChange,
  onNext,
  onPrevious
}) => {
  const isLastQuestion = currentIndex === totalQuestions - 1;

  if (question.type === 'form') {
    return (
      <FormQuestion
        question={question}
        contactData={contactData}
        onChange={onFormChange}
        onNext={onNext}
        onPrevious={onPrevious}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
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
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 leading-relaxed text-center">
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
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium text-base"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Précédent
          </button>
        ) : <div></div>}

        <button
          onClick={onNext}
          disabled={selectedAnswer === null}
          className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <span className="flex items-center">
            {selectedAnswer === null
              ? 'Sélectionnez une réponse'
              : isLastQuestion
                ? 'Terminer'
                : 'Question suivante'
            }
            <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

// Composant Popup de Confirmation
const ConfirmationPopup = ({ isOpen, onConfirm, onCancel, userAnswers, contactData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl animate-fade-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check text-green-600 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Confirmer vos informations
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Vérifiez vos réponses avant de les envoyer
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Coordonnées :</h3>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <p><strong>Nom :</strong> {contactData.firstName} {contactData.lastName}</p>
              <p><strong>Téléphone :</strong> {contactData.phone}</p>
              <p><strong>Adresse :</strong> {contactData.adresse}</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Vos réponses :</h3>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              {userAnswers.slice(0, 5).map((answer, index) => (
                <p key={index}>
                  <strong>{quizData[index].question}</strong><br />
                  {answer.answerText}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium"
          >
            Modifier
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant Results Screen
const ResultsScreen = ({ onRestart }) => {
  return (
    <div className="text-center animate-fade-in">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
        <i className="fas fa-check text-green-600 text-3xl"></i>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Merci pour vos réponses !
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
        Nos conseillers vous rappellent bientôt ✨
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

// Composant Principal
const Comparison = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    adresse: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleFormChange = (field, value) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    const currentQuestion = quizData[currentQuestionIndex];

    // Enregistrer la réponse
    const newUserAnswers = [...userAnswers];

    if (currentQuestion.type === 'form') {
      // Pour la question formulaire, on stocke toutes les données de contact
      newUserAnswers[currentQuestionIndex] = {
        questionIndex: currentQuestionIndex,
        formData: contactData
      };
    } else {
      // Pour les questions à choix multiples
      newUserAnswers[currentQuestionIndex] = {
        questionIndex: currentQuestionIndex,
        answerIndex: selectedAnswer,
        answerText: currentQuestion.options[selectedAnswer].text
      };
    }

    setUserAnswers(newUserAnswers);

    // Aller à la question suivante ou montrer la confirmation
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowConfirmation(true);
    }
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

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://server-assurance.onrender.com/users/register", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData)
      });

      if (response.ok) {
        setShowConfirmation(false);
        setIsCompleted(true);
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
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
    setShowConfirmation(false);
    setIsCompleted(false);
  };

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
            `}</style>

      <div className="absolute top-40 left-10 text-3xl" style={{ animationDelay: '0s' }}>💊</div>
      <div className="absolute top-32 right-20 text-4xl" style={{ animationDelay: '1s' }}>🩺</div>
      <div className="absolute bottom-20 left-20 text-4xl" style={{ animationDelay: '2s' }}>💰</div>
      <div className="absolute top-1/2 right-10 text-5xl" style={{ animationDelay: '3s' }}>🎯</div>

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
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        ) : (
          <ResultsScreen onRestart={handleRestart} />
        )}

        <ConfirmationPopup
          isOpen={showConfirmation}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          userAnswers={userAnswers}
          contactData={contactData}
        />

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Envoi en cours...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comparison;