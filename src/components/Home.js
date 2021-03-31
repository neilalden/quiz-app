import React from "react";
import firebase, { auth } from "../firebase";
import Quiz from "./Quiz";
import Dashboard from "./Dashboard";
import Leaderboard from "./LeaderBoard";
import { pages } from "../API";
import {
	Header,
	Segment,
	Container,
	Divider,
	Button,
	Icon,
} from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Home({ user, setPage }) {
	return (
		<Segment inverted>
			<Header as="h1" style={{ marginLeft: "25px" }}>
				Quiz App
				<Icon name="pencil" />
			</Header>

			<Divider />
			<Link to="/quiz">
				<Button circular color="green" style={homeBtnStyle}>
					Start
				</Button>
			</Link>
			<Divider hidden />
			<Link to="/leaderboard">
				<Button circular color="yellow" style={homeBtnStyle}>
					Leaderboard
				</Button>
			</Link>
			<Divider hidden />
			{user ? (
				<Link to="/dashboard">
					<Button circular color="blue" style={homeBtnStyle}>
						Dashboard
					</Button>
				</Link>
			) : (
				<Button onClick={signIn}>
					<Icon name="google" /> Sign in with Google
				</Button>
			)}
		</Segment>
	);
}
const signIn = () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	auth.signInWithPopup(provider);
};
const homeBtnStyle = {
	width: "150px",
};

export default Home;
