import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
	Header,
	Segment,
	Divider,
	Icon,
	Table,
	Image,
	Container,
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
			<Divider hidden />
			<Header as="h3">
				sign in and play 3 star quizes to gain MMR &nbsp;
				<Icon name="trophy" />
			</Header>
			<Container>
				<Table celled inverted striped>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Player</Table.HeaderCell>
							<Table.HeaderCell>MMR</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						<Table.Row>
							<Table.Cell>
								<Header as="h4" image>
									<Image
										src="https://react.semantic-ui.com/images/avatar/small/lena.png"
										rounded
										size="mini"
									/>
									<Header.Content>Lena</Header.Content>
								</Header>
							</Table.Cell>
							<Table.Cell>22</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<Header as="h4" image>
									<Image
										src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
										rounded
										size="mini"
									/>
									<Header.Content>Matthew</Header.Content>
								</Header>
							</Table.Cell>
							<Table.Cell>15</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<Header as="h4" image>
									<Image
										src="https://react.semantic-ui.com/images/avatar/small/lindsay.png"
										rounded
										size="mini"
									/>
									<Header.Content>Lindsay</Header.Content>
								</Header>
							</Table.Cell>
							<Table.Cell>12</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<Header as="h4" image>
									<Image
										src="https://react.semantic-ui.com/images/avatar/small/mark.png"
										rounded
										size="mini"
									/>
									<Header.Content>Mark</Header.Content>
								</Header>
							</Table.Cell>
							<Table.Cell>11</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</Container>
		</Segment>
	);
}

export default LeaderBoard;
