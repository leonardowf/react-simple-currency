var React = require('react')

class SimpleCurrencyInput extends React.Component {
  constructor(props) {
    super(props)

    this.onInputType = this.onInputType.bind(this)
    this.formattedRawValue = this.formattedRawValue.bind(this)
    this.getRawValue = this.getRawValue.bind(this)

    this.state = {
      rawValue: this.props.value
    }
  }

  componentWillMount() {
      this.notifyParentWithRawValue(this.state.rawValue)
  }

  componentWillReceiveProps (nextProps) {
    console.log('SimpleCurrencyInput')
    console.log(nextProps)

    if (nextProps.value) {
      this.setState({
        rawValue: nextProps.value
      })
    }
  }

  onInputType (event) {
    console.log('SimpleCurrencyInput')
    console.log('onInputType')

    const input = event.target.value
    let rawValue = this.getRawValue(input)
    if (!rawValue) {
      rawValue = 0
    }

    this.notifyParentWithRawValue(rawValue)

    this.setState({
      rawValue
    })
  }

  notifyParentWithRawValue (rawValue) {
    let display = this.formattedRawValue(rawValue)
    this.props.onInputChange(rawValue, display)
  }

  getRawValue (displayedValue) {
    let result = displayedValue

    result = removeOccurrences(result, this.props.delimiter)
    result = removeOccurrences(result, this.props.separator)
    result = removeOccurrences(result, this.props.unit)

    let intValue = parseInt(result)

    return intValue
  }

  formattedRawValue (rawValue) {
    const minChars = '00'.length + this.props.precision

    let result = ''
    result = `${rawValue}`

    if (result.length < minChars) {
      const leftZeroesToAdd = minChars - result.length
      result = `${repeatZeroes(leftZeroesToAdd)}${result}`
    }

    let beforeSeparator = result.slice(0, result.length - this.props.precision)
    let afterSeparator = result.slice(result.length - this.props.precision)

    if (beforeSeparator.length > 3) {
      var chars = beforeSeparator.split('').reverse()
      let withDots = ''
      for (var i = chars.length -1; i >= 0; i--) {
        let char = chars[i]
        let dot = i % 3 === 0 ? this.props.delimiter : ''
        withDots = `${withDots}${char}${dot}`
      }
      withDots = withDots.substring(0, withDots.length - 1)
      beforeSeparator = withDots
    }
    result = beforeSeparator + this.props.separator + afterSeparator

    if (this.props.unit) {
      result = `${this.props.unit} ${result}`
    }

    return result
  }

  render() {
    return (
      <input
        onChange={this.onInputType}
        value={this.formattedRawValue(this.state.rawValue)}
      />
    )
  }
}

const repeatZeroes = (times) => {
  let result = ''
  let i = 0
  for (i = 0; i < times; i++) {
    result += '0'
  }

  return result
}

const removeOccurrences = (from, toRemove) => {
  toRemove = toRemove.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
  var re = new RegExp(toRemove, 'g')
  return from.replace(re, '')
}

SimpleCurrencyInput.propTypes = {
  delimiter: React.PropTypes.string,
  onInputChange: React.PropTypes.func,
  precision: React.PropTypes.number,
  separator: React.PropTypes.string,
  unit: React.PropTypes.string,
  value: React.PropTypes.number.isRequired
}

SimpleCurrencyInput.defaultProps = {
  value: 0,
  precision: 2,
  separator: '.',
  delimiter: ',',
  unit: '',
  onInputChange: () => {}
}

export default SimpleCurrencyInput
