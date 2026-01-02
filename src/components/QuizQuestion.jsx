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
      // Immediately move to next question
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
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 min-h-[500px] border-2 border-orange-100">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-orange-600 mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg px-3 py-2 -ml-3"
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
        <div className="text-center mb-10">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option) => {
            const selected = isSelected(option.id)

            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={`
                  relative bg-white rounded-2xl p-6 border-2
                  transition-all duration-300 text-left
                  hover:shadow-xl hover:-translate-y-1
                  focus:outline-none focus:ring-4 focus:ring-orange-500/30
                  ${selected ? 'border-orange-500 bg-orange-50 shadow-lg ring-4 ring-orange-500/20' : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'}
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
                      <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center">
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
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {question.multiSelect ? 'Select all that apply, then click Next' : 'Choose your answer to continue'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default QuizQuestion
