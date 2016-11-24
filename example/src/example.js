var React = require('react')
var ReactDOM = require('react-dom')
var SimpleCurrencyInput = require('react-simple-currency')

export default class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			raw: 0,
			display: ''
		}

		this.onMoneyInputChange = this.onMoneyInputChange.bind(this)
		this.setNewValue = this.setNewValue.bind(this)
	}

	onMoneyInputChange(rawValue, displayValue) {
		this.setState({
			raw: rawValue,
			display: displayValue
		})
	}

	setNewValue() {
		this.setState({
			raw: 1000
		})
	}

	render () {
		return (
			<div>
				<form>
					<SimpleCurrencyInput
						className='my-input-class'
						value={this.state.raw}
						precision={2}
						separator=','
						delimiter='.'
						unit='R$'
						onInputChange={this.onMoneyInputChange}
					/>
				</form>

				<p>Raw: {this.state.raw}</p>
				<p>Display: {this.state.display}</p>

				<button onClick={this.setNewValue}></button>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))
