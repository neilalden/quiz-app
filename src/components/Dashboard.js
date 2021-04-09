import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
	Header,
	Segment,
	Divider,
	Icon,
	Table,
	Grid,
	Image,
	Loader,
	Dimmer,
} from "semantic-ui-react";
import firebase, { firestore } from "../firebase";
import { useDocument, useCollectionData } from "react-firebase-hooks/firestore";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Dashboard() {
	const [user, loading, error] = useAuthState(auth);
	const param = user ? user.uid : "none";
	const userRef = firestore.collection(param);
	const query = userRef.orderBy("createdAt", "desc");
	const [data] = useCollectionData(query);
	const mmrRef = firestore.collection(user ? user.uid : "none").doc("myMMR");
	const [mmr] = useDocument(mmrRef);
	const [score, setScore] = useState(0);
	const [speed, setSpeed] = useState(0);
	const [numOfQuizes, setNumOfQuizes] = useState(0);
	console.log(score / numOfQuizes, "score");
	console.log(numOfQuizes * 10, "num of quizes");
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
		<>
			{user ? (
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

					<Header as="h1">
						<Image src={user.photoURL} avatar />
						{user.displayName}
					</Header>
					<Divider hidden />
					<Segment placeholder inverted>
						<Grid columns={2} stackable textAlign="center">
							{/* <Divider vertical /> */}

							<Grid.Row centered verticalAlign="middle">
								<Grid.Column>
									<div style={{ width: 200, height: 200, float: "right" }}>
										<CircularProgressbar
											value={(score / numOfQuizes) * 10}
											maxValue={100}
											text={mmr ? mmr.data().mmr : ""}
											styles={buildStyles({
												strokeLinecap: "butt",
												pathColor: "#21ba45",
												textColor: "white",
												trailColor: "#db2828",
												backgroundColor: "#3e98c7",
											})}
										/>
									</div>
								</Grid.Column>
								<Grid.Column>
									<Segment inverted>
										<Header as="h3">
											{((score / numOfQuizes) * 10).toFixed(2)} % correct quizes
											<br />
											{(score / numOfQuizes + 1).toFixed(2)} % wrong quizes
											<br />
											{speed / (numOfQuizes + 1)} average speed
											<br />
											{mmr ? mmr.data().mmr : ""} current MMR
										</Header>
									</Segment>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Segment>

					<Divider hidden />
					<Divider hidden />
					<Divider hidden />
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
			) : (
				<Dimmer active>
					<Loader>Loading</Loader>
				</Dimmer>
			)}
		</>
	);
}

export default Dashboard;
