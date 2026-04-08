import { useAppStore } from '../../store';

// Thin hook wrapping store cart + favorites for product interactions
const ProductManagement = () => {
	const addToCart = useAppStore((state) => state.addToCart);
	const toggleFavorite = useAppStore((state) => state.toggleFavorite);

	return {
		handleAddToCart: addToCart,
		handleToggleFavorite: toggleFavorite,
	};
};

export default ProductManagement;
