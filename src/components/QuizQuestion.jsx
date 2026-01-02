import React, { useState, useEffect } from 'react'

const QuizQuestion = ({ question, selectedAnswer, onAnswer, onBack, currentStep, totalSteps, nextButtonText }) => {
  const [localSelection, setLocalSelection] = useState(selectedAnswer || (question.multiSelect ? [] : null))
  const [showNext, setShowNext] = useState(false)

  useEffect(() => {
    setLocalSelection(selectedAnswer || (question.multiSelect ? [] : null))
    setShowNext(false)
  }, [question.id, selectedAnswer, question.multiSelect])

  const handleOptionClick = (optionId) => {
    if (question.multiSelect) {
      const currentSelections = Array.isArray(localSelection) ? localSelection : []
      const newSelections = currentSelections.includes(optionId)
        ? currentSelections.filter(id => id !== optionId)
        : [...currentSelections, optionId]

      setLocalSelection(newSelections)
      setShowNext(newSelections.length > 0)
    } else {
      onAnswer(question.id, optionId)
    }
  }

  const handleNext = () => {
    if (question.multiSelect && localSelection.length > 0) {
      onAnswer(question.id, localSelection)
    }
  }

  const isSelected = (optionId) => {
    if (question.multiSelect) {
      return Array.isArray(localSelection) && localSelection.includes(optionId)
    }
    return localSelection === optionId
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Question Header */}
      <div className="text-center mb-8 px-4">
        <button
          onClick={onBack}
          className="inline-flex items-center text-gray-600 hover:text-orange-600 mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg px-3 py-2"
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

        <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          Question {currentStep} of {totalSteps}
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
          {question.question}
        </h2>
        <p className="text-gray-600 text-base md:text-lg">
          {question.subheading}
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4 mb-8">
        {question.options.map((option) => {
          const selected = isSelected(option.id)

          return (
            <div
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={`
                relative rounded-2xl p-8 cursor-pointer
                transition-all duration-200
                ${selected
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-2xl ring-4 ring-orange-300 border-2 border-orange-400'
                  : 'bg-white shadow-lg hover:shadow-xl border-2 border-gray-100'
                }
              `}
            >
              {/* Emoji */}
              {option.emoji && (
                <div className="text-5xl mb-4 text-center">
                  {option.emoji}
                </div>
              )}

              {/* Text */}
              <div className="text-center">
                <div className={`text-xl font-bold mb-2 ${selected ? 'text-white' : 'text-gray-900'}`}>
                  {option.text}
                </div>
                {option.subtitle && (
                  <div className={`text-sm leading-relaxed ${selected ? 'text-orange-100' : 'text-gray-600'}`}>
                    {option.subtitle}
                  </div>
                )}
              </div>

              {/* Checkmark */}
              {selected && (
                <div className="absolute top-6 right-6">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-orange-600"
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
          )
        })}
      </div>

      {/* Next Button for Multi-Select */}
      {question.multiSelect && showNext && (
        <div className="mt-8 text-center">
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg py-4 px-12 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/50"
          >
            {nextButtonText || 'Next →'}
          </button>
        </div>
      )}

      {/* Help Text */}
      <div className="mt-6 text-center px-4">
        <p className="text-sm text-gray-500">
          {question.multiSelect ? 'Select all that apply, then click Next' : 'Click a card to continue'}
        </p>
      </div>
    </div>
  )
}

export default QuizQuestion
