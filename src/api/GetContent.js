import root from '../helpers/SampleRoute';

const GetContent = (path) => {
	// make new promise to return fetched data
	return new Promise((result) => {
		setTimeout(() => {
			getLastContent(path, root).then((response) => {
				result(response);
			});
		}, 5000)
	});
};

const getLastContent = async (path, mainRoute) => {
	let newPath = path.length === 1 ? path : path.slice(1);
	// make new promise to return fetched data
	return new Promise(result => {
		let item = newPath[0];
		if (newPath.length === 1 && item === '') {
			// if current route is home("/")
			result(mainRoute);
		} else {
			if (mainRoute?.children.hasOwnProperty(item)) {
				// if this is the last item of newPath
				if (newPath.length === 1) {
					result(mainRoute.children[item]);
				} else {
					// if this is not the last item of newPath, will repeat this.function with new mainRoute
					result(getLastContent(newPath, mainRoute.children[item]));
				}
			} else {
				// if one part of url not match
				result(404);
			}
		}
	})
};

export default GetContent;
