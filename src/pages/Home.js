import React, {useState} from 'react';
import root from '../helpers/SampleRoute';
import {Link, withRouter} from "react-router-dom";

const Home = (props) => {
	let route = props.location.pathname.split('/');
	const [content, setContent] = useState(root);

	React.useEffect(() => {
		getContent(route[route.length - 1], root);
	}, [props]);

	const getContent = (value, mainRoute) => {
		// for the first route we dont have value
		if (value === '') {
			setContent(root);
		} else {
			if (mainRoute?.children.hasOwnProperty(value)) {
				// if value exist in children of mainRoute
				setContent(mainRoute.children[value]);
			} else {
				// if value not exist in children of mainRoute we have to repeat function to found it
				Object.keys(mainRoute.children).forEach((item) => {
					if (mainRoute.children[item].type !== 'file')
						getContent(value, mainRoute.children[item]);
				})
			}
		}
	};

	// render content of each route
	return (
		<ul className="w-100 d-flex flex-column pt-3">
			{(Object.keys(content).length > 0 && content?.children) && Object.keys(content?.children).map((item) => {
				let newRoute = props.location.pathname === '/' ? '' : props.location.pathname;
				if (content?.children[item].type === 'file') {
					return <Link to={`${newRoute}/${item}`}>{item}</Link>
				} else {
					return <Link to={`${newRoute}/${item}`}>{item}</Link>
				}
			})}
			{(Object.keys(content).length > 0 && !content?.children) && <div className="d-flex flex-column">
				<span>{`The File Is:\xa0\xa0\xa0${route[route.length - 1]}`}</span>
				<span className="mt-3">{`Type Is:\xa0\xa0\xa0${content.type}`}</span>
			</div>}
		</ul>
	)
};

export default withRouter(Home);
