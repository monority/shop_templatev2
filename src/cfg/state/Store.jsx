import { create } from "zustand";

export const useStore = create((set) => ({
	user: {
		uid: '',
		username: '',
		email: '',
		phone: '',
		address: '',
		role: '',
		createdAt: '',
		products: [
			{
				id: '',
				name: '',
				quantity: 0,
				price: '',
				codeProduct: '',
			}
		],
	},
	popup: {
		isOpen: false,
		message: "",
		type: "",
	},
	data: {
		email: '',
	},
	setData: (data) => set({ data }),
	setUser: (user) => set({
		user: user || {
			uid: '',
			username: '',
			email: '',
			phone: '',
			address: '',
			role: '',
			createdAt: '',
			products: [],
		}
	}),
	addProduct: (product) => set((state) => {
		if (!state.user) return {};
		return {
			user: {
				...state.user,
				products: [...(state.user.products || []), product],
			},
		};
	}),
	removeProduct: (productId) => set((state) => {
		if (!state.user) return {};
		return {
			user: {
				...state.user,
				products: state.user.products.filter((product) => product.id !== productId),
			},
		};
	}),
	updateProduct: (updatedProduct) => set((state) => {
		if (!state.user) return {};
		return {
			user: {
				...state.user,
				products: state.user.products.map((product) =>
					product.id === updatedProduct.id ? updatedProduct : product
				),
			},
		};
	}),
	updateQuantityProduct: (productId) => set((state) => {
		if (!state.user) return {};
		return {
			user: {
				...state.user,
				products: state.user.products.map((product) =>
					product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
				),
			},
		};
	}),
	addProductFavorite: (productId) => set((state) => {
		if (!state.user) return {};
		return {
			user: {
				...state.user,
				products: state.user.products.map((product) =>
					product.id === productId ? { ...product, favorite: !product.favorite } : product
				),
			},
		};
	}),
	errorPop: (message) => {
		set({
			popup: {
				isOpen: true,
				message: message,
				type: "error",
			},
		});
		setTimeout(() => {
			set({
				popup: {
					isOpen: false,
					message: "",
					type: "",
				},
			});
		}, 4200);
	},
}));