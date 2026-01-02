import React from 'react'

const Report = ({ questions, answers, onBack }) => {
  // Helper to get answer text
  const getAnswer = (questionId) => {
    const question = questions.find(q => q.id === questionId)
    const answer = answers[questionId]

    if (!question || !answer) return null

    if (question.multiSelect && Array.isArray(answer)) {
      return answer.map(id => question.options.find(opt => opt.id === id)).filter(Boolean)
    }

    return question.options.find(opt => opt.id === answer)
  }

  // Extract key answers
  const painPoint = getAnswer(1)
  const teamSize = getAnswer(2)
  const workflowProblem = getAnswer(3)
  const tools = getAnswer(4)
  const timeline = getAnswer(5)
  const budget = getAnswer(6)
  const businessModel = getAnswer(7)
  const concerns = getAnswer(8)

  // Generate current state description
  const getCurrentState = () => {
    const states = {
      'a': 'Client inquiries come in through email, calls, forms—everywhere. You or your team manually logs each one. Lots of back-and-forth to get basic info. Your inbox is the project management system.',
      'b': 'Invoices, scheduling, data entry—it all happens manually. Someone on your team is spending hours every week just keeping things organized.',
      'c': 'Updates are scattered across email, Slack, and random channels. Someone has to track down information and chase people for status updates.',
      'd': 'Creating content, writing proposals, documenting processes—it\'s all manual. Every piece takes significant time to produce.',
      'e': 'Data lives in multiple places. Someone has to pull it together, make sense of it, and figure out what actually matters.'
    }
    return states[painPoint?.id] || 'Your team is spending significant time on repetitive tasks that could be automated.'
  }

  // Generate future state description
  const getFutureState = () => {
    const futures = {
      'a': {
        description: 'AI chatbot handles initial info collection automatically. Captures client details in a structured format. Routes to the right person or schedules automatically. You focus on actual delivery, not data entry.',
        result: '4-6 hours per week freed up. Better client experience.'
      },
      'b': {
        description: 'Automated workflows handle scheduling, invoicing, and data entry. System handles the grunt work. Everything stays organized without manual effort.',
        result: '6-10 hours per week freed up. Fewer errors.'
      },
      'c': {
        description: 'Centralized system automatically aggregates updates. AI summarizes status across projects. Everyone knows what\'s happening without asking.',
        result: '5-8 hours per week freed up. Better visibility.'
      },
      'd': {
        description: 'AI assists with first drafts, documentation, and research. You edit and refine instead of starting from scratch. Templates and automation handle repetitive writing.',
        result: '8-12 hours per week freed up. Faster turnaround.'
      },
      'e': {
        description: 'Automated data collection and analysis. AI identifies patterns and anomalies. You get insights delivered, not raw data to dig through.',
        result: '6-10 hours per week freed up. Better decisions.'
      }
    }
    return futures[painPoint?.id] || {
      description: 'AI handles the repetitive parts of your workflow automatically. Your team focuses on high-value work that requires human judgment.',
      result: '5-10 hours per week freed up. Better focus.'
    }
  }

  // Generate recommendation
  const getRecommendation = () => {
    const recommendations = {
      'a': {
        tool: 'AI Client Intake System',
        description: 'Automatically captures, qualifies, and routes client inquiries',
        outcomes: [
          'Chatbot collects all necessary info before human involvement',
          'Auto-schedules meetings based on availability',
          'Routes qualified leads to the right team member'
        ]
      },
      'b': {
        tool: 'Workflow Automation Platform',
        description: 'Handles scheduling, invoicing, and administrative tasks',
        outcomes: [
          'Automatic invoice generation and follow-up',
          'Smart scheduling that syncs with your calendar',
          'Data entry handled via integrations'
        ]
      },
      'c': {
        tool: 'AI Project Intelligence System',
        description: 'Aggregates and summarizes project updates automatically',
        outcomes: [
          'Pulls updates from all your tools into one view',
          'AI-generated status summaries',
          'Automatic alerts for blockers or delays'
        ]
      },
      'd': {
        tool: 'AI Content Assistant',
        description: 'Accelerates writing, research, and documentation',
        outcomes: [
          'First draft generation for common documents',
          'Research synthesis and summarization',
          'Template-based automation for repetitive content'
        ]
      },
      'e': {
        tool: 'AI Analytics Dashboard',
        description: 'Automated data collection and insight generation',
        outcomes: [
          'Pulls data from all sources automatically',
          'AI identifies trends and anomalies',
          'Natural language insights, not just charts'
        ]
      }
    }
    return recommendations[painPoint?.id] || {
      tool: 'Custom AI Solution',
      description: 'Tailored automation for your specific workflow',
      outcomes: [
        'Handles repetitive tasks automatically',
        'Integrates with your existing tools',
        'Scales with your business'
      ]
    }
  }

  // Get budget range
  const getBudgetRange = () => {
    const budgetMap = {
      'a': '$300-500',
      'b': '$800-1,200',
      'c': '$2,500-4,000',
      'd': '$6,000-8,000'
    }
    return budgetMap[budget?.id] || '$500-2,000'
  }

  // Address concerns
  const addressConcern = (concernId) => {
    const responses = {
      'a': {
        title: 'The Human + AI Approach',
        text: 'AI handles the tedious data collection and routing. Your team focuses on the actual relationship and high-value conversations. Result: Better experience, not worse. Clients get faster responses AND more attention when it matters.'
      },
      'b': {
        title: 'No-Code, User-Friendly Tools',
        text: 'This is a no-code tool. If you can use Slack or Gmail, you can use this. We\'ll show you everything in 30 minutes. Your team will actually want to use it because it makes their lives easier.'
      },
      'c': {
        title: 'Clear ROI Tracking',
        text: 'Your report above shows exactly what changes. Specific hours. Specific tool. We measure success by time saved and tasks automated. You\'ll know within the first month if it\'s working.'
      },
      'd': {
        title: 'Rapid Implementation',
        text: 'Week 1: Setup and integration. Week 2: Team training. Week 3: You\'re running. We don\'t drag this out. You see results fast or we adjust the approach.'
      },
      'e': {
        title: 'Enterprise-Grade Security',
        text: 'All tools are SOC 2 compliant with end-to-end encryption. Your data stays yours. We can work within your existing security requirements and get IT sign-off before we start.'
      },
      'f': {
        title: 'We Show You What to Pick',
        text: 'That\'s literally what this report does. One clear recommendation. Not a menu of options. We tell you what to do first, why it matters, and what success looks like.'
      }
    }
    return responses[concernId]
  }

  const futureState = getFutureState()
  const recommendation = getRecommendation()

  return (
    <div className="max-w-4xl mx-auto animate-slide-up">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">📊</div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Your AI Automation Roadmap
        </h1>
        <p className="text-lg text-gray-600">
          Here's what we learned and what we recommend
        </p>
      </div>

      {/* Section 1: What We Heard */}
      <section className="bg-white rounded-2xl p-8 shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Here's What We Heard</h2>
        <div className="text-lg text-gray-700 leading-relaxed space-y-3">
          <p>
            You're a <strong>{businessModel?.text.toLowerCase()}</strong> business.
          </p>
          <p>
            Your problem: <strong>{painPoint?.text.toLowerCase()}</strong>
          </p>
          <p>
            Right now: <strong>{teamSize?.text}</strong> {teamSize?.id === 'a' ? 'is' : 'are'} spending time on repetitive work.
            That's roughly <strong>{teamSize?.peopleCount} hours per week</strong> you could get back.
          </p>
        </div>
      </section>

      {/* Section 2: Current State */}
      <section className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 shadow-lg mb-8 border-2 border-red-200">
        <div className="flex items-start mb-4">
          <div className="text-3xl mr-3">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900">Here's What's Happening Now (Without AI)</h2>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">
          {getCurrentState()}
        </p>
      </section>

      {/* Section 3: Future State */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg mb-8 border-2 border-green-200">
        <div className="flex items-start mb-4">
          <div className="text-3xl mr-3">✨</div>
          <h2 className="text-2xl font-bold text-gray-900">Here's What Could Happen (With AI)</h2>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          {futureState.description}
        </p>
        <div className="bg-white/60 rounded-lg p-4 border-2 border-green-300">
          <p className="font-semibold text-green-900">
            Result: {futureState.result}
          </p>
        </div>
      </section>

      {/* Section 4: Recommendation */}
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 shadow-lg mb-8 border-2 border-orange-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Here's What We'd Recommend</h2>
        <p className="text-gray-600 mb-4">Based on what you told us, you probably need:</p>

        <h3 className="text-xl font-bold text-orange-900 mb-3">{recommendation.tool}</h3>
        <p className="text-lg text-gray-700 mb-4">{recommendation.description}</p>

        <div className="bg-white rounded-lg p-6 mb-4">
          <p className="font-semibold text-gray-900 mb-3">What it actually does:</p>
          <ul className="space-y-2">
            {recommendation.outcomes.map((outcome, index) => (
              <li key={index} className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span className="text-gray-700">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-orange-100 rounded-lg p-4">
          <p className="font-semibold text-orange-900">
            Cost: ~{getBudgetRange()}/month (fits your budget)
          </p>
        </div>
      </section>

      {/* Section 5: Address Concerns */}
      {concerns && Array.isArray(concerns) && concerns.length > 0 && (
        <section className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Addressing Your Concerns</h2>
          <div className="space-y-6">
            {concerns.map((concern, index) => {
              const response = addressConcern(concern.id)
              if (!response) return null

              return (
                <div key={index} className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{response.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{response.text}</p>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Section 6: Call to Action */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 md:p-10 text-white shadow-xl mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">What's Next</h2>
        <p className="text-lg mb-6 text-orange-100">
          You've got the full picture now. Let's make it real.
        </p>

        <div className="bg-white/10 rounded-lg p-6 mb-6">
          <p className="font-semibold mb-3">On the call we'll:</p>
          <ul className="space-y-2 text-orange-50">
            <li>• Walk through your exact workflow</li>
            <li>• Confirm this is the right tool</li>
            <li>• Show you what week 1 looks like</li>
          </ul>
        </div>

        <button
          onClick={() => window.open('https://calendly.com', '_blank')}
          className="w-full bg-white text-orange-600 text-xl py-5 px-8 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
        >
          Book a 20-Minute Call →
        </button>
      </section>

      {/* Back Button */}
      <div className="text-center">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg px-4 py-2"
        >
          ← Go Back to Questions
        </button>
      </div>
    </div>
  )
}

export default Report
