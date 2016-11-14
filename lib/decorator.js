"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require("draft-js");

var _Link = require("./components/Link");

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && _draftJs.Entity.get(entityKey).getType() === "LINK";
  }, callback);
}

var decorator = new _draftJs.CompositeDecorator([{
  strategy: findLinkEntities,
  component: _Link2.default
}]);

exports.default = decorator;