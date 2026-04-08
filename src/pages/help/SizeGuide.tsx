import { useState } from 'react';
import PageMeta from '../../components/ui/PageMeta';

const SIZES = {
  US: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13'],
  EU: ['38', '39', '40', '40.5', '41', '42', '42.5', '43', '44', '44.5', '45', '45.5', '46', '47', '47.5'],
  UK: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
  CM: ['24', '24.5', '25', '25.5', '26', '26.5', '27', '27', '28', '28.5', '29', '29.5', '30', '30.5', '31'],
};

const SizeGuide = () => {
  const [gender, setGender] = useState('men');

  return (
    <div className="min-h-screen bg-light">
      <PageMeta
        title="Size Guide"
        description="Find your perfect sneaker fit with our full size conversion chart for US, EU, UK, and CM."
      />
      <div className="bg-dark text-white py-24 px-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">Size Guide</h1>
        <p className="text-gray-300 text-xl max-w-2xl mx-auto">Find your perfect fit every time.</p>
      </div>

      <div className="container max-w-4xl mx-auto px-6 py-20 space-y-12">
        {/* How to measure */}
        <section aria-labelledby="how-to-measure">
          <h2 id="how-to-measure" className="text-3xl font-bold text-dark mb-6">How to Measure Your Foot</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Trace your foot',  text: 'Place your foot on paper and trace around it with a pencil held vertically.' },
              { step: '2', title: 'Measure length',   text: 'Measure from the heel to the longest toe in centimetres.' },
              { step: '3', title: 'Use the table',    text: 'Match your measurement to the size chart below. When between sizes, go up.' },
            ].map(({ step, title, text }) => (
              <div key={step} className="card p-6">
                <div className="w-10 h-10 bg-brand text-white rounded-full flex items-center justify-center font-extrabold text-lg mb-4" aria-hidden="true">{step}</div>
                <h3 className="font-bold text-dark mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Size table */}
        <section aria-labelledby="size-table">
          <h2 id="size-table" className="sr-only">Size conversion table</h2>
          <div className="flex gap-3 mb-6" role="group" aria-label="Select gender">
            {['men', 'women'].map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                aria-pressed={gender === g}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-colors ${gender === g ? 'bg-dark text-white' : 'bg-white text-dark border border-gray-200 hover:border-gray-300'}`}
              >
                {g === 'men' ? 'Men' : 'Women'}
              </button>
            ))}
          </div>

          <div className="card overflow-hidden">
            <table className="w-full text-sm" aria-label={`${gender} size conversion chart`}>
              <thead>
                <tr className="bg-dark text-white">
                  {Object.keys(SIZES).map((k) => (
                    <th key={k} className="py-3 px-4 font-semibold text-center" scope="col">{k}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZES.US.map((_, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    {Object.values(SIZES).map((col, j) => (
                      <td key={j} className="py-3 px-4 text-center text-dark">{col[i]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            * Women's sizes are typically 1.5 sizes smaller than men's US sizing.
          </p>
        </section>

        <div className="card p-6 bg-brand/5 border border-brand/20">
          <h3 className="font-bold text-dark mb-1">Still unsure?</h3>
          <p className="text-gray-600 text-sm">
            Contact our team at{' '}
            <a href="mailto:support@sneakara.com" className="text-brand hover:underline">support@sneakara.com</a>
            {' '}and we'll help you find the right size.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
