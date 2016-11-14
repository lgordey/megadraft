/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

import {
  BlockActionGroup,
  BlockControls,
  BlockWrapper
} from "../../components/plugin";
import {
  DEFAULT_DISPLAY_OPTIONS,
  DEFAULT_DISPLAY_KEY
} from "../../components/plugin/defaults";


export default class CommonBlock extends Component {
  constructor(props) {
    super(props);

    this._handleDisplayChange = ::this._handleDisplayChange;
  }

  _handleDisplayChange(newValue) {
    this.props.container.updateData({display: newValue});
  }

  render(){
    const data = this.props.data;
    const defaults = {
      defaultDisplay: DEFAULT_DISPLAY_KEY,
      displayOptions: DEFAULT_DISPLAY_OPTIONS
    };
    let options = this.props.blockProps.plugin.options || {};
    options = {...defaults, ...options};

    return (
      <BlockWrapper>
        <BlockControls>
          <div className='block__label'>{data.label}</div>
          <BlockActionGroup items={this.props.actions} />
        </BlockControls>

        {this.props.children}
      </BlockWrapper>
    );
  }
}
