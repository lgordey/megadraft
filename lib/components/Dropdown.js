"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /*
                    * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                    *
                    * License: MIT
                    */

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _DropdownItem = require("./DropdownItem");

var _DropdownItem2 = _interopRequireDefault(_DropdownItem);

var _icons = require("../icons");

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = (_temp = _class = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this.state = {
      isOpen: false
    };
    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
    _this.toggleDropDown = _this.toggleDropDown.bind(_this);
    _this.preventSelection = _this.preventSelection.bind(_this);
    _this.renderItem = _this.renderItem.bind(_this);
    return _this;
  }

  _createClass(Dropdown, [{
    key: "isEmpty",
    value: function isEmpty() {
      var items = this.props.items || [];
      return items.length == 0 ? true : false;
    }
  }, {
    key: "onChange",
    value: function onChange(selected) {
      this.props.onChange(selected);
    }
  }, {
    key: "renderItem",
    value: function renderItem(item) {
      var _this2 = this;

      return _react2.default.createElement(
        "li",
        { key: item.key },
        _react2.default.createElement(_DropdownItem2.default, { item: item,
          className: "dropdown__option",
          onClick: function onClick() {
            return _this2.onChange(item.key);
          } })
      );
    }
  }, {
    key: "preventSelection",
    value: function preventSelection(event) {
      event.preventDefault();
    }
  }, {
    key: "toggleDropDown",
    value: function toggleDropDown(event) {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }, {
    key: "handleDocumentClick",
    value: function handleDocumentClick(event) {
      if (this.isEmpty()) {
        return null;
      }
      if (!_reactDom2.default.findDOMNode(this).contains(event.target)) {
        this.setState({ isOpen: false });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener("click", this.handleDocumentClick, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("click", this.handleDocumentClick, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.isEmpty()) {
        return null;
      }

      var selectedItem = this.props.items.filter(function (obj) {
        return obj.key === _this3.props.selected;
      })[0];

      var isOpen = this.state.isOpen;


      var wrapperClassName = (0, _classnames2.default)("dropdown__wrapper", {
        "dropdown__wrapper--open": isOpen
      });

      var dropdownClassName = (0, _classnames2.default)("dropdown", {
        "dropdown--open": isOpen
      });

      var arrowClassName = (0, _classnames2.default)("dropdown__arrow", {
        "dropdown__arrow--open": isOpen
      });

      return _react2.default.createElement(
        "div",
        { className: wrapperClassName, onClick: this.toggleDropDown },
        _react2.default.createElement(
          _DropdownItem2.default,
          {
            item: selectedItem,
            className: "dropdown__item--selected",
            onMouseDown: this.preventSelection },
          _react2.default.createElement(_icons2.default.DropdownArrow, { className: arrowClassName })
        ),
        _react2.default.createElement(
          "ul",
          { className: dropdownClassName },
          this.props.items.map(this.renderItem)
        )
      );
    }
  }]);

  return Dropdown;
}(_react.Component), _class.propTypes = {
  items: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    key: _react.PropTypes.string.isRequired,
    icon: _react.PropTypes.func.isRequired,
    label: _react.PropTypes.string.isRequired
  })),
  selected: _react.PropTypes.string,
  onChange: _react.PropTypes.func.isRequired
}, _temp);
exports.default = Dropdown;