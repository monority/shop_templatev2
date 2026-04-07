import React from 'react';

const COVERAGE = [
    { outlet: 'Hypebeast', quote: 'Sneakara is redefining the European sneaker retail experience.', date: 'March 2025' },
    { outlet: 'Sneaker News', quote: 'A curated approach that every collector will appreciate.', date: 'January 2025' },
    { outlet: 'GQ France', quote: 'The go-to destination for premium kicks in Paris.', date: 'November 2024' },
    { outlet: 'Business of Fashion', quote: 'Sneakara shows how community-first retail wins.', date: 'September 2024' },
];

const Press = () => (
    <div className="min-h-screen bg-light">
        {/* Hero */}
        <div className="bg-dark text-white py-24 px-8 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight mb-4">Press & Media</h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
                What the world is saying about Sneakara.
            </p>
        </div>

        <div className="container max-w-4xl mx-auto px-6 py-20 space-y-16">
            {/* Press coverage */}
            <section>
                <h2 className="text-3xl font-bold text-dark mb-8">In the News</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {COVERAGE.map(({ outlet, quote, date }) => (
                        <div key={outlet} className="card p-6">
                            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide mb-3">{outlet}</p>
                            <blockquote className="text-dark font-medium text-lg leading-snug mb-3">
                                "{quote}"
                            </blockquote>
                            <p className="text-gray-400 text-sm">{date}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Press kit */}
            <section>
                <h2 className="text-3xl font-bold text-dark mb-4">Press Kit</h2>
                <p className="text-gray-600 mb-6">
                    Our press kit includes high-resolution logos, brand guidelines, product photography, and founder bios.
                </p>
                <a
                    href="mailto:press@sneakara.com?subject=Press Kit Request"
                    className="btn btn-primary"
                >
                    Request Press Kit
                </a>
            </section>

            {/* Contact */}
            <div className="card p-8">
                <h3 className="text-xl font-bold text-dark mb-2">Media Enquiries</h3>
                <p className="text-gray-500 mb-4">
                    For interviews, partnerships, or editorial features, reach out to our communications team.
                </p>
                <a href="mailto:press@sneakara.com" className="text-brand font-semibold hover:underline">
                    press@sneakara.com
                </a>
            </div>
        </div>
    </div>
);

export default Press;
