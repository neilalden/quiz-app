import "./App.css";
import "semantic-ui-css/semantic.min.css";
import React from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/LeaderBoard";
import { Segment } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
	// const [trivia, setTrivia] = useState([]);
	// const [round, setRound] = useState(-1);
	// const [score, setScore] = useState(1);
	// const [category, setCategory] = useState(0);
	// const [difficulty, setDifficulty] = useState("");
	// const [cat, setCat] = useState([]);
	// const [loading, setLoading] = useState(true);

	// const loadTrivia = async (category, difficulty) => {
	// 	const trivia = await getTrivia(category, difficulty);
	// 	return trivia;
	// };
	// const loadCategory = async () => {
	// 	const category = await getCategory();
	// 	return category.map((c) => {
	// 		setLoading(false);
	// 		return { key: c.id, text: c.name, value: c.id };
	// 	});
	// };
	// const catOnChange = (event, result) => {
	// 	const { value } = result || event.target;
	// 	setCategory(value);
	// };
	// const diffOnChange = (event, result) => {
	// 	const { value } = result || event.target;
	// 	setDifficulty(value);
	// };
	// const startEvent = () => {
	// 	setLoading(true);
	// 	if (round >= MAXROUND) {
	// 		setRound(-1);
	// 		setScore(0);
	// 	}
	// 	loadTrivia(category, difficulty).then((res) => {
	// 		setTrivia(res);
	// 		setRound((prev) => prev + 1);
	// 		setLoading(false);
	// 	});
	// };
	// useEffect(() => {
	// 	loadCategory()
	// 		.then((res) => {
	// 			setCat(res);
	// 		})
	// 		.catch((e) => alert(e));
	// }, [category]);
	const [user, loading, error] = useAuthState(auth);
	return (
		<Router>
			<Segment vertical inverted style={segmentStyle}>
				<Switch>
					<Route exact path="/">
						<Home user={user} />
					</Route>
					<Route path="/quiz">
						<Quiz />
					</Route>
					<Route path="/leaderboard">
						<Leaderboard />
					</Route>
					<Route path="/dashboard">
						<Dashboard />
					</Route>
				</Switch>
			</Segment>
		</Router>
		// <Container className="App">
		// 	{!loading ? (
		// 		<>
		// 			<Divider hidden />
		// 			<Segment>
		// 				<Header as="h1">Trivia App</Header>
		// 				<Divider />

		// 				{round > MAXROUND ? (
		// 					<Header as="h1" color="green">
		// 						{score}
		// 					</Header>
		// 				) : null}

		// 				<Divider hidden />
		// 				{round >= 0 && round <= MAXROUND ? (
		// 					<>
		// 						<Progress percent={round * 10} indicating />
		// 						<TriviaCard
		// 							trivia={trivia}
		// 							round={round}
		// 							setRound={setRound}
		// 							setScore={setScore}
		// 							score={score}
		// 						/>
		// 					</>
		// 				) : (
		// 					<>
		// 						<Label>
		// 							<Header as="h3">
		// 								for any category and difficulty, just press start
		// 							</Header>
		// 						</Label>
		// 						<Divider hidden />

		// 						<Header>Category</Header>
		// 						<Select
		// 							style={{ minWidth: "300px" }}
		// 							placeholder="Select Category"
		// 							onChange={catOnChange}
		// 							value={category}
		// 							options={cat}
		// 						/>
		// 						<Header>Difficulty</Header>
		// 						<Select
		// 							style={{ minWidth: "300px" }}
		// 							placeholder="Select Difficulty"
		// 							onChange={diffOnChange}
		// 							value={difficulty}
		// 							options={[
		// 								{ key: 1, text: "easy", value: "easy" },
		// 								{ key: 2, text: "medium", value: "medium" },
		// 								{ key: 3, text: "hard", value: "hard" },
		// 							]}
		// 						/>
		// 						<Divider hidden />
		// 						<Button primary onClick={startEvent}>
		// 							Start
		// 						</Button>
		// 						<Divider hidden />
		// 					</>
		// 				)}
		// 			</Segment>
		// 		</>
		// 	) : (
		// 		<Dimmer active inverted>
		// 			<Loader inverted>Loading</Loader>
		// 		</Dimmer>
		// 	)}
		// </Container>
	);
}
const segmentStyle = {
	height: "100vh",
	padding: "1em 0em",
};

export default App;
