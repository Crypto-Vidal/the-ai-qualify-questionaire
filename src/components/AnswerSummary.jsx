import React from 'react'

const AnswerSummary = ({ questions, answers, onEdit, onProceed, onBack }) => {
  const getAnswerText = (question, answerId) => {
    const option = question.options.find(opt => opt.id === answerId)
    return option ? { text: option.text, emoji: option.emoji } : { text: 'Not answered', emoji: '❓' }
  }

  return (
    <div className="max-w-3xl mx-auto animate-slide-up">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 md:mb-8 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-2 -ml-3"
        aria-label="Go back to last question"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="font-medium">Back</span>
      </button>

      {/* Header */}
      <div className="text-center mb-10 md:mb-12">
        <div className="text-5xl mb-4">✨</div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
          Review Your Answers
        </h2>
        <p className="text-gray-600 text-base md:text-lg">
          Make sure everything looks good before we create your personalized strategy
        </p>
      </div>

      {/* Answers Summary */}
      <div className="space-y-4 mb-10">
        {questions.map((question, index) => {
          const answer = getAnswerText(question, answers[question.id])

          return (
            <div
              key={question.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="text-xs font-semibold text-blue-600 mb-2">
                    Question {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {question.question}
                  </h3>
                  <div className="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-3">
                    <span className="text-2xl">{answer.emoji}</span>
                    <span className="text-base font-medium text-gray-900">
                      {answer.text}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onEdit(question.id)}
                  className="flex-shrink-0 text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                  aria-label={`Edit answer for question ${index + 1}`}
                >
                  Edit
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recommendation Preview */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl mb-8">
        <div className="text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl md:text-2xl font-bold mb-3">
            Your Personalized Strategy Awaits
          </h3>
          <p className="text-blue-100 text-base md:text-lg">
            Based on your answers, we've identified key opportunities to transform your business with AI automation.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-white border-2 border-gray-300 text-gray-700 text-lg py-4 px-8 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
          aria-label="Go back to edit answers"
        >
          Make Changes
        </button>
        <button
          onClick={onProceed}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg py-4 px-8 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          aria-label="Proceed to get your personalized strategy"
        >
          Get My Strategy →
        </button>
      </div>
    </div>
  )
}

export default AnswerSummary
