export const getTrivia = async (catt = 9, diff = "easy") => {
	const URL = `https://opentdb.com/api.php?amount=10&category=${catt}&difficulty=${diff}&encode=base64`;
	const getData = await fetch(URL);
	const data = await getData.json();
	return data.results;
};

export const getCategory = async () => {
	const URL = "https://opentdb.com/api_category.php";
	const getData = await fetch(URL);
	const data = await getData.json();
	return data.trivia_categories;
};
