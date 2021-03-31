import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
	Header,
	Segment,
	Container,
	Divider,
	Button,
	Icon,
} from "semantic-ui-react";

function LeaderBoard() {
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
			LeaderBoard
		</Segment>
	);
}

export default LeaderBoard;
