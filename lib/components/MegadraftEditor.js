"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _draftJs = require("draft-js");

var _Toolbar = require("./Toolbar");

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Sidebar = require("./Sidebar");

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Media = require("./Media");

var _Media2 = _interopRequireDefault(_Media);

var _default = require("../plugins/default");

var _default2 = _interopRequireDefault(_default);

var _default3 = require("../actions/default");

var _default4 = _interopRequireDefault(_default3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MegadraftEditor = function (_Component) {
  _inherits(MegadraftEditor, _Component);

  function MegadraftEditor(props) {
    _classCallCheck(this, MegadraftEditor);

    var _this = _possibleConstructorReturn(this, (MegadraftEditor.__proto__ || Object.getPrototypeOf(MegadraftEditor)).call(this, props));

    _this.state = {
      readOnly: _this.props.readOnly || false
    };

    _this.onChange = _this.onChange.bind(_this);

    _this.mediaBlockRenderer = _this.mediaBlockRenderer.bind(_this);

    _this.handleKeyCommand = _this.handleKeyCommand.bind(_this);
    _this.handleReturn = _this.handleReturn.bind(_this);

    _this.setReadOnly = _this.setReadOnly.bind(_this);

    _this.externalKeyBindings = _this.externalKeyBindings.bind(_this);

    _this.actions = _this.props.actions || _default4.default;
    _this.plugins = _this.getValidPlugins();

    _this.config = _this.props.config || null;

    _this.pluginsByType = _this.getPluginsByType();

    _this.keyBindings = _this.props.keyBindings || [];

    return _this;
  }

  _createClass(MegadraftEditor, [{
    key: "getValidPlugins",
    value: function getValidPlugins() {
      var plugins = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (this.props.plugins || _default2.default)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var plugin = _step.value;

          if (!plugin || typeof plugin.type !== "string") {
            console.warn("Plugin: Missing `type` field. Details: ", plugin);
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
    key: "getPluginsByType",
    value: function getPluginsByType() {
      var pluginsByType = {};

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.plugins[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var plugin = _step2.value;

          pluginsByType[plugin.type] = plugin;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return pluginsByType;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.readOnly !== nextProps.readOnly) {
        this.setState({ readOnly: nextProps.readOnly });
      }
    }
  }, {
    key: "onChange",
    value: function onChange(editorState) {
      this.props.onChange(editorState);
    }
  }, {
    key: "externalKeyBindings",
    value: function externalKeyBindings(e) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.keyBindings[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var kb = _step3.value;

          if (kb.isKeyBound(e)) {
            return kb.name;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return (0, _draftJs.getDefaultKeyBinding)(e);
    }
  }, {
    key: "onTab",
    value: function onTab(event) {
      event.preventDefault();
    }
  }, {
    key: "handleKeyCommand",
    value: function handleKeyCommand(command) {
      // external key bindings
      if (this.keyBindings.length) {
        var extKb = this.keyBindings.find(function (kb) {
          return kb.name === command;
        });
        if (extKb) {
          extKb.action();
          return true;
        }
      }

      var editorState = this.props.editorState;

      var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.props.onChange(newState);
        return true;
      }
      return false;
    }
  }, {
    key: "handleReturn",
    value: function handleReturn(event) {
      if (!event.shiftKey) {
        return false;
      }

      var editorState = this.props.editorState;

      var newState = _draftJs.RichUtils.insertSoftNewline(editorState);
      this.props.onChange(newState);
      return true;
    }
  }, {
    key: "setReadOnly",
    value: function setReadOnly(readOnly) {
      this.setState({ readOnly: readOnly });
    }
  }, {
    key: "mediaBlockRenderer",
    value: function mediaBlockRenderer(block) {
      if (block.getType() !== "atomic") {
        return null;
      }

      var type = block.getData().toObject().type;

      var typedPlugin = this.pluginsByType[type];

      if (typedPlugin) {
        return {
          component: _Media2.default,
          editable: false,
          props: {
            config: this.props.config,
            plugin: typedPlugin,
            onChange: this.onChange,
            editorState: this.props.editorState,
            setReadOnly: this.setReadOnly
          }
        };
      }

      return null;
    }
  }, {
    key: "blockStyleFn",
    value: function blockStyleFn(contentBlock) {
      var type = contentBlock.getType();
      if (type === "unstyled") {
        return "paragraph";
      }
    }
  }, {
    key: "renderSidebar",
    value: function renderSidebar(props) {
      var sidebarRendererFn = this.props.sidebarRendererFn;

      if (typeof sidebarRendererFn === "function") {
        return sidebarRendererFn(props);
      }
      return _react2.default.createElement(_Sidebar2.default, props);
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          editorState = _props.editorState,
          stripPastedStyles = _props.stripPastedStyles,
          spellCheck = _props.spellCheck;

      var plugins = this.plugins;

      return _react2.default.createElement(
        "div",
        { className: "megadraft" },
        _react2.default.createElement(
          "div",
          {
            className: "megadraft-editor",
            id: "megadraft-editor",
            ref: "editor" },
          this.renderSidebar({
            plugins: plugins,
            editorState: editorState,
            readOnly: this.state.readOnly,
            onChange: this.onChange
          }),
          _react2.default.createElement(_draftJs.Editor, {
            readOnly: this.state.readOnly,
            plugins: plugins,
            blockRenderMap: this.props.blockRenderMap,
            blockRendererFn: this.mediaBlockRenderer,
            blockStyleFn: this.blockStyleFn,
            onTab: this.onTab,
            handleKeyCommand: this.handleKeyCommand,
            handleReturn: this.handleReturn,
            stripPastedStyles: stripPastedStyles,
            spellCheck: spellCheck,
            keyBindingFn: this.externalKeyBindings,
            editorState: editorState,
            placeholder: this.props.placeholder,
            onChange: this.onChange }),
          _react2.default.createElement(_Toolbar2.default, {
            editor: this.refs.editor,
            editorState: editorState,
            readOnly: this.state.readOnly,
            onChange: this.onChange,
            actions: this.actions })
        )
      );
    }
  }]);

  return MegadraftEditor;
}(_react.Component);

exports.default = MegadraftEditor;