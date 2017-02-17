import React, { Component } from 'react';
import chroma from 'chroma-js';

class RandomColorsButton extends Component {

    randomiseColors() {

        var palette = this.props.palette.slice();

        for(var j=0; j<10; j++) {
            var color = chroma.random();

            var smallest_s = 999999999;
            var smallest_i = undefined;
            // eslint-disable-next-line no-loop-func
            palette.forEach((c, i) => {
                var s = color.luminance() - c.luminance();
                s += color.get('hsl.s') - color.get('hsl.s');
                s += color.get('hsl.l') - color.get('hsl.l');
                s += color.temperature() / 20000 - c.temperature() / 20000;
                if(s < smallest_s) {
                    smallest_s = s;
                    smallest_i = i;
                }
            });

            palette[smallest_i] = color;
        }

        this.props.changePaletteColors(palette);
    }

    render() {
        return <button className="button" onClick={this.randomiseColors.bind(this)}>Random</button>
    }
}

export default RandomColorsButton;
