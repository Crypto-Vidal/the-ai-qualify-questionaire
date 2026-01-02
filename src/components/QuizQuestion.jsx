import React, { useState, useEffect } from 'react'

const QuizQuestion = ({ question, selectedAnswer, onAnswer, onBack, currentStep, totalSteps }) => {
  const [localSelection, setLocalSelection] = useState(selectedAnswer || (question.multiSelect ? [] : null))
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationText, setConfirmationText] = useState('')
  const [showNext, setShowNext] = useState(false)

  useEffect(() => {
    setLocalSelection(selectedAnswer || (question.multiSelect ? [] : null))
    setShowConfirmation(false)
    setShowNext(false)
  }, [question.id, selectedAnswer, question.multiSelect])

  const handleOptionClick = (optionId) => {
    if (question.multiSelect) {
      // Multi-select logic
      const currentSelections = Array.isArray(localSelection) ? localSelection : []
      const newSelections = currentSelections.includes(optionId)
        ? currentSelections.filter(id => id !== optionId)
        : [...currentSelections, optionId]

      setLocalSelection(newSelections)
      setShowNext(newSelections.length > 0)
    } else {
      // Single select logic
      setLocalSelection(optionId)

      // Show confirmation
      const text = typeof question.confirmation === 'function'
        ? question.confirmation(optionId)
        : question.confirmation || 'Good call.'

      setConfirmationText(text)
      setShowConfirmation(true)

      // Auto-advance after showing confirmation
      setTimeout(() => {
        onAnswer(question.id, optionId)
      }, 1200)
    }
  }

  const handleNext = () => {
    if (question.multiSelect && localSelection.length > 0) {
      const text = typeof question.confirmation === 'function'
        ? question.confirmation(localSelection)
        : question.confirmation || 'Got it.'

      setConfirmationText(text)
      setShowConfirmation(true)

      setTimeout(() => {
        onAnswer(question.id, localSelection)
      }, 1200)
    }
  }

  const isSelected = (optionId) => {
    if (question.multiSelect) {
      return Array.isArray(localSelection) && localSelection.includes(optionId)
    }
    return localSelection === optionId
  }

  return (
    <div className="max-w-4xl mx-auto animate-slide-up">
      {/* Back Button */}
      {!showConfirmation && (
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
      )}

      {/* Question Header */}
      {!showConfirmation && (
        <div className="text-center mb-10 md:mb-12">
          <div className="text-sm font-semibold text-blue-600 mb-3">
            Question {currentStep} of {totalSteps}
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {question.question}
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            {question.subheading}
          </p>
        </div>
      )}

      {/* Confirmation Message */}
      {showConfirmation && (
        <div className="text-center py-20 animate-slide-up">
          <div className="text-6xl mb-6">✓</div>
          <p className="text-2xl md:text-3xl font-semibold text-gray-900 max-w-2xl mx-auto leading-relaxed">
            {confirmationText}
          </p>
        </div>
      )}

      {/* Options Grid */}
      {!showConfirmation && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {question.options.map((option) => {
              const selected = isSelected(option.id)

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  className={`
                    relative bg-white rounded-xl p-6 border-2
                    transition-all duration-300 text-left
                    hover:shadow-2xl hover:-translate-y-1
                    focus:outline-none focus:ring-4 focus:ring-blue-500/50
                    ${selected ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'}
                  `}
                  aria-label={`Select option: ${option.text}`}
                  aria-pressed={selected}
                >
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
                        <div className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                          {option.text}
                        </div>
                        {option.subtitle && (
                          <div className="text-sm md:text-base text-gray-600 leading-relaxed">
                            {option.subtitle}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Checkmark */}
                    {selected && (
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
                </button>
              )
            })}
          </div>

          {/* Next Button for Multi-Select */}
          {question.multiSelect && showNext && (
            <div className="mt-8 text-center animate-slide-up">
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg py-4 px-12 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
              >
                Next →
              </button>
            </div>
          )}

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              {question.multiSelect ? 'Select all that apply, then click Next' : 'You can always go back and change your answers'}
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default QuizQuestion
