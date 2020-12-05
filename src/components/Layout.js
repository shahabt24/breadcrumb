import React from 'react';
import Header from "./sections/Header";
import {Link, withRouter} from "react-router-dom";

const Layout = (props) => {

	// separate routes in url to make breadcrumb
	let routes = props.location.pathname.split('/');

	// load breadcrumb
	// line:23 in <Link to="*"> ==> each item in breadcrumb must have unique path, so we remove all next items, then join the rest together
	return (
		<div className="container-fluid p-0 m-0">
			<Header />
			<div className="mainContainer px-5">
				<div className="d-flex flex-wrap py-3">
					{props.location.pathname === '/' && <span>...</span>}
					{props.location.pathname !== '/' && <Link to="/">...</Link>}
					{routes.map((item, index) => {
						return (
							<div key={Math.random().toString()}>
								{index === routes.length - 1 && <span>{item}</span>}
								{index !== routes.length - 1 && <Link to={`${routes.slice(0, index + 1).join('/')}`}>{item}</Link>}
								{index < routes.length - 1 && <span>{'\xa0/\xa0'}</span>}
							</div>)
					})}
				</div>
				<hr className="w-100 p-0 m-0"/>
				{props.children}
			</div>
		</div>
	);
};

export default withRouter(Layout);
