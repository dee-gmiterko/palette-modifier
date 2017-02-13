import React, { Component } from 'react';
import {make_color, make_scheme} from "pleasejs";
import chroma from 'chroma-js';

class RandomColorsButton extends Component {

  randomiseColors() {

    var scheme = [];

    while(scheme.length < 6) {
      scheme.push(make_color({
        format: 'hex',
        golden: false
      })[0]);
    }

    this.props.changePaletteColors(scheme.map(color => {return chroma(color) }));
  }

  render() {
    return <button className="button" onClick={this.randomiseColors.bind(this)}>Random</button>
  }
}

export default RandomColorsButton;
