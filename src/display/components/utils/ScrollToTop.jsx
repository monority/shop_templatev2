import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }) => {
	const { pathname, search, hash } = useLocation();
	console.log("ok")
	useEffect(() => {
		const scrollToTop = () => window.scrollTo(0, 0);
		window.requestAnimationFrame(scrollToTop);
	}, [pathname, search, hash]); 

	return <>{children}</>;
};

export default ScrollToTop;