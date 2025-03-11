import { create } from "zustand";

export const useStore = create((set) => ({
	user: null,
	products: [],
	setUser: (user) => set({ user }),
	addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
	removeProduct: (productId) => set((state) => ({
		products: state.products.filter((product) => product.id !== productId),
	})),
	updateProduct: (updatedProduct) => set((state) => ({
		products: state.products.map((product) =>
			product.id === updatedProduct.id ? updatedProduct : product
		),
	})),
}));