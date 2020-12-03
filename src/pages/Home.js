import React, {useEffect, useState, memo} from 'react';
import {Link, withRouter} from "react-router-dom";
import GetContent from "../api/GetContent";
import Loader from "react-loader-spinner";

const Home = (props) => {

	let route = props.location.pathname.split('/');
	const [bigLoader, setBigLoader] = useState(1); // 1=true 2=false 3=fetchError 4=404
	const [content, setContent] = useState({});

	useEffect(() => {
		getContentData();
	}, [route]);

	const getContentData = () => {
		// last item of route
		let path = route[route.length - 1];
		GetContent(path)
			.then((response) => {
				if (response) {
					if (response === 404) {
						// if the route not found
						setBigLoader(4);
					} else {
						// if everything is good
						setBigLoader(2);
						setContent(response);
					}
				} else {
					// if there is problem in send or receive data
					setBigLoader(3);
				}
			})
			.catch(() => {
				// if there is problem in connection
				setBigLoader(3);
			})
	};

	const tryAgain = () => {
		// Hide UI then send request
		setBigLoader(1);
		getContentData();
	};

	return (
		<div className="w-100 d-flex flex-column pt-3">
			{bigLoader === 1 && <div className="w-100 h-100 d-flex align-items-center justify-content-center" style={{minHeight: 300}}>
				<Loader type="ThreeDots" color='rgba(200, 0, 254, 1)' height={15} width={100} className="loader"/>
			</div>}
			{bigLoader === 2 && <ul className="w-100 d-flex flex-column pt-3">
				{(Object.keys(content).length > 0 && content?.children) && Object.keys(content?.children).map((item) => {
					let newRoute = props.location.pathname === '/' ? '' : props.location.pathname;
					if (content?.children[item].type === 'file') {
						return <li className="mt-3" key={Math.random().toString()}>
							<Link to={`${newRoute}/${item}`} className="bigText">{item}</Link>
						</li>
					} else {
						return <li className="mt-3" key={Math.random().toString()}>
							<Link to={`${newRoute}/${item}`} className="bigText">{item}</Link>
						</li>
					}
				})}
				{(Object.keys(content).length > 0 && !content?.children) && <div className="d-flex flex-column">
					<span>{`The File Is:\xa0\xa0\xa0${route[route.length - 1]}`}</span>
					<span className="mt-3">{`Type Is:\xa0\xa0\xa0${content.type}`}</span>
				</div>}
			</ul>}
			{bigLoader === 3 && <div className="d-flex flex-column justify-content-center align-items-center text-center">
				<span className="font-weight-bold text-danger mt-2">Sorry, something went wrong.</span>
				<span className="font-weight-bold text-danger mt-2">Please Try Again!!!</span>
				<button type="button" className="btn btn-outline-danger mt-5" onClick={tryAgain}>
					Try Again
				</button>
			</div>}
			{bigLoader === 4 && <div className="d-flex flex-column justify-content-center align-items-center text-center">
				<span className="font-weight-bold text-danger mt-2">404</span>
				<span className="font-weight-bold text-danger mt-2">Not Found!</span>
			</div>}
		</div>
	)
};

export default memo(withRouter(Home));
