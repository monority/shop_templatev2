import { Link } from 'react-router-dom';
import PageMeta from '../components/ui/PageMeta';

const Sustainability = () => (
    <div className="min-h-screen bg-light">
      <PageMeta
        title="Sustainability"
        description="Style shouldn't cost the planet. Our commitment to eco packaging, sustainable brands, and circular fashion."
      />
        {/* Hero */}
        <div className="bg-dark text-white py-24 px-8 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight mb-4">Sustainability</h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
                Style shouldn't cost the planet.
            </p>
        </div>

        <div className="container max-w-4xl mx-auto px-6 py-20 space-y-16">
            {/* Commitment */}
            <section>
                <h2 className="text-3xl font-bold text-dark mb-4">Our Commitment</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                    At Sneakara, we believe the sneaker industry has a responsibility to do better. From the way we
                    package products to the partners we choose, every decision is guided by our goal to reduce our
                    environmental footprint.
                </p>
            </section>

            {/* Pillars */}
            <section>
                <h2 className="text-3xl font-bold text-dark mb-8">Our Pillars</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: '📦',
                            title: 'Eco Packaging',
                            text: '100% recycled, recyclable, or compostable packaging. No plastic bags — ever.',
                        },
                        {
                            icon: '🌱',
                            title: 'Sustainable Brands',
                            text: 'We actively source and promote brands committed to sustainable materials and fair labor.',
                        },
                        {
                            icon: '🔄',
                            title: 'Resale & Circular',
                            text: 'We encourage resale culture — a second-hand sneaker is the most sustainable one.',
                        },
                    ].map(({ icon, title, text }) => (
                        <div key={title} className="card p-6">
                            <div className="text-4xl mb-4">{icon}</div>
                            <h3 className="font-bold text-dark text-lg mb-2">{title}</h3>
                            <p className="text-gray-500">{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Progress */}
            <section>
                <h2 className="text-3xl font-bold text-dark mb-8">Progress So Far</h2>
                <div className="space-y-4">
                    {[
                        ['Packaging', 'Transitioned to 100% recycled boxes and tissue paper', 100],
                        ['Carbon Offsetting', 'Offset all standard shipping emissions', 100],
                        ['Sustainable Brands', 'Growing our eco-certified brand portfolio', 60],
                        ['Plastic-Free Operations', 'Eliminating all single-use plastic', 80],
                    ].map(([label, description, pct]) => (
                        <div key={label} className="card p-5">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-dark">{label}</span>
                                <span className="text-sm text-brand font-bold">{pct}%</span>
                            </div>
                            <p className="text-sm text-gray-500 mb-3">{description}</p>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                    className="bg-brand h-2 rounded-full transition-all"
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="text-center">
                <Link to="/shop" className="btn btn-primary">Shop Responsibly</Link>
            </div>
        </div>
    </div>
);

export default Sustainability;
