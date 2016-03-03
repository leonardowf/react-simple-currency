require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"react-simple-currency":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var SimpleCurrencyInput = (function (_React$Component) {
  _inherits(SimpleCurrencyInput, _React$Component);

  function SimpleCurrencyInput(props) {
    _classCallCheck(this, SimpleCurrencyInput);

    _get(Object.getPrototypeOf(SimpleCurrencyInput.prototype), 'constructor', this).call(this, props);

    this.onInputType = this.onInputType.bind(this);
    this.formattedRawValue = this.formattedRawValue.bind(this);
    this.getRawValue = this.getRawValue.bind(this);

    this.state = {
      rawValue: this.props.value
    };
  }

  _createClass(SimpleCurrencyInput, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.notifyParentWithRawValue(this.state.rawValue);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value || nextProps.value === 0) {
        this.setState({
          rawValue: nextProps.value
        });
      }
    }
  }, {
    key: 'onInputType',
    value: function onInputType(event) {
      var input = event.target.value;
      var rawValue = this.getRawValue(input);
      if (!rawValue) {
        rawValue = 0;
      }

      this.notifyParentWithRawValue(rawValue);

      this.setState({
        rawValue: rawValue
      });
    }
  }, {
    key: 'notifyParentWithRawValue',
    value: function notifyParentWithRawValue(rawValue) {
      var display = this.formattedRawValue(rawValue);
      this.props.onInputChange(rawValue, display);
    }
  }, {
    key: 'getRawValue',
    value: function getRawValue(displayedValue) {
      var result = displayedValue;

      result = removeOccurrences(result, this.props.delimiter);
      result = removeOccurrences(result, this.props.separator);
      result = removeOccurrences(result, this.props.unit);

      var intValue = parseInt(result);

      return intValue;
    }
  }, {
    key: 'formattedRawValue',
    value: function formattedRawValue(rawValue) {
      var minChars = '0'.length + this.props.precision;

      var result = '';
      result = '' + rawValue;

      if (result.length < minChars) {
        var leftZeroesToAdd = minChars - result.length;
        result = '' + repeatZeroes(leftZeroesToAdd) + result;
      }

      var beforeSeparator = result.slice(0, result.length - this.props.precision);
      var afterSeparator = result.slice(result.length - this.props.precision);

      if (beforeSeparator.length > 3) {
        var chars = beforeSeparator.split('').reverse();
        var withDots = '';
        for (var i = chars.length - 1; i >= 0; i--) {
          var char = chars[i];
          var dot = i % 3 === 0 ? this.props.delimiter : '';
          withDots = '' + withDots + char + dot;
        }
        withDots = withDots.substring(0, withDots.length - 1);
        beforeSeparator = withDots;
      }
      result = beforeSeparator + this.props.separator + afterSeparator;

      if (this.props.unit) {
        result = this.props.unit + ' ' + result;
      }

      return result;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('input', {
        onChange: this.onInputType,
        value: this.formattedRawValue(this.state.rawValue)
      });
    }
  }]);

  return SimpleCurrencyInput;
})(React.Component);

var repeatZeroes = function repeatZeroes(times) {
  var result = '';
  var i = 0;
  for (i = 0; i < times; i++) {
    result += '0';
  }

  return result;
};

var removeOccurrences = function removeOccurrences(from, toRemove) {
  toRemove = toRemove.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  var re = new RegExp(toRemove, 'g');
  return from.replace(re, '');
};

SimpleCurrencyInput.propTypes = {
  delimiter: React.PropTypes.string,
  onInputChange: React.PropTypes.func,
  precision: React.PropTypes.number,
  separator: React.PropTypes.string,
  unit: React.PropTypes.string,
  value: React.PropTypes.number.isRequired
};

SimpleCurrencyInput.defaultProps = {
  value: 0,
  precision: 2,
  separator: '.',
  delimiter: ',',
  unit: '',
  onInputChange: function onInputChange() {}
};

exports['default'] = SimpleCurrencyInput;
module.exports = exports['default'];

},{"react":undefined}]},{},[]);
