import React, { Component } from 'react';
import chroma from 'chroma-js';

import ColorPicker from './ColorPicker';
import RandomColorsButton from './RandomColorsButton';

class TabModify extends Component {

  changePaletteColor(index, color) {
    this.props.changePaletteColor(index, chroma(color.hex));
  }

  render() {
    if(!this.props.image) {
      return (
        <div>
          <h2>Please, select image first</h2>
        </div>
      );
    } else {

      var palette = this.props.palette.map(color => color.hex());

      return (
        <div>
          <div className="row" class="mainImage">
            <img src={this.props.image} alt="Linda after" />
          </div>
          <div className="row">
            {palette.map((color, i) => {
              return <div key={i} className="small-6 medium-4 large-2 columns">
                <ColorPicker color={color} onChange={this.changePaletteColor.bind(this, i)} />
              </div>
            })}
          </div>
          <div className="row">
            <RandomColorsButton changePaletteColors={this.props.changePaletteColors} />
          </div>
        </div>
      );
    }
  }
}

export default TabModify;
