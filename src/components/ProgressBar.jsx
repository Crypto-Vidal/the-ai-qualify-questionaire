import React from 'react'

const ProgressBar = ({ progress, currentStep, totalSteps }) => {
  const showCelebration = progress === 50 || progress === 100

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4">
        {/* Progress Stats */}
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm font-semibold text-gray-700">
            {progress === 100 ? 'Complete!' : `Question ${currentStep} of ${totalSteps}`}
          </div>
          {currentStep <= totalSteps && (
            <div className="text-sm text-gray-600">
              ~3 minutes
            </div>
          )}
        </div>

        {/* Progress Bar Container */}
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          {/* Animated Progress Fill */}
          <div
            className="absolute inset-y-0 left-0 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            role="progressbar"
            aria-label={`Quiz progress: ${Math.round(progress)}% complete`}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500">
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>

          {/* Glow Effect */}
          {progress > 0 && (
            <div
              className="absolute inset-y-0 left-0 blur-sm opacity-50 transition-all duration-500"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500" />
            </div>
          )}
        </div>

        {/* Celebration Message */}
        {showCelebration && (
          <div className="mt-3 text-center animate-slide-up">
            <p className="text-sm font-semibold text-orange-600">
              {progress === 50 && '🎉 Halfway there! Keep going!'}
              {progress === 100 && '✨ Amazing! You\'re all done!'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProgressBar
