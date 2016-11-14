"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _draftJs = require("draft-js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var LinkInput = function (_Component) {
  _inherits(LinkInput, _Component);

  function LinkInput(props) {
    _classCallCheck(this, LinkInput);

    var _this = _possibleConstructorReturn(this, (LinkInput.__proto__ || Object.getPrototypeOf(LinkInput)).call(this, props));

    _this.state = {
      link: ""
    };
    _this.onLinkChange = _this.onLinkChange.bind(_this);
    _this.onLinkKeyDown = _this.onLinkKeyDown.bind(_this);
    return _this;
  }

  _createClass(LinkInput, [{
    key: "setLink",
    value: function setLink() {
      var link = this.state.link;
      var editorState = this.props.editorState;

      if (!link.startsWith("http://") && !link.startsWith("https://")) {
        link = "http://" + link;
      }
      var entityKey = _draftJs.Entity.create("LINK", "MUTABLE", { url: link });
      var newState = _draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
      newState = _draftJs.EditorState.forceSelection(newState, this.props.editorState.getSelection());
      this.props.onChange(newState);
    }
  }, {
    key: "onLinkChange",
    value: function onLinkChange(event) {
      event.stopPropagation();
      this.setState({ link: event.target.value });
    }
  }, {
    key: "onLinkKeyDown",
    value: function onLinkKeyDown(event) {
      if (event.key == "Enter") {
        event.preventDefault();
        this.setLink();
        this.props.cancelLink();
        this.setState({
          show: false,
          link: ""
        });
        this.props.editor.focus();
      } else if (event.key == "Escape") {
        event.preventDefault();
        _reactDom2.default.findDOMNode(this.props.editor.focus());
        this.props.cancelLink();
        this.setState({
          link: ""
        });
        this.props.onChange(_draftJs.EditorState.forceSelection(this.props.editorState, this.props.editorState.getSelection()));
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.editingLink && !prevProps.editingLink) {
        this.refs.textInput.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement("input", {
        className: "toolbar__input",
        ref: "textInput",
        type: "text",
        onChange: this.onLinkChange,
        value: this.state.link,
        onKeyDown: this.onLinkKeyDown,
        placeholder: "Type the link and press enter" });
    }
  }]);

  return LinkInput;
}(_react.Component);

exports.default = LinkInput;