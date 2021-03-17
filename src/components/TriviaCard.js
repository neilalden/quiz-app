import React from "react";
import { Button } from "semantic-ui-react";
function TriviaCard({ trivia, round, setRound, setScore }) {
	const question = atob(trivia[round].question);
	const incorrect_answers = trivia[round].incorrect_answers.map((ia) =>
		atob(ia)
	);
	const correct_answer = atob(trivia[round].correct_answer);
	const choices = shuffleArray([...incorrect_answers, correct_answer]);
	return (
		<div>
			<h1>{question}</h1>
			<div>
				{choices.map((choice, idx) => (
					<Button
						key={idx}
						value={choice}
						onClick={(e) => {
							e.target.value === correct_answer
								? setScore((prev) => prev + 1)
								: setScore((prev) => prev - 1);
							setRound((prev) => prev + 1);
						}}
					>
						{choice}
					</Button>
				))}
			</div>
		</div>
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

export default TriviaCard;
