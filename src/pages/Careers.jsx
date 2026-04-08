import { useState, useCallback } from 'react';
import PageMeta from '../components/ui/PageMeta';

const ROLES = [
    { title: 'Senior Frontend Engineer', team: 'Engineering', location: 'Paris / Remote', type: 'Full-time' },
    { title: 'Brand Partnerships Manager', team: 'Business', location: 'Paris', type: 'Full-time' },
    { title: 'Head of Community', team: 'Marketing', location: 'Remote', type: 'Full-time' },
    { title: 'Sneaker Authenticator', team: 'Operations', location: 'Paris', type: 'Full-time' },
    { title: 'UX/UI Designer', team: 'Design', location: 'Paris / Remote', type: 'Full-time' },
    { title: 'Customer Experience Specialist', team: 'Support', location: 'Remote', type: 'Part-time' },
];

const Careers = () => {
    const [open, setOpen] = useState(null);
    const toggle = useCallback((i) => setOpen((prev) => prev === i ? null : i), []);

    return (
        <div className="min-h-screen bg-light">
          <PageMeta
            title="Careers"
            description="Join the Sneakara team. Help us build the future of sneaker culture."
          />
            {/* Hero */}
            <div className="bg-dark text-white py-24 px-8 text-center">
                <h1 className="text-5xl font-extrabold tracking-tight mb-4">Join the Team</h1>
                <p className="text-gray-300 text-xl max-w-2xl mx-auto">
                    Help us build the future of sneaker culture.
                </p>
            </div>

            <div className="container max-w-4xl mx-auto px-6 py-20 space-y-16">
                {/* Why us */}
                <section>
                    <h2 className="text-3xl font-bold text-dark mb-8">Why Sneakara?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { icon: '🚀', title: 'Move Fast', text: 'Small team, big impact. Your work ships quickly.' },
                            { icon: '🎨', title: 'Creative Freedom', text: 'We value bold ideas from every corner of the team.' },
                            { icon: '🌍', title: 'Remote Friendly', text: 'Many roles work fully or partially remote.' },
                            { icon: '👟', title: 'Sneaker Perks', text: 'Exclusive access to drops and staff discounts.' },
                        ].map(({ icon, title, text }) => (
                            <div key={title} className="card p-6 flex gap-4">
                                <span className="text-3xl" aria-hidden="true">{icon}</span>
                                <div>
                                    <h3 className="font-bold text-dark mb-1">{title}</h3>
                                    <p className="text-gray-500 text-sm">{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Job listings */}
                <section>
                    <h2 className="text-3xl font-bold text-dark mb-8">Open Positions</h2>
                    <div className="space-y-3">
                        {ROLES.map((role, i) => (
                            <div key={i} className="card overflow-hidden">
                                <button
                                    onClick={() => toggle(i)}
                                    aria-expanded={open === i}
                                    className="w-full flex items-center justify-between p-5 text-left"
                                >
                                    <div>
                                        <p className="font-bold text-dark">{role.title}</p>
                                        <p className="text-sm text-gray-500">{role.team} · {role.location} · {role.type}</p>
                                    </div>
                                    <svg
                                        width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        className={`flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </button>
                                {open === i && (
                                    <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                                        <p className="text-gray-600 mb-4">
                                            We're looking for a talented {role.title.toLowerCase()} to join our {role.team.toLowerCase()} team
                                            and help shape the Sneakara experience.
                                        </p>
                                        <a
                                            href="mailto:careers@sneakara.com"
                                            className="btn btn-primary inline-flex"
                                        >
                                            Apply via Email
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <div className="card p-8 text-center">
                    <h3 className="text-xl font-bold text-dark mb-2">Don't see your role?</h3>
                    <p className="text-gray-500 mb-4">Send us your CV and we'll keep you in mind for future openings.</p>
                    <a href="mailto:careers@sneakara.com" className="btn btn-primary">Get In Touch</a>
                </div>
            </div>
        </div>
    );
};

export default Careers;
