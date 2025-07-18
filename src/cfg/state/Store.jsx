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
		favorites: [],
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
			favorites: [],
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
	toggleProductFavorite: (product) => set((state) => {
		if (!state.user) return {};

		const isAlreadyFavorite = state.user.favorites.find(fav => fav.id === product.id);

		if (isAlreadyFavorite) {
			return {
				user: {
					...state.user,
					favorites: state.user.favorites.filter(fav => fav.id !== product.id),
				},
			};
		} else {
			// Add to favorites
			return {
				user: {
					...state.user,
					favorites: [...state.user.favorites, product],
				},
			};
		}
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