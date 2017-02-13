import React, { Component } from 'react';
import {make_color, make_scheme} from "pleasejs";
import chroma from 'chroma-js';

class RandomColorsButton extends Component {

  randomiseColors() {

    var scheme = make_scheme(make_color({'format': 'hsv', 'golden': false})[0],
    {
      scheme_type: 'mono',
      format: 'hex'
    }).slice(0, 6);

    while(scheme.length < 6) {
      scheme.push(make_color({
        format: 'hex'
      })[0]);
    }

    this.props.changePaletteColors(scheme.map(color => {return chroma(color) }));
  }

  render() {
    return <button onClick={this.randomiseColors.bind(this)}>Random</button>
  }
}

export default RandomColorsButton;
