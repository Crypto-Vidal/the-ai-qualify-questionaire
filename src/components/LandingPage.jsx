import React from 'react'

const LandingPage = ({ onStart }) => {
  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-16 md:mb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Discover How{' '}
          <span className="gradient-text">
            AI Can Transform Your Business
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Take our 2-minute quiz to get a personalized AI automation strategy tailored to your business needs
        </p>
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl py-5 px-12 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse-subtle focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          aria-label="Start the AI business quiz"
        >
          Start Free Assessment
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
          <div className="text-4xl md:text-5xl font-bold gradient-text mb-3">40%</div>
          <p className="text-gray-600 text-base md:text-lg">Average Cost Reduction</p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-3">3x</div>
          <p className="text-gray-600 text-base md:text-lg">Faster Response Times</p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center md:col-span-2 lg:col-span-1">
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-3">24/7</div>
          <p className="text-gray-600 text-base md:text-lg">Automated Operations</p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Personalized Strategy</h3>
          <p className="text-gray-600 leading-relaxed">
            Get AI recommendations based on your specific business challenges and goals
          </p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Fast Implementation</h3>
          <p className="text-gray-600 leading-relaxed">
            Start seeing results in weeks, not months, with our proven frameworks
          </p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="text-4xl mb-4">💼</div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Expert Guidance</h3>
          <p className="text-gray-600 leading-relaxed">
            Work with AI specialists who understand your industry and challenges
          </p>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
        <div className="flex justify-center mb-4">
          <div className="flex -space-x-2">
            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xl">👤</div>
            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xl">👤</div>
            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xl">👤</div>
            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xl">👤</div>
          </div>
        </div>
        <p className="text-lg md:text-xl font-semibold mb-2">Join 500+ businesses already using AI</p>
        <p className="text-blue-100 text-base md:text-lg">
          "This assessment helped us identify $50k in annual savings within the first month"
        </p>
        <p className="text-sm text-blue-200 mt-2">— Sarah Chen, CEO at TechFlow Solutions</p>
      </div>

      {/* Trust Indicators */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm mb-4">Trusted by industry leaders</p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div className="text-2xl font-bold text-gray-400">ACME Corp</div>
          <div className="text-2xl font-bold text-gray-400">TechStart</div>
          <div className="text-2xl font-bold text-gray-400">InnovateCo</div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
