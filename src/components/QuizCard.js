import React, { useState, useEffect } from "react";
import {
	Header,
	Segment,
	Container,
	Divider,
	Button,
	Icon,
} from "semantic-ui-react";

function QuizCard({
	MAXROUND,
	trivia,
	round,
	score,
	time,
	setRound,
	setScore,
	setTime,
}) {
	const triviaRound = trivia[round];
	const question = atob(triviaRound.question);
	const correct_answer = atob(triviaRound.correct_answer);
	const incorrect_answers = triviaRound.incorrect_answers.map((ia) => atob(ia));
	const choices = [...incorrect_answers, correct_answer];
	let intrvl;
	useEffect(() => {
		if (round == MAXROUND) {
			clearInterval(intrvl);
		} else {
			intrvl = setInterval(() => {
				setTime((prev) => (prev += 1));
			}, 1000);
		}
	}, []);
	var m = parseInt(time / 60);
	var s = time % 60;
	return (
		<Segment inverted>
			<Segment inverted>
				<Header as="h3" style={{ float: "right", textAlign: "start" }}>
					round : {round + 1}/10
					<br />
					score : {score}
					<br />
					time : {m}:{s}
				</Header>
			</Segment>
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
						if (e.target.value === correct_answer) {
							setScore((prev) => prev + 1);
						}
						setRound((prev) => prev + 1);
					}}
				>
					{choice}
				</Button>
			))}
		</Segment>
	);
}
function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

export default QuizCard;
