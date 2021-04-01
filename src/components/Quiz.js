import React, { useState, useEffect, useRef } from "react";
import { getTrivia, getCategory, pages } from "../API";
import QuizCard from "./QuizCard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import {
	Header,
	Segment,
	Container,
	Divider,
	Button,
	Select,
	Loader,
	Dimmer,
	Rating,
	Icon,
	Modal,
} from "semantic-ui-react";

const MAXROUND = 9;
const DIFFICULTY = {
	1: "easy",
	2: "medium",
	3: "hard",
};

function Quiz({ user }) {
	// for fetching category list
	const [cat, setCat] = useState([]);
	//
	const [loading, setLoading] = useState(false);
	const [difficulty, setDifficulty] = useState("");
	const [category, setCategory] = useState(0);
	const [trivia, setTrivia] = useState([]);
	const [round, setRound] = useState(0);
	const [score, setScore] = useState(0);
	const [time, setTime] = useState(0);
	const [over, setOver] = useState(false);

	const loadTrivia = async (category, difficulty) => {
		const trivia = await getTrivia(category, difficulty);
		return trivia;
	};
	const loadCategory = async () => {
		const category = await getCategory();
		return category.map((c) => {
			return { key: c.id, text: c.name, value: c.id };
		});
	};
	useEffect(() => {
		loadCategory()
			.then((res) => {
				setCat(res);
			})
			.catch((e) => console.log(e));
	}, [category]);
	const handleRate = (e, data) => {
		const rating = data.rating;
		setDifficulty(DIFFICULTY[rating]);
	};

	const catOnChange = (event, result) => {
		const { value } = result || event.target;
		setCategory(value);
	};
	const timerRef = useRef(null);
	const startQuiz = () => {
		if (category == 0) {
			alert("please select a category");
		} else {
			timerRef.current = setInterval(() => {
				setTime((prev) => (prev += 1));
			}, 1000);
			if (difficulty == "") setDifficulty("easy");
			setLoading(true);
			loadTrivia(category, difficulty)
				.then((res) => {
					setTrivia(res);
					setLoading(false);
				})
				.catch((err) => console.error(err));
		}
	};

	if (over) {
		clearTimeout(timerRef.current);
	}
	return (
		<>
			{cat.length > 0 && !loading ? (
				<Segment inverted>
					<Link to="/">
						<Header as="h3" color="grey">
							<Icon
								name="arrow alternate circle left"
								style={{ cursor: "pointer", float: "left" }}
							/>
						</Header>
					</Link>
					<Container>
						<Divider hidden />
						{trivia.length > 0 && !over ? (
							<QuizCard
								MAXROUND={MAXROUND}
								trivia={trivia}
								round={round}
								score={score}
								time={time}
								user={user}
								difficulty={difficulty}
								setRound={setRound}
								setScore={setScore}
								setOver={setOver}
								setLoading={setLoading}
							/>
						) : (
							<QuizConfig
								catOnChange={catOnChange}
								category={category}
								cat={cat}
								handleRate={handleRate}
								startQuiz={startQuiz}
							/>
						)}
						<Modal basic open={over} size="small">
							<Header icon as="h1">
								<Icon name="heart" color="red" />
								Congrats!
							</Header>
							<Modal.Content>
								<Header as="h3" style={{ color: "white", textAlign: "center" }}>
									You got {score} correct answers in {parseInt(time / 60)}:
									{time % 60}
								</Header>
							</Modal.Content>
							<Modal.Actions>
								<Link to="/">
									<Button color="green" inverted>
										<Icon name="home" /> home
									</Button>
								</Link>
							</Modal.Actions>
						</Modal>
					</Container>
				</Segment>
			) : (
				<Dimmer active>
					<Loader>Loading</Loader>
				</Dimmer>
			)}
		</>
	);
}
function QuizConfig({ catOnChange, category, cat, handleRate, startQuiz }) {
	return (
		<Segment inverted>
			<Divider hidden />

			<Header>Quiz category</Header>
			<Select
				style={{ minWidth: "300px" }}
				placeholder="Select Category"
				onChange={catOnChange}
				value={category}
				options={cat}
			/>
			<Header>Quiz difficulty</Header>

			<Rating
				icon="star"
				size="massive"
				defaultRating={1}
				maxRating={3}
				onRate={handleRate}
			/>

			<Divider hidden />
			<Button circular color="green" onClick={startQuiz}>
				Start
			</Button>
			<Divider hidden />
		</Segment>
	);
}
export default Quiz;
