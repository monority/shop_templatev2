import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCart, useFavorites } from '../store';
import PageMeta from '../components/ui/PageMeta';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setMainImage(product.images?.[0] || product.image);
      setSelectedSize(product.sizes?.[0]);
      setSelectedColor(product.colors?.[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;
    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: mainImage,
      size: selectedSize,
      color: selectedColor,
      quantity
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) {
    return (
      <div className="bg-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-gray-200 border-t-brand rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <p className="text-gray mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <button className="btn btn-primary" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-h-screen">
      <PageMeta title={product.name} description={`${product.brand} ${product.name} — ${product.description?.slice(0, 100)}`} />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="container">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray hover:text-dark transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link to="/shop" className="text-gray hover:text-dark transition-colors">Shop</Link>
            <span className="text-gray-300">/</span>
            <span className="text-dark font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="card overflow-hidden mb-4 aspect-square">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`w-20 h-20 rounded-lg overflow-hidden transition-all ${mainImage === img ? 'ring-2 ring-brand' : 'ring-2 ring-transparent hover:ring-gray-200'
                      }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Brand & Name */}
            <span className="text-sm font-semibold text-brand uppercase tracking-wide">
              {product.brand}
            </span>
            <h1 className="text-4xl font-extrabold text-dark mt-2 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5 text-warning">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={i < Math.floor(product.rating || 4.5) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="text-gray">
                {product.rating || 4.5} ({product.reviews || 128} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl font-extrabold text-dark">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.discount > 0 && (
                <span className="px-3 py-1 bg-accent text-white text-sm font-semibold rounded">
                  Save {product.discount}%
                </span>
              )}
            </div>

            <p className="text-gray leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block font-semibold text-dark mb-3">
                  Color: <span className="text-gray font-normal">{selectedColor}</span>
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full transition-all ${selectedColor === color ? 'ring-2 ring-offset-2 ring-dark' : 'ring-2 ring-gray-200'
                        }`}
                      style={{ background: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block font-semibold text-dark mb-3">
                  Size
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[60px] px-4 py-3 rounded-lg font-semibold transition-all ${selectedSize === size
                        ? 'bg-brand/10 text-brand border-2 border-brand'
                        : 'bg-white text-dark border-2 border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex gap-4 mb-8">
              {/* Quantity Selector */}
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-white text-dark hover:bg-gray-50 transition-colors"
                >
                  −
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-white text-dark hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-1 btn transition-all ${added ? 'bg-success text-white border-success' : 'btn-primary'}`}
              >
                {added ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
                    Added!
                  </span>
                ) : `Add to Cart — $${product.price * quantity}`}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleFavorite(product)}
                aria-label={isFavorite(product?.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all ${isFavorite(product?.id) ? 'bg-error text-white border-error' : 'bg-white text-gray border-gray-200 hover:border-error'
                  }`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite(product?.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-dark mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
