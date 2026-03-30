import React from 'react'
import { useNavigate } from 'react-router-dom';

const SizeGuide = () => {
	const navigate = useNavigate();

	return (
		<section id="size_guide">
			<div className="layout-base gap3">
				<div className="wrapper_column gap2">
					<div className="element">
						<button className='btn btn_secondary' onClick={() => navigate(-1)}>Back</button>
					</div>
					<div className="element">
						<h1>Size Guide</h1>
					</div>
					<div className="element">
						<p>Use this conversion chart to choose your ideal fit.</p>
					</div>
				</div>

				<div className="wrapper_column gap2">
					<div className="element_between border_color02 pad1 border_radius1">
						<p>EU 38</p><p>US Men 6</p><p>US Women 7.5</p>
					</div>
					<div className="element_between border_color02 pad1 border_radius1">
						<p>EU 39</p><p>US Men 6.5</p><p>US Women 8</p>
					</div>
					<div className="element_between border_color02 pad1 border_radius1">
						<p>EU 40</p><p>US Men 7</p><p>US Women 8.5</p>
					</div>
					<div className="element_between border_color02 pad1 border_radius1">
						<p>EU 41</p><p>US Men 8</p><p>US Women 9.5</p>
					</div>
					<div className="element_between border_color02 pad1 border_radius1">
						<p>EU 42</p><p>US Men 9</p><p>US Women 10.5</p>
					</div>
					<div className="element_between border_color02 pad1 border_radius1">
						<p>EU 43</p><p>US Men 10</p><p>US Women 11.5</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default SizeGuide;
