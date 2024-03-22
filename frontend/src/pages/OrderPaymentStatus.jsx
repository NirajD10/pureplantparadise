import {useEffect} from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom"
import Lottie from "lottie-react";

import sucessfulAnimation from "@/assets/sucessful_lottie.json";
import failedAnimation from "@/assets/failed_lottie.json";

import {Button} from "@/components/ui/button"
import {useDispatch} from "react-redux";
import {cartReduxActions} from "@/features/shop/cartSlices.js";
import {checkoutReduxActions} from "@/features/shop/checkoutSlices.js";

let content;

const style = {
	height: 250,
	width: 250,
}

function OrderPaymentStatus() {
	const navigate = useNavigate();
	const searchQuery = useSearchParams()[0];
	const dispatch = useDispatch();

	const referenceURL = searchQuery.get("reference");
	const results = searchQuery.get("status");

	useEffect(() => {
		if(!referenceURL || !results) {
			navigate("/")
		}
		if (referenceURL && results === "successful") {
			dispatch(cartReduxActions.reset());
			dispatch(checkoutReduxActions.reset());
		}
		if (referenceURL && results === "fail") {
			dispatch(cartReduxActions.reset());
			dispatch(checkoutReduxActions.reset());
		}
	}, []);

	useEffect(() => {
		if (referenceURL && results === "successful") {
			content = (
				<div className="flex flex-col items-center gap-4 space-y-2">
					<Lottie animationData={sucessfulAnimation} loop={false} style={style}/>
					<h3 className="text-2xl font-bold">Order place successfully!</h3>
					<p className="text-base">You can visit order details to be click
						<Link to="/profile/orders" className="underline underline-offset-1 text-bgprimary">learn
							more</Link></p>
				</div>
			)
		} else if (referenceURL && results === "fail") {
			content = (
				<div className="flex flex-col items-center gap-4 space-y-2">
					<Lottie animationData={failedAnimation} loop={false} style={style}/>
					<h3 className="text-2xl font-bold">Payment Failed!</h3>
					<p className="text-base">Please try order to be place again. if money deducted, they will refund at least 3-5
						business day.</p>
					<Button variant="outline" onClick={() => navigate("/")}>Back to Home</Button>
				</div>
			)
		} else {
			navigate("/");
		}
	}, [referenceURL, results]);
	return (
		<div className="container my-12 flex justify-center items-center">
			{content}
		</div>
	);
}

export default OrderPaymentStatus;