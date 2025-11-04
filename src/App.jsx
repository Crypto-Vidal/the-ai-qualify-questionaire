import { useState } from 'react'
import LandingPage from './components/LandingPage'
import QuizQuestion from './components/QuizQuestion'
import ContactForm from './components/ContactForm'
import ProgressBar from './components/ProgressBar'
import AnswerSummary from './components/AnswerSummary'

const questions = [
  {
    id: 1,
    question: "What's your primary business goal?",
    options: [
      { id: 'a', text: 'Increase Revenue', emoji: '💰' },
      { id: 'b', text: 'Reduce Operational Costs', emoji: '📉' },
      { id: 'c', text: 'Improve Customer Experience', emoji: '😊' },
      { id: 'd', text: 'Scale Operations', emoji: '📈' },
    ]
  },
  {
    id: 2,
    question: "What's your current team size?",
    options: [
      { id: 'a', text: 'Solo Entrepreneur (1)', emoji: '👤' },
      { id: 'b', text: 'Small Team (2-10)', emoji: '👥' },
      { id: 'c', text: 'Medium Business (11-50)', emoji: '🏢' },
      { id: 'd', text: 'Enterprise (50+)', emoji: '🏗️' },
    ]
  },
  {
    id: 3,
    question: "Which area needs the most automation?",
    options: [
      { id: 'a', text: 'Customer Support', emoji: '💬' },
      { id: 'b', text: 'Sales & Marketing', emoji: '📢' },
      { id: 'c', text: 'Operations & Logistics', emoji: '⚙️' },
      { id: 'd', text: 'Finance & Accounting', emoji: '💵' },
    ]
  },
  {
    id: 4,
    question: "What's your implementation timeline?",
    options: [
      { id: 'a', text: 'Urgent - Within 1 Month', emoji: '🚨', variant: 'warning' },
      { id: 'b', text: 'Soon - 1-3 Months', emoji: '⏰', variant: 'secondary' },
      { id: 'c', text: 'Planned - 3-6 Months', emoji: '📅' },
      { id: 'd', text: 'Exploring - 6+ Months', emoji: '🔍' },
    ]
  },
  {
    id: 5,
    question: "What's your monthly budget for AI solutions?",
    options: [
      { id: 'a', text: 'Under $1,000/month', emoji: '💡' },
      { id: 'b', text: '$1,000 - $5,000/month', emoji: '💼' },
      { id: 'c', text: '$5,000 - $20,000/month', emoji: '🎯' },
      { id: 'd', text: '$20,000+/month', emoji: '🚀' },
    ]
  },
]

function App() {
  const [currentStep, setCurrentStep] = useState(0) // 0 = landing, 1-5 = questions, 6 = summary, 7 = contact
  const [answers, setAnswers] = useState({})

  const handleStartQuiz = () => {
    setCurrentStep(1)
  }

  const handleAnswer = (questionId, answerId) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }))

    if (currentStep < questions.length) {
      setCurrentStep(prev => prev + 1)
    } else {
      setCurrentStep(questions.length + 1) // Go to summary
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleEditAnswer = (questionId) => {
    setCurrentStep(questionId)
  }

  const handleProceedToContact = () => {
    setCurrentStep(questions.length + 2) // Go to contact form
  }

  const handleSubmitContact = (contactInfo) => {
    // Here you would typically send the data to your backend
    console.log('Quiz Answers:', answers)
    console.log('Contact Info:', contactInfo)

    // Show success message or redirect
    alert('Thank you! We\'ll be in touch within 24 hours.')
  }

  const progress = currentStep === 0 ? 0 : currentStep > questions.length ? 100 : (currentStep / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {currentStep > 0 && currentStep <= questions.length + 2 && (
        <ProgressBar progress={progress} currentStep={currentStep} totalSteps={questions.length} />
      )}

      <main className="container mx-auto px-4 py-8 md:py-12">
        {currentStep === 0 && (
          <LandingPage onStart={handleStartQuiz} />
        )}

        {currentStep >= 1 && currentStep <= questions.length && (
          <QuizQuestion
            question={questions[currentStep - 1]}
            selectedAnswer={answers[questions[currentStep - 1].id]}
            onAnswer={handleAnswer}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={questions.length}
          />
        )}

        {currentStep === questions.length + 1 && (
          <AnswerSummary
            questions={questions}
            answers={answers}
            onEdit={handleEditAnswer}
            onProceed={handleProceedToContact}
            onBack={handleBack}
          />
        )}

        {currentStep === questions.length + 2 && (
          <ContactForm
            onSubmit={handleSubmitContact}
            onBack={handleBack}
          />
        )}
      </main>
    </div>
  )
}

export default App
