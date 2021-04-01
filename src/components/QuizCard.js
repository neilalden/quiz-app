import React, { useState, useEffect } from "react";
import { Header, Segment, Divider, Button } from "semantic-ui-react";
import firebase, { auth, firestore } from "../firebase";

function QuizCard({
	MAXROUND,
	trivia,
	round,
	score,
	time,
	user,
	difficulty,
	setRound,
	setScore,
	setOver,
	setLoading,
}) {
	const triviaRound = trivia[round];
	const question = atob(triviaRound.question);
	const correct_answer = atob(triviaRound.correct_answer);
	const incorrect_answers = triviaRound.incorrect_answers.map((ia) => atob(ia));
	const [choices, setChoices] = useState([]);
	const [quizData, setQuizData] = useState([]);
	useEffect(() => {
		setChoices(shuffleArray([...incorrect_answers, correct_answer]));
	}, [question]);
	return (
		<Segment inverted>
			<Segment inverted>
				<Header as="h3" style={{ float: "right", textAlign: "start" }}>
					difficulty : {difficulty}
					<br />
					round : {round + 1}/10
					<br />
					score : {score}
					<br />
					time : {parseInt(time / 60)}:{time % 60}
				</Header>
			</Segment>
			<Divider hidden />
			<Divider hidden />
			<Divider hidden />
			<Divider hidden />
			<Divider hidden />
			<Header as="h1">{question}</Header>
			<Divider hidden />

			{choices.map((choice, idx) => (
				<Button
					key={idx}
					value={choice}
					onClick={(e) => {
						setQuizData((prev) => [
							...prev,
							{ question, user_answer: e.target.value, correct_answer },
						]);
						if (e.target.value === correct_answer) {
							setScore((prev) => prev + 1);
						}
						if (round == MAXROUND) {
							//  this is fucking delay, move this up to its parent component
							if (user) {
								setLoading(true);
								const ref = firestore.collection(user.uid);
								ref
									.add({
										quizData: [
											...quizData,
											{ question, user_answer: e.target.value, correct_answer },
										],
										score,
										time,
										difficulty,
										createdAt: firebase.firestore.FieldValue.serverTimestamp(),
									})
									.then((docRef) => {
										setOver(true);
										setLoading(false);
										// console.log("Document written with ID: ", docRef.id);
									})
									.catch((error) => {
										setOver(true);
										setLoading(false);
										console.error("Error adding document: ", error);
									});
							} else {
								setOver(true);
							}
						} else {
							setRound((prev) => prev + 1);
						}
					}}
				>
					{choice}
				</Button>
			))}
		</Segment>
	);
}
const saveUserData = (quizData, score, time, difficulty, user) => {
	const userData = {
		quizData,
		score,
		time,
		difficulty,
	};
	const ref = firestore.collection(user.uid);
	ref
		.add({
			userData,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
		})
		.then((docRef) => {
			return true;
			// console.log("Document written with ID: ", docRef.id);
		})
		.catch((error) => {
			console.error("Error adding document: ", error);
		});
	return true;
};
const shuffleArray = (array) => {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
};

export default QuizCard;
