import React from 'react'

const QuizQuestion = ({ question, selectedAnswer, onAnswer, onBack, currentStep, totalSteps }) => {
  const handleOptionClick = (optionId) => {
    onAnswer(question.id, optionId)
  }

  const getCardVariantClasses = (variant) => {
    switch (variant) {
      case 'warning':
        return 'border-warning-200 hover:border-warning-500 hover:bg-warning-50'
      case 'secondary':
        return 'border-secondary-200 hover:border-secondary-500 hover:bg-secondary-50'
      default:
        return 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
    }
  }

  return (
    <div className="max-w-4xl mx-auto animate-slide-up">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 md:mb-8 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-2 -ml-3"
        aria-label="Go back to previous question"
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

      {/* Question Header */}
      <div className="text-center mb-10 md:mb-12">
        <div className="text-sm font-semibold text-blue-600 mb-3">
          Question {currentStep} of {totalSteps}
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
          {question.question}
        </h2>
        <p className="text-gray-600 text-base md:text-lg">
          Select the option that best describes your situation
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.id
          const variantClasses = getCardVariantClasses(option.variant)

          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={`
                relative bg-white rounded-xl p-6 border-2
                transition-all duration-300 text-left
                hover:shadow-2xl hover:-translate-y-1
                focus:outline-none focus:ring-4 focus:ring-blue-500/50
                ${variantClasses}
                ${isSelected ? 'border-blue-600 bg-blue-50 shadow-lg' : ''}
              `}
              aria-label={`Select option: ${option.text}`}
              aria-pressed={isSelected}
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />

              {/* Content */}
              <div className="relative flex items-start justify-between">
                <div className="flex items-start flex-1">
                  {/* Emoji */}
                  {option.emoji && (
                    <div className="text-3xl md:text-4xl mr-4 flex-shrink-0">
                      {option.emoji}
                    </div>
                  )}

                  {/* Text */}
                  <div className="flex-1">
                    <div className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                      {option.text}
                    </div>
                  </div>
                </div>

                {/* Checkmark */}
                {isSelected && (
                  <div className="ml-4 flex-shrink-0">
                    <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center animate-scale">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute inset-0 border-2 border-blue-600 rounded-xl pointer-events-none" />
              )}
            </button>
          )
        })}
      </div>

      {/* Help Text */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          You can always go back and change your answers
        </p>
      </div>
    </div>
  )
}

export default QuizQuestion
