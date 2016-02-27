var React = require('react');
var ReactDOM = require('react-dom');
var SimpleCurrencyInput = require('react-simple-currency');


export default class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			raw: 0,
			display: ''
		}

		this.onMoneyInputChange = this.onMoneyInputChange.bind(this)
	}

	onMoneyInputChange(rawValue, displayValue) {
		this.setState({
			raw: rawValue,
			display: displayValue
		})

		// console.log(displayValue)
		// console.log(rawValue)
	}

	render () {
		return (
			<div>
				<form>
					<SimpleCurrencyInput
						value={this.state.raw}
						precision={2}
						separator=','
						delimiter='.'
						unit='R$'
						suffixUnit='R$'
						zeroCents
						onInputChange={this.onMoneyInputChange}
						/>
				</form>

				<p>Raw: {this.state.raw}</p>
				<p>Display: {this.state.display}</p>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
