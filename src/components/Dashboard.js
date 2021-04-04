import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
	Header,
	Segment,
	Container,
	Divider,
	Button,
	Icon,
	Table,
	Label,
} from "semantic-ui-react";
import firebase, { firestore } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function Dashboard({ user }) {
	const userRef = firestore.collection(user.uid);
	const query = userRef.orderBy("createdAt", "desc");
	const [data] = useCollectionData(query);
	const [score, setScore] = useState(0);
	const [speed, setSpeed] = useState(0);
	const [numOfQuizes, setNumOfQuizes] = useState(0);
	useEffect(() => {
		if (data) {
			data.map((data, idx) => {
				setScore((prev) => (prev += data.score));
				setSpeed((prev) => (prev += data.time));
				setNumOfQuizes((prev) => (prev += idx));
			});
		}
	}, [data]);
	return (
		<Segment inverted>
			<Link to="/">
				<Header as="h3" color="grey">
					<Icon
						name="arrow alternate circle left"
						style={{ cursor: "pointer", float: "left" }}
					/>
				</Header>
			</Link>
			<Divider hidden />
			<Header as="h1">{user.displayName}</Header>
			<Divider hidden />
			<Header as="h3">
				{(((numOfQuizes + 1) * 10) / score) * 100} % of your quizes are correct
			</Header>
			<Header as="h3">
				{(((numOfQuizes + 1) * 10) / score) * 100 - 100} % of your quizes are
				wrong
			</Header>
			<Header as="h3">
				{speed / (numOfQuizes + 1)} sec is your average speed
			</Header>
			<Table celled inverted striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell colSpan="3" textAlign="center">
							Quiz history
						</Table.HeaderCell>
					</Table.Row>
					<Table.Row>
						<Table.HeaderCell>Question</Table.HeaderCell>
						<Table.HeaderCell>Your answer</Table.HeaderCell>
						<Table.HeaderCell>Correct answer</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{data &&
						data.map((d) =>
							d.quizData.map((qd, idx) => (
								<Table.Row key={idx}>
									<Table.Cell>{qd.question}</Table.Cell>
									<Table.Cell>{qd.user_answer}</Table.Cell>
									<Table.Cell>{qd.correct_answer}</Table.Cell>
								</Table.Row>
							))
						)}
				</Table.Body>
			</Table>
		</Segment>
	);
}

export default Dashboard;
