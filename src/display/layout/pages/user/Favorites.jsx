import React from 'react'
import { useStore } from '../../../../cfg/state/Store';
const Favorites = () => {
	const state_favorites = useStore(state => state.user.favorites);
	const showFavorites = () => {
		console.log(state_favorites);
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
					</div>
				</div>
			));
		} else {
			return <p>No favorites found.</p>;
		}
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