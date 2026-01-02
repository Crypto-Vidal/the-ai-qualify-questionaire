import { useState } from 'react'
import LandingPage from './components/LandingPage'
import QuizQuestion from './components/QuizQuestion'
import ContactForm from './components/ContactForm'
import ProgressBar from './components/ProgressBar'
import Report from './components/Report'

const questions = [
  {
    id: 1,
    question: "What's eating up your time or money right now?",
    subheading: "Pick the one that genuinely keeps you up at night.",
    confirmation: (answer) => {
      const area = questions[0].options.find(o => o.id === answer)?.area || 'this area';
      return `Yeah. ${area} is where most teams are losing the most time.`;
    },
    options: [
      { id: 'a', text: 'Customer interactions', emoji: '💬', subtitle: 'Support, sales follow-ups, lead inquiries—constant back-and-forth', area: 'Customer interactions' },
      { id: 'b', text: 'Admin work', emoji: '📋', subtitle: 'Invoicing, scheduling, data entry. The grind.', area: 'Admin work' },
      { id: 'c', text: 'Team coordination', emoji: '🔄', subtitle: 'Chasing people for updates. Information everywhere.', area: 'Team coordination' },
      { id: 'd', text: 'Content & knowledge work', emoji: '✍️', subtitle: 'Writing, designing, research, documentation.', area: 'Content work' },
      { id: 'e', text: 'Data & decisions', emoji: '📊', subtitle: 'Analyzing numbers. Figuring out what matters.', area: 'Data analysis' },
    ]
  },
  {
    id: 2,
    question: "How many people are stuck doing repetitive work 50% of the time?",
    subheading: "Ballpark is fine. We're figuring out how much time you have on the table.",
    confirmation: (answer) => {
      const people = questions[1].options.find(o => o.id === answer)?.peopleCount || 'X';
      return `So ${people} people-hours per week. That's real money we can free up.`;
    },
    options: [
      { id: 'a', text: 'Just me', emoji: '👤', subtitle: 'I\'m doing everything.', peopleCount: '20+' },
      { id: 'b', text: '1-2 people', emoji: '👥', subtitle: 'Small team. Every hour matters.', peopleCount: '40-80' },
      { id: 'c', text: '3-5 people', emoji: '👥👥', subtitle: 'Growing. Still doing things the old way.', peopleCount: '60-100' },
      { id: 'd', text: '6+ people', emoji: '👥👥👥', subtitle: 'More structured. But still manual work everywhere.', peopleCount: '120+' },
    ]
  },
  {
    id: 3,
    question: "Where exactly is the problem in your workflow?",
    subheading: "Getting information IN, processing it, or getting it OUT?",
    confirmation: () => "That's the biggest leverage point. We'll focus there first.",
    options: [
      { id: 'a', text: 'Getting information in', emoji: '📥', subtitle: 'Leads/data come in scattered. We spend time collecting it all.' },
      { id: 'b', text: 'Processing it', emoji: '🔧', subtitle: 'We have the data. Organizing, routing, enriching takes forever.' },
      { id: 'c', text: 'Creating what goes out', emoji: '📤', subtitle: 'Writing responses, proposals, reports. Takes too long.' },
      { id: 'd', text: 'All of the above', emoji: '🔁', subtitle: 'Multiple stages are broken.' },
    ]
  },
  {
    id: 4,
    question: "What systems are you using right now? (Pick what applies)",
    subheading: "This tells us if we integrate with what you have or build something new.",
    multiSelect: true,
    confirmation: () => "Good. We don't have to blow up your current setup.",
    options: [
      { id: 'a', text: 'Email (Gmail, Outlook, etc.)', emoji: '📧' },
      { id: 'b', text: 'CRM (HubSpot, Salesforce, Pipedrive, etc.)', emoji: '📊' },
      { id: 'c', text: 'Project management (Asana, Monday, Notion, etc.)', emoji: '📋' },
      { id: 'd', text: 'Support system (Zendesk, Intercom, Help Scout, etc.)', emoji: '💬' },
      { id: 'e', text: 'Accounting (QuickBooks, FreshBooks, Stripe, etc.)', emoji: '💰' },
      { id: 'f', text: 'Spreadsheets or custom database', emoji: '📑' },
      { id: 'g', text: 'Mostly just email and spreadsheets', emoji: '✉️' },
    ]
  },
  {
    id: 5,
    question: "When do you want results, and who's running the project?",
    subheading: "Timeline + commitment = whether this actually happens. Be honest.",
    confirmation: (answer) => {
      if (answer === 'a' || answer === 'b') return "That's realistic. You'll see real wins.";
      return "Smart. The report will show you if this is worth your time.";
    },
    options: [
      { id: 'a', text: 'ASAP. Within 1 month. I\'m managing it.', emoji: '🚀', subtitle: 'This is the priority.' },
      { id: 'b', text: '1-3 months. Someone on my team is handling it.', emoji: '📅', subtitle: 'Serious and structured.' },
      { id: 'c', text: '3-6 months. We\'ll figure it out.', emoji: '🔍', subtitle: 'Interested but not urgent.' },
      { id: 'd', text: 'Not sure. Just exploring.', emoji: '❓', subtitle: 'Researching first.' },
    ]
  },
  {
    id: 6,
    question: "What's smart to invest if you're saving 5+ hours per week?",
    subheading: "That's roughly $250-500/month in team time back. What makes sense for you?",
    confirmation: () => "Got it. That's the guardrail. We build something that works in that range.",
    options: [
      { id: 'a', text: 'Under $500/month', emoji: '💰', subtitle: 'Start lean. Test it.' },
      { id: 'b', text: '$500-1,500/month', emoji: '💰💰', subtitle: 'Serious investment. Get it right.' },
      { id: 'c', text: '$1,500-5,000/month', emoji: '💰💰💰', subtitle: 'ROI is what matters.' },
      { id: 'd', text: '$5,000+/month', emoji: '💰💰💰💰', subtitle: 'This is a priority. Fix it.' },
    ]
  },
  {
    id: 7,
    question: "How do you primarily make money?",
    subheading: "This actually changes what AI matters for your business.",
    confirmation: (answer) => {
      const model = questions[6].options.find(o => o.id === answer);
      return model?.insight || "Makes sense. We'll tailor the approach to your model.";
    },
    options: [
      { id: 'a', text: 'Services or consulting', emoji: '🤝', subtitle: 'I\'m the product. My time = revenue.', insight: 'Makes sense. For services, the biggest wins usually come from client intake and follow-up automation.' },
      { id: 'b', text: 'SaaS or software', emoji: '🛠️', subtitle: 'We build a product.', insight: 'Makes sense. For SaaS, the biggest wins usually come from customer onboarding and support automation.' },
      { id: 'c', text: 'E-commerce or products', emoji: '🛒', subtitle: 'We sell stuff.', insight: 'Makes sense. For e-commerce, the biggest wins usually come from customer service and inventory management.' },
      { id: 'd', text: 'It\'s complicated', emoji: '🔀', subtitle: 'Mix of things.', insight: 'Makes sense. For hybrid models, the biggest wins usually come from standardizing cross-functional workflows.' },
    ]
  },
  {
    id: 8,
    question: "What's your biggest worry about AI automation? (Real talk.)",
    subheading: "We hear these all the time. Better you say it now.",
    multiSelect: true,
    confirmation: () => "All valid. We address these head-on in your roadmap. You won't be guessing.",
    options: [
      { id: 'a', text: 'We\'ll lose the human element. Customers will notice.', emoji: '👥' },
      { id: 'b', text: 'It\'s too technical. Our team won\'t actually use it.', emoji: '🔧' },
      { id: 'c', text: 'We\'re not sure it\'s worth the money.', emoji: '💵' },
      { id: 'd', text: 'Implementation will stall or take forever.', emoji: '⏳' },
      { id: 'e', text: 'Data security or privacy concerns.', emoji: '🔒' },
      { id: 'f', text: 'We don\'t know where to start or what to pick.', emoji: '🤔' },
    ]
  },
]

function App() {
  const [currentStep, setCurrentStep] = useState(0) // 0 = landing, 1-8 = questions, 9 = report
  const [answers, setAnswers] = useState({})

  const handleStartQuiz = () => {
    setCurrentStep(1)
  }

  const handleAnswer = (questionId, answerId) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }))

    if (currentStep < questions.length) {
      setCurrentStep(prev => prev + 1)
    } else {
      setCurrentStep(questions.length + 1) // Go to report
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

  const progress = currentStep === 0 ? 0 : currentStep > questions.length ? 100 : (currentStep / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-white">
      {currentStep > 0 && currentStep <= questions.length + 1 && (
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
          <Report
            questions={questions}
            answers={answers}
            onBack={handleBack}
          />
        )}
      </main>
    </div>
  )
}

export default App
