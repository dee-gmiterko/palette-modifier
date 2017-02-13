/* eslint-env browser, jquery */

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
          <p className="button alert small expanded" onClick={() => $('#app-tabs').foundation('selectTab', 'select')}>Please, select image first</p>
        </div>
      );

    } else {

      var palette = this.props.palette.map(color => color.hex());

      return (
        <div className="row">
          <div className="small-12 large-8 columns">
            <div className="text-center" style={{background: '#aaa'}}>
              <img src={this.props.image} alt="Modified img" />
            </div>
          </div>
          <div className="small-12 large-4 columns">
            <div className="palette row collapse">
              {palette.map((color, i) => {
                return <div key={i} className="small-6 medium-4 large-2 columns">
                  <ColorPicker color={color} onChange={this.changePaletteColor.bind(this, i)} />
                </div>
              })}
            </div>
            <div className="tools padding-top">
              <RandomColorsButton changePaletteColors={this.props.changePaletteColors} />
              <select value={this.props.imageType} onChange={event => this.props.changeImageType(event.target.value)}>
                <option value="original">Orignal</option>
                <option value="preview">Image</option>
                <option value="debug">Debug</option>
              </select>
            </div>
          </div>
          <div className="small-12 columns">
            <div className="clearfix padding-top">
              <p className="float-left button small" onClick={() => $('#app-tabs').foundation('selectTab', 'select')}>Select other image</p>
              <p className="float-right button small" onClick={() => $('#app-tabs').foundation('selectTab', 'download')}>Download result</p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default TabModify;
