"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _draftJs = require("draft-js");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _LinkInput = require("./LinkInput");

var _LinkInput2 = _interopRequireDefault(_LinkInput);

var _ToolbarItem = require("./ToolbarItem");

var _ToolbarItem2 = _interopRequireDefault(_ToolbarItem);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Toolbar = function (_Component) {
  _inherits(Toolbar, _Component);

  function Toolbar(props) {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));

    _this.state = {
      show: false,
      editingLink: false,
      link: ""
    };
    _this.renderButton = _this.renderButton.bind(_this);
    _this.cancelLink = _this.cancelLink.bind(_this);
    return _this;
  }

  _createClass(Toolbar, [{
    key: "toggleInlineStyle",
    value: function toggleInlineStyle(inlineStyle) {
      var newEditorState = _draftJs.RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle);
      this.props.onChange(newEditorState);
    }
  }, {
    key: "toggleBlockStyle",
    value: function toggleBlockStyle(blockType) {
      this.props.onChange(_draftJs.RichUtils.toggleBlockType(this.props.editorState, blockType));
    }
  }, {
    key: "toggleLink",
    value: function toggleLink() {
      if (this.hasLink()) {
        this.unlink();
      } else {
        this.setState({ editingLink: true });
      }
    }
  }, {
    key: "renderButton",
    value: function renderButton(item, position) {
      var _this2 = this;

      var current = null;
      var toggle = null;
      var active = null;
      var key = item.label;

      switch (item.type) {
        case "inline":
          {
            current = this.props.editorState.getCurrentInlineStyle();
            toggle = function toggle() {
              return _this2.toggleInlineStyle(item.style);
            };
            active = current.has(item.style);
            break;
          }
        case "block":
          {
            var selection = this.props.editorState.getSelection();
            current = this.props.editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
            toggle = function toggle() {
              return _this2.toggleBlockStyle(item.style);
            };
            active = item.style === current;
            break;
          }
        case "separator":
          {
            key = "sep-" + position;
            break;
          }
        case "entity":
          {
            toggle = function toggle() {
              return _this2.toggleLink();
            };
            active = this.hasLink();
            break;
          }
      }

      return _react2.default.createElement(_ToolbarItem2.default, { key: key, active: active, toggle: toggle, item: item });
    }
  }, {
    key: "setBarPosition",
    value: function setBarPosition() {
      var editor = this.props.editor;
      var toolbar = this.refs.toolbar;
      var selectionCoords = (0, _utils.getSelectionCoords)(editor, toolbar);

      if (!selectionCoords) {
        return null;
      }

      if (selectionCoords && !this.state.position || this.state.position.top !== selectionCoords.offsetTop || this.state.position.left !== selectionCoords.offsetLeft) {
        this.setState({
          show: true,
          position: {
            top: selectionCoords.offsetTop,
            left: selectionCoords.offsetLeft
          }
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this.props.editorState.getSelection().isCollapsed()) {
        return this.setBarPosition();
      } else {
        if (this.state.show) {
          this.setState({
            show: false,
            editingLink: false,
            link: ""
          });
        }
      }
    }
  }, {
    key: "hasLink",
    value: function hasLink() {
      var selection = this.props.editorState.getSelection();
      var anchorKey = selection.getAnchorKey();
      var contentState = this.props.editorState.getCurrentContent();
      var anchorBlock = contentState.getBlockForKey(anchorKey);
      var offset = selection.anchorOffset;
      var index = selection.isBackward ? offset - 1 : offset;
      var entityKey = anchorBlock.getEntityAt(index);
      if (entityKey !== null) {
        var entity = _draftJs.Entity.get(entityKey);
        if (entity.getType() === "LINK") {
          return true;
        }
      }
      return false;
    }
  }, {
    key: "unlink",
    value: function unlink() {
      var editorState = this.props.editorState;

      var selection = editorState.getSelection();
      if (!selection.isCollapsed()) {
        this.props.onChange(_draftJs.RichUtils.toggleLink(editorState, selection, null));
      }
    }
  }, {
    key: "cancelLink",
    value: function cancelLink() {
      this.setState({
        editingLink: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.readOnly) {
        return null;
      }
      var toolbarClass = (0, _classnames2.default)("toolbar", {
        "toolbar--open": this.state.show,
        "toolbar--editing-link": this.state.editingLink
      });

      return _react2.default.createElement(
        "div",
        { className: toolbarClass,
          style: this.state.position,
          ref: "toolbarWrapper" },
        _react2.default.createElement(
          "div",
          { className: "toolbar__wrapper", ref: "toolbar" },
          _react2.default.createElement(
            "ul",
            { className: "toolbar__list", onMouseDown: function onMouseDown(x) {
                x.preventDefault();
              } },
            this.props.actions.map(this.renderButton)
          ),
          _react2.default.createElement(_LinkInput2.default, {
            ref: "textInput",
            editorState: this.props.editorState,
            onChange: this.props.onChange,
            editingLink: this.state.editingLink,
            editor: this.props.editor,
            cancelLink: this.cancelLink }),
          _react2.default.createElement("span", { className: "toolbar__arrow" })
        )
      );
    }
  }]);

  return Toolbar;
}(_react.Component);

exports.default = Toolbar;