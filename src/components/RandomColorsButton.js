import React, { Component } from 'react';
import chroma from 'chroma-js';

const RandomColorsButton = ({ palette, changePaletteColors, }) => {

    const randomiseColors = () => {
        const paletteCopy = palette.slice();

        for(var j=0; j<10; j++) {
            var color = chroma.random();

            var smallest_s = 999999999;
            var smallest_i = undefined;
            // eslint-disable-next-line no-loop-func
            paletteCopy.forEach((c, i) => {
                var s = color.luminance() - c.luminance();
                s += color.get('hsl.s') - color.get('hsl.s');
                s += color.get('hsl.l') - color.get('hsl.l');
                s += color.temperature() / 20000 - c.temperature() / 20000;
                if(s < smallest_s) {
                    smallest_s = s;
                    smallest_i = i;
                }
            });

            paletteCopy[smallest_i] = color;
        }

        changePaletteColors(paletteCopy);
    }

    return <button className="button" onClick={randomiseColors}>Random</button>
}

export default RandomColorsButton;
