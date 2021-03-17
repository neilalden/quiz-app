import "./App.css";
import "semantic-ui-css/semantic.min.css";
import React, { useState, useEffect } from "react";
import TriviaCard from "./components/TriviaCard";
import { getTrivia, getCategory } from "./API";
import {
	Header,
	Segment,
	Container,
	Divider,
	Button,
	Progress,
	Select,
	Loader,
	Dimmer,
	Label,
} from "semantic-ui-react";
const MAXROUND = 9;
function App() {
	// Update the document title using the browser API
	const [trivia, setTrivia] = useState([]);
	const [round, setRound] = useState(-1);
	const [score, setScore] = useState(0);
	const [category, setCategory] = useState(0);
	const [difficulty, setDifficulty] = useState("");
	const [cat, setCat] = useState([]);
	const [loading, setLoading] = useState(true);

	const loadTrivia = async (category, difficulty) => {
		const trivia = await getTrivia(category, difficulty);
		return trivia;
	};
	const loadCategory = async () => {
		const category = await getCategory();
		return category.map((c) => {
			setLoading(false);
			return { key: c.id, text: c.name, value: c.id };
		});
	};
	const catOnChange = (event, result) => {
		const { value } = result || event.target;
		setCategory(value);
	};
	const diffOnChange = (event, result) => {
		const { value } = result || event.target;
		setDifficulty(value);
	};
	const startEvent = () => {
		if (round >= MAXROUND) {
			setRound(-1);
			setScore(0);
		}
		loadTrivia(category, difficulty).then((res) => {
			setTrivia(res);
			setRound((prev) => prev + 1);
		});
	};
	useEffect(() => {
		loadCategory().then((res) => {
			setCat(res);
		});
	}, [category]);

	return (
		<Container className="App">
			{!loading ? (
				<>
					<Divider hidden />
					<Segment>
						<Header as="h1">Trivia App</Header>
						<Divider />
						<Label>
							<Header as="h3">
								category and difficulty will be set to any if not specified
							</Header>
						</Label>

						{round >= MAXROUND ? (
							<Header as="h1" color="green">
								{score}
							</Header>
						) : null}

						<Divider hidden />
						{round >= 0 && round < MAXROUND ? (
							<>
								<Progress percent={round * 10} indicating />
								<TriviaCard
									trivia={trivia}
									round={round}
									setRound={setRound}
									setScore={setScore}
								/>
							</>
						) : (
							<>
								<Header>Category</Header>
								<Select
									style={{ minWidth: "250px" }}
									placeholder="Select Category"
									onChange={catOnChange}
									value={category}
									options={cat}
								/>
								<Divider hidden />
								<Header>Difficulty</Header>
								<Select
									style={{ minWidth: "250px" }}
									placeholder="Select Difficulty"
									onChange={diffOnChange}
									value={difficulty}
									options={[
										{ key: 1, text: "easy", value: "easy" },
										{ key: 2, text: "medium", value: "medium" },
										{ key: 3, text: "hard", value: "hard" },
									]}
								/>
								<Divider hidden />
								<Button primary onClick={startEvent}>
									Start
								</Button>
							</>
						)}
					</Segment>
				</>
			) : (
				<Dimmer active inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>
			)}
		</Container>
	);
}

export default App;
