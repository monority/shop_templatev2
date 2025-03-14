import { create } from "zustand";

export const useStore = create((set) => ({
	user: {
		_id: '',
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
				quantity: '',
				price: '',
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
	setData : (data) => set({ data }),
	setUser: (user) => set({ user }),
	addProduct: (product) => set((state) => ({ user: { ...state.user, products: [...state.user.products, product] } })),
	removeProduct: (productId) => set((state) => ({
		user: { ...state.user, products: state.user.products.filter((product) => product.id !== productId) },
	})),
	updateProduct: (updatedProduct) => set((state) => ({
		user: {
			...state.user, products: state.user.products.map((product) =>
				product.id === updatedProduct.id ? updatedProduct : product
			)
		},
	})),
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