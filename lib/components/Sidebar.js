"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SideMenu = exports.ToggleButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _icons = require("../icons");

var _icons2 = _interopRequireDefault(_icons);

require("setimmediate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var BlockStyles = function (_Component) {
  _inherits(BlockStyles, _Component);

  function BlockStyles(props) {
    _classCallCheck(this, BlockStyles);

    var _this = _possibleConstructorReturn(this, (BlockStyles.__proto__ || Object.getPrototypeOf(BlockStyles)).call(this, props));

    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(BlockStyles, [{
    key: "onChange",
    value: function onChange(editorState) {
      this.props.onChange(editorState);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var className = (0, _classnames2.default)("sidemenu__items", {
        "sidemenu__items--open": this.props.open
      });

      return _react2.default.createElement(
        "ul",
        { className: className },
        this.props.plugins.map(function (item) {
          var Button = item.buttonComponent;
          return _react2.default.createElement(
            "li",
            { key: item.type, className: "sidemenu__item" },
            _react2.default.createElement(Button, {
              className: "sidemenu__button",
              editorState: _this2.props.editorState,
              onChange: _this2.onChange })
          );
        })
      );
    }
  }]);

  return BlockStyles;
}(_react.Component);

var ToggleButton = exports.ToggleButton = function (_Component2) {
  _inherits(ToggleButton, _Component2);

  function ToggleButton() {
    _classCallCheck(this, ToggleButton);

    return _possibleConstructorReturn(this, (ToggleButton.__proto__ || Object.getPrototypeOf(ToggleButton)).apply(this, arguments));
  }

  _createClass(ToggleButton, [{
    key: "render",
    value: function render() {
      var Icon = _icons2.default.CrossIcon;

      var className = (0, _classnames2.default)("sidemenu__button", {
        "sidemenu__button--open": this.props.open
      });

      return _react2.default.createElement(
        "button",
        { type: "button", className: className, onClick: this.props.toggle },
        _react2.default.createElement(Icon, { className: "sidemenu__button__icon" })
      );
    }
  }]);

  return ToggleButton;
}(_react.Component);

var SideMenu = exports.SideMenu = function (_Component3) {
  _inherits(SideMenu, _Component3);

  function SideMenu(props) {
    _classCallCheck(this, SideMenu);

    var _this4 = _possibleConstructorReturn(this, (SideMenu.__proto__ || Object.getPrototypeOf(SideMenu)).call(this, props));

    _this4.state = {
      open: false
    };
    _this4.toggle = _this4.toggle.bind(_this4);
    _this4.onChange = _this4.onChange.bind(_this4);
    return _this4;
  }

  _createClass(SideMenu, [{
    key: "onChange",
    value: function onChange(editorState) {
      this.props.onChange(editorState);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.setState({
        open: !this.state.open
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "li",
        { className: "sidemenu" },
        _react2.default.createElement(ToggleButton, {
          toggle: this.toggle,
          open: this.state.open }),
        _react2.default.createElement(BlockStyles, {
          editorState: this.props.editorState,
          plugins: this.props.plugins,
          open: this.state.open,
          onChange: this.onChange })
      );
    }
  }]);

  return SideMenu;
}(_react.Component);

function getSelectedBlockElement() {
  // Finds the block parent of the current selection
  // https://github.com/facebook/draft-js/issues/45
  var selection = window.getSelection();
  if (selection.rangeCount === 0) {
    return null;
  }
  var node = selection.getRangeAt(0).startContainer;

  do {
    if (node.getAttribute && node.getAttribute("data-block") == "true") {
      return node;
    }
    node = node.parentNode;
  } while (node != null);
}

var SideBar = function (_Component4) {
  _inherits(SideBar, _Component4);

  function SideBar(props) {
    _classCallCheck(this, SideBar);

    var _this5 = _possibleConstructorReturn(this, (SideBar.__proto__ || Object.getPrototypeOf(SideBar)).call(this, props));

    _this5.state = { top: 0 };
    _this5.onChange = _this5.onChange.bind(_this5);
    return _this5;
  }

  _createClass(SideBar, [{
    key: "getValidSidebarPlugins",
    value: function getValidSidebarPlugins() {
      var plugins = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var plugin = _step.value;

          if (!plugin.buttonComponent || typeof plugin.buttonComponent !== "function") {
            continue;
          }
          plugins.push(plugin);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return plugins;
    }
  }, {
    key: "onChange",
    value: function onChange(editorState) {
      this.props.onChange(editorState);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this6 = this;

      if (this.updatingPosition) {
        clearImmediate(this.updatingPosition);
      }
      this.updatingPosition = null;
      this.updatingPosition = setImmediate(function () {
        return _this6.setBarPosition();
      });
    }
  }, {
    key: "setBarPosition",
    value: function setBarPosition() {
      var container = _reactDom2.default.findDOMNode(this.refs.container);

      var element = getSelectedBlockElement();

      if (!element || !container) {
        return;
      }

      var containerTop = container.getBoundingClientRect().top - document.documentElement.clientTop;
      var top = element.getBoundingClientRect().top - 4 - containerTop;
      top = Math.max(0, Math.floor(top));

      if (this.state.top !== top) {
        this.setState({
          top: top
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.readOnly) {
        return null;
      }
      return _react2.default.createElement(
        "div",
        { ref: "container", className: "sidebar" },
        _react2.default.createElement(
          "div",
          { style: { top: this.state.top + "px" }, className: "sidebar__menu" },
          _react2.default.createElement(
            "ul",
            { className: "sidebar__sidemenu-wrapper" },
            _react2.default.createElement(SideMenu, {
              editorState: this.props.editorState,
              onChange: this.onChange,
              plugins: this.getValidSidebarPlugins() })
          )
        )
      );
    }
  }]);

  return SideBar;
}(_react.Component);

exports.default = SideBar;