export const ArrowLeft = () => {
	return (
		<svg fill="currentColor" height="2rem" width="2rem" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 512 512" xmlSpace="preserve">
			<g>
				<g>
					<path d="M441.751,475.584L222.166,256L441.75,36.416c6.101-6.101,7.936-15.275,4.629-23.253C443.094,5.184,435.286,0,426.667,0
H320.001c-5.675,0-11.093,2.24-15.083,6.251L70.251,240.917c-8.341,8.341-8.341,21.824,0,30.165l234.667,234.667
c3.989,4.011,9.408,6.251,15.083,6.251h106.667c8.619,0,16.427-5.184,19.712-13.163
C449.687,490.858,447.852,481.685,441.751,475.584z"/>
				</g>
			</g>
		</svg>)
}

export const ArrowRight = () => {
	return (
		<svg fill="currentColor" height="2rem" width="2rem" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg>

	)
}
export const Favorite = ({ width, height }) => {
	return (
		<svg viewBox="0 0 24 24" width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z" stroke="#33363F" stroke-width="2"></path> </g></svg>
	)
}
export const thumbUp = ({ width, height }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up"><path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" /></svg>)
}
export const thumbDown = ({ width, height }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-down"><path d="M17 14V2" /><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" /></svg>)
}
export const Cart = ({ width, height }) => {
	return (
		<svg viewBox="0 0 24 24" width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 10L15 4M21 10H3M21 10L19.6431 16.7845C19.2692 18.6542 17.6275 20 15.7208 20H8.27922C6.37249 20 4.73083 18.6542 4.35689 16.7845L3 10M3 10L9 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>)
}
export const User = ({ width, height, action }) => {
	return (
		<svg viewBox="0 0 24 24" width={width} height={height} onClick={action} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6C9.79088 6 8.00002 7.79086 8.00002 10C8.00002 12.2091 9.79088 14 12 14C14.2092 14 16 12.2091 16 10C16 7.79086 14.2092 6 12 6ZM10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10Z" fill="currentColor"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3281 18.8044C17.502 20.7701 14.8946 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 14.5636 21.0353 16.9019 19.4492 18.6717C19.4574 18.7043 19.4654 18.7371 19.4732 18.7701L19.3281 18.8044ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 13.7512 19.4373 15.3709 18.483 16.6883C18.4787 16.6833 18.4745 16.6783 18.4702 16.6733C17.9897 16.1093 17.3996 15.7355 16.7537 15.4902C15.5207 15.0218 13.9981 15 12.5 15H11.5C10.0157 15 8.58663 15.0178 7.4546 15.5071C6.72237 15.8235 6.15855 16.3097 5.73753 16.9786C4.6499 15.6123 4 13.8821 4 12ZM7.23094 18.4237C8.56265 19.414 10.2129 20 12 20C13.9364 20 15.7121 19.312 17.096 18.1672C17.048 18.0951 16.9985 18.0298 16.9479 17.9704C16.7202 17.7032 16.4289 17.5062 16.0436 17.3598C15.2144 17.0449 14.0755 17 12.5 17H11.5C9.91075 17 8.9284 17.0489 8.2481 17.3429C7.85089 17.5146 7.50217 17.7968 7.23094 18.4237Z" fill="currentColor"></path> </g></svg>
	)
}

export const FullStar = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24" fill="currentColor   ">
		<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
	</svg>
);

export const EmptyStar = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.8rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
		<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
	</svg>
);
export const HalfStar = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="2rem" height="2rem">
		<defs>
			<clipPath id="half-star">
				<rect x="0" y="0" width="1rem" height="2rem" />
			</clipPath>
		</defs>
		<path
			d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
			clipPath="url(#half-star)"
		/>
	</svg>
);
