"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _plugin = require("../../components/plugin");

var _defaults = require("../../components/plugin/defaults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var CommonBlock = function (_Component) {
  _inherits(CommonBlock, _Component);

  function CommonBlock(props) {
    _classCallCheck(this, CommonBlock);

    var _this = _possibleConstructorReturn(this, (CommonBlock.__proto__ || Object.getPrototypeOf(CommonBlock)).call(this, props));

    _this._handleDisplayChange = _this._handleDisplayChange.bind(_this);
    return _this;
  }

  _createClass(CommonBlock, [{
    key: "_handleDisplayChange",
    value: function _handleDisplayChange(newValue) {
      this.props.container.updateData({ display: newValue });
    }
  }, {
    key: "render",
    value: function render() {
      var data = this.props.data;
      var defaults = {
        defaultDisplay: _defaults.DEFAULT_DISPLAY_KEY,
        displayOptions: _defaults.DEFAULT_DISPLAY_OPTIONS
      };
      var options = this.props.blockProps.plugin.options || {};
      options = _extends({}, defaults, options);

      return _react2.default.createElement(
        _plugin.BlockWrapper,
        null,
        _react2.default.createElement(
          _plugin.BlockControls,
          null,
          _react2.default.createElement(
            "div",
            { className: "block__label" },
            data.label
          ),
          _react2.default.createElement(_plugin.BlockActionGroup, { items: this.props.actions })
        ),
        this.props.children
      );
    }
  }]);

  return CommonBlock;
}(_react.Component);

exports.default = CommonBlock;