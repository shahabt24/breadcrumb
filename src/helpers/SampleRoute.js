export default {
	type: "dir",
	children: {
		home: {
			type: "dir",
			children: {
				myname: {
					type: "dir",
					children: {
						"filea.txt": {
							type: "file",
						},
						"fileb.txt": {
							type: "file",
						},
						"projects": {
							type: "dir",
							children: {
								mysupersecretproject: {
									type: "dir",
									children: {
										mysupersecretfile: {
											type: "file",
										},
									},
								}
							},
						},
					}
				},
			},
		},
		"filea1.txt": {
			type: "file",
		},
		"fileb1.txt": {
			type: "file",
		},
		"projects": {
			type: "dir",
			children: {
				mysupersecretproject: {
					type: "dir",
					children: {
						mysupersecretfile: {
							type: "file",
						},
					},
				}
			},
		},

	},
};
