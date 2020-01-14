import React from 'react'
import {
	Container,
	Row,
	Col,
	Button
} from 'react-bootstrap'

import CardDeck from '../CardDeck/CardDeck'
import Display from '../Display/Display'

import { PEOPLE_TYPE } from '../../service/constants'
import api from '../../service'

import './GameTable.scss'

class GameTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			playerA: {
				name: 'playerA',
				score: 0,
				resource: null
			},
			playerB: {
				name: 'playerB',
				score: 0,
				resource: null
			},
			matchWinner: '',
			gameType: PEOPLE_TYPE,
			gameStatus: 'retrieving'
		}

		this.updateResource = this.updateResource.bind(this)
		this.computeFight = this.computeFight.bind(this)
		this.resetGame = this.resetGame.bind(this)
	}

	updateResource(playerName, e) {
		return api.getRandomResource(this.state.gameType)
			.then(resource => {
				const player = {...this.state[playerName]}
				player.resource = resource
				if (this.state.playerA.resource || this.state.playerB.resource) {
					this.setState({[playerName]: player, gameStatus: 'ready'})
					return
				}
				this.setState({[playerName]: player})
			})
	}

	resetGame(gameType, resetScore, e) {
		const playerA = {...this.state.playerA}
		const playerB = {...this.state.playerB}
		playerA.resource = null
		playerB.resource = null
		if (resetScore) {
			playerA.score = 0
			playerB.score = 0
		}
		const newGameType = gameType ? gameType : this.state.gameType

		this.setState({
			gameType: newGameType,
			gameStatus: 'retrieving',
			matchWinner: '',
			playerA,
			playerB
		})
	}

	computeFight(e) {
		const gameType = this.state.gameType
		const resourceA = this.state.playerA.resource
		const resourceB = this.state.playerB.resource
		const discriminator = gameType === PEOPLE_TYPE ? 'mass' : 'crew'
		let matchWinner = ''

		// if one of the card is Unknown players have 50% chance of winning
		if (resourceA.name === 'Unknown' || resourceB.name === 'Unknown') {
			matchWinner = Math.random() < 0.5 ? 'playerA' : 'playerB'
		}

		// if one of the discriminator is unknown ore they are both equals
		// players have 50% chance of winning.
		// Otherwise it wins the player who has higher discriminator (mass or crew)
		if (isNaN(resourceA[discriminator])
				|| isNaN(resourceB[discriminator])
				|| (resourceA[discriminator] === resourceB[discriminator])) {
			matchWinner = Math.random() < 0.5 ? 'playerA' : 'playerB'
		} else {
			const discriminatorA = parseInt(resourceA[discriminator])
			const discriminatorB = parseInt(resourceB[discriminator])
			matchWinner = discriminatorA > discriminatorB ? 'playerA' : 'playerB'
		}

		const player = {...this.state[matchWinner]}
		player.score = ++player.score

		this.setState({
			matchWinner,
			gameStatus: 'endmatch',
			[matchWinner]: player
		})
	}

	render() {
		return (
			<Container className="GameTable justify-content-md-center">
				<Display
					scoreA={this.state.playerA.score}
					scoreB={this.state.playerB.score}
					gameType={this.state.gameType}
					resetGame={this.resetGame}
				/>
				<Row>
					<Col xs={4}>
						<CardDeck
							playerName={this.state.playerA.name}
							resource={this.state.playerA.resource}
							updateResource={this.updateResource}
							gameType={this.state.gameType}
							isWinner={this.state.matchWinner === 'playerA'}
						/>
					</Col>
					<Col xs={4} className="action-buttons">
						{this.state.gameStatus === 'endmatch' ?
							<Button variant="success"
								className="again-button"
								onClick={(e) => this.resetGame(null, false, e)}>
								Again
							</Button>
							:
							<Button variant="danger"
								className="fight-button"
								onClick={this.computeFight}
								disabled={this.state.gameStatus === 'retrieving'}>
								Fight
							</Button>
						}
	
					</Col>
					<Col xs={4}>
						<CardDeck
							playerName={this.state.playerB.name}
							resource={this.state.playerB.resource}
							updateResource={this.updateResource}
							gameType={this.state.gameType}
							isWinner={this.state.matchWinner === 'playerB'}
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default GameTable