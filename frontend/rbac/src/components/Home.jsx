import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUserShield, 
  FaCog, 
  FaLock, 
  FaChartLine, 
  FaShieldAlt,
  FaArrowRight
} from 'react-icons/fa';

const SectionSeparator = ({ title }) => (
  <div className="relative my-16 py-4">
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-dark-primary/50"></div>
    </div>
    {title && (
      <div className="relative flex justify-center">
        <span className="bg-dark-primary px-4 text-light-blue text-sm uppercase tracking-wider">
          {title}
        </span>
      </div>
    )}
  </div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-primary text-white relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-light-blue/10 via-dark-primary/20 to-dark-primary/30 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="inline-block bg-dark-primary/50 rounded-full px-6 py-2 mb-6 text-light-blue">
            Next-Gen Access Control
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-light-blue leading-tight">
            RBAC Security Dashboard
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 mb-10 leading-relaxed">
            Comprehensive Role-Based Access Control Designed for Modern Enterprise Security
          </p>
          <div className="flex justify-center space-x-6">
            <Link 
              to="/signup" 
              className="flex items-center gap-3 px-10 py-4 text-xl bg-light-blue text-dark-primary rounded-xl font-semibold hover:bg-opacity-90 transition-all group"
            >
              Get Started
              <FaArrowRight className="transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        <SectionSeparator title="Core Features" />

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: FaUserShield,
              title: 'User Management',
              description: 'Advanced user lifecycle and granular access control.',
              color: 'text-light-blue',
              bgGradient: 'from-light-blue/10 to-dark-primary'
            },
            {
              icon: FaCog,
              title: 'Role Configuration',
              description: 'Flexible, dynamic role-based permission frameworks.',
              color: 'text-slate-gray',
              bgGradient: 'from-slate-gray/10 to-dark-primary'
            },
            {
              icon: FaLock,
              title: 'Permissions',
              description: 'Real-time policy enforcement with comprehensive controls.',
              color: 'text-deep-blue',
              bgGradient: 'from-deep-blue/10 to-dark-primary'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`
                bg-gradient-to-br ${feature.bgGradient} 
                rounded-xl p-8 text-center 
                transform transition-all 
                hover:scale-105 hover:shadow-2xl 
                border border-dark-primary/30
              `}
            >
              <feature.icon className={`mx-auto text-6xl mb-6 ${feature.color}`} />
              <h2 className="text-2xl font-bold mb-4 text-light-blue">{feature.title}</h2>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </section>

        <SectionSeparator title="Advanced Capabilities" />

        {/* Additional Features */}
        <section className="grid md:grid-cols-2 gap-8 mb-20">
          {[
            {
              icon: FaChartLine,
              title: 'Advanced Analytics',
              description: 'Comprehensive security insights and detailed access reports.',
              color: 'text-light-blue'
            },
            {
              icon: FaShieldAlt,
              title: 'Comprehensive Security',
              description: 'Multi-layered protection with continuous threat monitoring.',
              color: 'text-deep-blue'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="
                bg-dark-primary 
                rounded-xl p-8 
                flex items-center space-x-6 
                hover:shadow-2xl 
                transition-all 
                border border-dark-primary/30
              "
            >
              <feature.icon className={`text-6xl ${feature.color}`} />
              <div>
                <h3 className="text-xl font-bold text-light-blue mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </section>

        <SectionSeparator title="Secure Your Future" />

        {/* Call to Action */}
        <section className="text-center bg-dark-primary rounded-xl p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-light-blue/10 to-dark-primary/30 opacity-20"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6 text-light-blue">
              Elevate Your Security Strategy
            </h2>
            <p className="max-w-2xl mx-auto text-gray-300 mb-10 text-lg">
              Transform your digital infrastructure with intelligent, adaptive security solutions that provide comprehensive protection and optimization.
            </p>
            <Link 
              to="/contact"
              className="
                inline-flex items-center gap-3 
                px-12 py-5 text-xl 
                bg-light-blue text-dark-primary 
                rounded-xl font-bold 
                hover:bg-opacity-90 
                transition-all 
                group
              "
            >
              Contact Experts
              <FaArrowRight className="transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;