import { useStore } from '../../cfg/state/Store';

const ProductManagement = () => {
	const addProduct = useStore((state) => state.addProduct);
	const updateProduct = useStore((state) => state.updateProduct);
	const addProductFavorite = useStore((state) => state.addProductFavorite);
	const handleAddProduct = (product) => {
		addProduct(product);
	};
	const handleUpdateProduct = (product) => {
		updateProduct(product);
	}
	return {
		handleAddProduct,
		handleUpdateProduct
	};
};

export default ProductManagement;