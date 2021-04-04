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
	const [user, loading, error] = useAuthState(auth);
	return (
		<Router>
			<Segment vertical inverted style={segmentStyle}>
				<Switch>
					<Route exact path="/">
						<Home user={user} />
					</Route>
					<Route path="/quiz">
						<Quiz user={user} />
					</Route>
					<Route path="/leaderboard">
						<Leaderboard />
					</Route>
					<Route path="/dashboard">
						<Dashboard user={user} />
					</Route>
				</Switch>
			</Segment>
		</Router>
	);
}
const segmentStyle = {
	height: "100vh",
	padding: "1em 0em",
};

export default App;
