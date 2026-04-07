import React from 'react';
import { Link } from 'react-router-dom';

const About = () => (
  <div className="min-h-screen bg-light">
    {/* Hero */}
    <div className="bg-dark text-white py-24 px-8 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight mb-4">
        About SNEAK<span className="text-brand">ARA</span>
      </h1>
      <p className="text-gray-300 text-xl max-w-2xl mx-auto">
        Born in the streets, built for the future.
      </p>
    </div>

    <div className="container max-w-4xl mx-auto px-6 py-20 space-y-16">
      {/* Mission */}
      <section>
        <h2 className="text-3xl font-bold text-dark mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Sneakara was founded with a single vision: make premium sneaker culture accessible to everyone.
          We believe great footwear isn't a luxury — it's a statement. Every pair we carry is curated for
          quality, design, and cultural relevance.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-8 text-center">
        {[['2019', 'Founded'], ['50K+', 'Customers'], ['200+', 'Products']].map(([val, label]) => (
          <div key={label} className="card p-8">
            <div className="text-4xl font-extrabold text-brand mb-2">{val}</div>
            <div className="text-gray-500 font-medium">{label}</div>
          </div>
        ))}
      </section>

      {/* Story */}
      <section>
        <h2 className="text-3xl font-bold text-dark mb-4">Our Story</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-4">
          What started as a small pop-up in Paris has grown into a destination for sneaker enthusiasts
          across Europe. Our team of passionate collectors handpicks every model — from classic silhouettes
          to the latest drops.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          We partner directly with brands and trusted suppliers to guarantee authenticity on every single
          item. No fakes, no compromises.
        </p>
      </section>

      {/* Values */}
      <section>
        <h2 className="text-3xl font-bold text-dark mb-8">What We Stand For</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🎯', title: 'Authenticity', text: 'Every item is 100% verified and genuine.' },
            { icon: '🌍', title: 'Community', text: 'We celebrate sneaker culture in all its forms.' },
            { icon: '♻️', title: 'Responsibility', text: 'Committed to a more sustainable future.' },
          ].map(({ icon, title, text }) => (
            <div key={title} className="card p-6">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-bold text-dark text-lg mb-2">{title}</h3>
              <p className="text-gray-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center">
        <Link to="/shop" className="btn btn-primary">Explore Our Collection</Link>
      </div>
    </div>
  </div>
);

export default About;
