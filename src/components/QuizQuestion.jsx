import React, { useState, useEffect, useRef } from 'react'

const QuizQuestion = ({ question, selectedAnswer, onAnswer, onBack, currentStep, totalSteps, nextButtonText }) => {
  const [localSelection, setLocalSelection] = useState(selectedAnswer || (question.multiSelect ? [] : null))
  const [showNext, setShowNext] = useState(false)
  const cardLineRef = useRef(null)
  const containerRef = useRef(null)
  const animationFrameRef = useRef(null)
  const positionRef = useRef(0)
  const velocityRef = useRef(180) // Faster speed
  const isDraggingRef = useRef(false)
  const lastMouseXRef = useRef(0)

  useEffect(() => {
    setLocalSelection(selectedAnswer || (question.multiSelect ? [] : null))
    setShowNext(false)
    positionRef.current = typeof window !== 'undefined' ? window.innerWidth : 0
  }, [question.id, selectedAnswer, question.multiSelect])

  useEffect(() => {
    // Animation loop
    const animate = () => {
      if (!isDraggingRef.current && cardLineRef.current) {
        const containerWidth = containerRef.current?.offsetWidth || window.innerWidth
        const cardLineWidth = (460) * question.options.length // card width + gap

        positionRef.current -= velocityRef.current * 0.016 // Faster

        if (positionRef.current < -cardLineWidth) {
          positionRef.current = containerWidth
        } else if (positionRef.current > containerWidth) {
          positionRef.current = -cardLineWidth
        }

        cardLineRef.current.style.transform = `translateX(${positionRef.current}px)`
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [question.options.length])

  const handleOptionClick = (optionId) => {
    if (question.multiSelect) {
      const currentSelections = Array.isArray(localSelection) ? localSelection : []
      const newSelections = currentSelections.includes(optionId)
        ? currentSelections.filter(id => id !== optionId)
        : [...currentSelections, optionId]

      setLocalSelection(newSelections)
      setShowNext(newSelections.length > 0)
    } else {
      // Immediately move to next question - no flip, no confirmation
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

  const handleMouseDown = (e) => {
    isDraggingRef.current = true
    lastMouseXRef.current = e.clientX
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return
    const deltaX = e.clientX - lastMouseXRef.current
    positionRef.current += deltaX
    lastMouseXRef.current = e.clientX
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div className="max-w-full mx-auto">
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

      {/* Scanning Card Stream */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{
          height: '350px',
          perspective: '1000px',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.02) 50%, transparent 100%)'
        }}
      >
        {/* Particle Canvas Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.05) 0%, transparent 70%)'
          }}
        />

        {/* Scanner Line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 pointer-events-none z-20"
          style={{
            width: '4px',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(to bottom, transparent, rgba(249, 115, 22, 0.8), rgba(249, 115, 22, 1), rgba(249, 115, 22, 0.8), transparent)',
            boxShadow: '0 0 20px rgba(249, 115, 22, 0.8), 0 0 40px rgba(249, 115, 22, 0.4)',
            animation: 'scanPulse 2s ease-in-out infinite alternate'
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '40px',
              height: '40px',
              background: 'radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, transparent 70%)',
              filter: 'blur(8px)'
            }}
          />
        </div>

        {/* Card Stream */}
        <div
          ref={cardLineRef}
          className="absolute top-1/2 -translate-y-1/2 flex items-center cursor-grab active:cursor-grabbing select-none"
          style={{ gap: '60px', willChange: 'transform' }}
          onMouseDown={handleMouseDown}
        >
          {question.options.map((option) => {
            const selected = isSelected(option.id)

            return (
              <div
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className="relative flex-shrink-0 group"
                style={{ width: '400px', height: '280px' }}
              >
                {/* Card */}
                <div
                  className={`
                    relative w-full h-full rounded-2xl p-8
                    transition-all duration-300
                    ${selected
                      ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-2xl ring-4 ring-orange-300'
                      : 'bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2'
                    }
                    border-2 ${selected ? 'border-orange-400' : 'border-gray-100'}
                  `}
                >
                  {/* Emoji */}
                  {option.emoji && (
                    <div className="text-6xl mb-4 text-center">
                      {option.emoji}
                    </div>
                  )}

                  {/* Text */}
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-3 ${selected ? 'text-white' : 'text-gray-900'}`}>
                      {option.text}
                    </div>
                    {option.subtitle && (
                      <div className={`text-base leading-relaxed ${selected ? 'text-orange-100' : 'text-gray-600'}`}>
                        {option.subtitle}
                      </div>
                    )}
                  </div>

                  {/* Checkmark */}
                  {selected && (
                    <div className="absolute top-6 right-6">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center animate-scale-in">
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

                  {/* Scan Effect Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, transparent 45%, rgba(249, 115, 22, 0.1) 50%, transparent 55%, transparent 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'scanPass 3s ease-in-out infinite'
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Next Button for Multi-Select */}
      {question.multiSelect && showNext && (
        <div className="mt-8 text-center animate-slide-up">
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
          {question.multiSelect ? 'Select all that apply, then click Next' : 'Click a card to continue • Drag to explore'}
        </p>
      </div>

      <style jsx>{`
        @keyframes scanPulse {
          0% {
            opacity: 0.6;
            transform: translateX(-50%) scaleY(1);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) scaleY(1.05);
          }
        }

        @keyframes scanPass {
          0%, 100% {
            background-position: 200% 0;
          }
          50% {
            background-position: -100% 0;
          }
        }

        @keyframes scale-in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}

export default QuizQuestion
