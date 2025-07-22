import React from 'react'
import { useStore } from '../../../../cfg/state/Store';
const Favorites = () => {
	const state_favorites = useStore(state => state.user.favorites);
	const state_AddFavorite = useStore((state) => state.toggleProductFavorite);
	const showFavorites = () => {

		if (state_favorites && state_favorites.length > 0) {
			return state_favorites.map((favorite, index) => (
				<div key={index} className="favorite-item">
					<div className="element">
						<img src={favorite.image} alt={favorite.name} className="favorite-image" />
					</div>
					<div className="element">
						<h2>{favorite.name}</h2>
						<p>{favorite.description}</p>
						<p className="price">${parseFloat(favorite.price).toFixed(2)}</p>
						<button onClick={() => removeFavorite(index)} className="btn btn-danger">Remove from Favorites</button>
					</div>
				</div>
			));
		} else {
			return <p>No favorites found.</p>;
		}
	}

	const removeFavorite = (index) => {
		const findProduct = state_favorites[index];
		state_AddFavorite(findProduct);
	}
	return (
		<>
			<section id="favorites">
				<div className="lyt_container gap4">
					<div className="wrapper">
						<div className="element">
							<h1>Favorites</h1>
						</div>
						<div className="element">
							<p>Here you can find all your favorite products.</p>
						</div>
					</div>
					{showFavorites()}

				</div>
			</section>
		</>
	)
}

export default Favorites