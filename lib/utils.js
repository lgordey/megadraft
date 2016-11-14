"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editorStateToJSON = editorStateToJSON;
exports.editorStateFromRaw = editorStateFromRaw;
exports.getSelectedBlockElement = getSelectedBlockElement;
exports.getSelectionCoords = getSelectionCoords;

var _draftJs = require("draft-js");

var _decorator = require("./decorator");

var _decorator2 = _interopRequireDefault(_decorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, Andrew Coelho <info@andrewcoelho.com>
 *
 * License: MIT
 */

function editorStateToJSON(editorState) {
  if (editorState) {
    var content = editorState.getCurrentContent();
    return JSON.stringify((0, _draftJs.convertToRaw)(content), null, 2);
  }
}

function editorStateFromRaw(rawContent) {
  if (rawContent) {
    var content = (0, _draftJs.convertFromRaw)(rawContent);
    return _draftJs.EditorState.createWithContent(content, _decorator2.default);
  } else {
    return _draftJs.EditorState.createEmpty(_decorator2.default);
  }
}

function getSelectedBlockElement(range) {
  var node = range.startContainer;
  do {
    var nodeIsDataBlock = node.getAttribute ? node.getAttribute("data-block") : null;
    if (nodeIsDataBlock) {
      return node;
    }
    node = node.parentNode;
  } while (node !== null);
  return null;
}

function getSelectionCoords(editor, toolbar) {
  var editorBounds = editor.getBoundingClientRect();
  var rangeBounds = (0, _draftJs.getVisibleSelectionRect)(window);

  if (!rangeBounds || !toolbar) {
    return null;
  }

  var rangeWidth = rangeBounds.right - rangeBounds.left;

  var toolbarHeight = toolbar.offsetHeight;
  // const rangeHeight = rangeBounds.bottom - rangeBounds.top;
  var offsetLeft = rangeBounds.left - editorBounds.left + rangeWidth / 2;
  var offsetTop = rangeBounds.top - editorBounds.top - (toolbarHeight + 14);
  return { offsetLeft: offsetLeft, offsetTop: offsetTop };
}