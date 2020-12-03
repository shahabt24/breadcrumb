import root from '../helpers/SampleRoute';

const GetContent = (path) => {
	// make new promise to return fetched data
	return new Promise((result) => {
		getLastContent(path, root).then((response) => {
			result(response);
		});
	});
};

const getLastContent = async (value, mainRoute) => {
	// make new promise to return fetched data
	return new Promise(result => {
		// first root of data
		if (value === '') {
			result(mainRoute);
		} else {
			// if route exist in current root, will return to GetContent function
			if (mainRoute?.children.hasOwnProperty(value)) {
				result(mainRoute.children[value]);
			} else {
				// if route not found in current root, do this function (getLastContent) till found it
				for (let i = 0; i < Object.keys(mainRoute?.children).length; i++) {
					let item = mainRoute?.children[Object.keys(mainRoute?.children)[i]];
					if (item.type !== 'file') {
						result(getLastContent(value, item));
					}
				}
				// if route not found
				result(404);
			}
		}
	})
};

export default GetContent;
