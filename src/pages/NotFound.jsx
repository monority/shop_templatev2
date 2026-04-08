import { Link } from 'react-router-dom';
import PageMeta from '../components/ui/PageMeta';

const NotFound = () => (
  <>
    <PageMeta title="404 — Page Not Found" noIndex />
    <div className="min-h-screen bg-light flex flex-col items-center justify-center text-center px-6">
      <p className="text-9xl font-extrabold text-brand/20 leading-none select-none" aria-hidden="true">404</p>
      <h1 className="text-3xl font-extrabold text-dark mt-4 mb-2">Page not found</h1>
      <p className="text-gray-500 max-w-sm mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Link to="/" className="btn btn-primary">Go Home</Link>
        <Link to="/shop" className="btn btn-ghost">Browse Shop</Link>
      </div>
    </div>
  </>
);

export default NotFound;
