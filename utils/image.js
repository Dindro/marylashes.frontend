const getImageFromFile = async (file) => {
	if (!file) return;

	return new Promise(resolve => {
		const reader = new FileReader();

		reader.onload = e => {
			resolve(e.target.result);
		};

		reader.readAsDataURL(file);
	});
}

const getImagesFromFiles = async (files) => {
	const readers = files
		.filter(file => file)
		.map(file => getImageFromFile(file));

	return Promise.all(readers);
}

const actionReadFromFiles = (files, action) => {
	if (!action) return;

	files
		.filter(file => file)
		.map(async file => action(await getImageFromFile(file)));
}

export {
	getImageFromFile,
	getImagesFromFiles,
	actionReadFromFiles,
}
