import React from 'react';
import chroma from 'chroma-js';

import RandomColorsButton from './RandomColorsButton';
import Palette from './Palette';

const TabModify = ({image, palette, originalPalette, imageType, changeImageType, changePaletteColor, changePaletteColors, selectTab}) => {
    if(!image) {

        return (
            <div>
                <a className="button alert small expanded" onClick={() => selectTab('select')}>Please, select image first</a>
            </div>
        );

    } else {

        return (
            <div className="row">
                <div className="small-12 large-8 columns">
                    <div className="text-center" style={{background: '#aaa'}}>
                        <img src={image} alt="Preview" />
                    </div>
                </div>
                <div className="small-12 large-4 columns">
                    <h3>Settings</h3>
                    <div className="settings">
                        <label>
                            Click on colors to modify them
                            <Palette palette={palette} changePaletteColor={(index, color) => changePaletteColor(index, chroma(color.hex))} />
                        </label>
                        <label>
                            Modify palette
                            <div className="button-group">
                                <RandomColorsButton palette={palette} changePaletteColors={changePaletteColors} />
                                <button className="button" onClick={() => changePaletteColors(originalPalette)}>Reset</button>
                            </div>
                        </label>
                        <label>
                            Display
                            <select value={imageType} onChange={event => changeImageType(event.target.value)}>
                                <option value="original">Orignal</option>
                                <option value="preview">Preview</option>
                                <option value="debug">Debug</option>
                            </select>
                        </label>
                        <a className="button success" onClick={() => selectTab('download')}>Download result</a>
                    </div>
                </div>
                <div className="small-12 columns">
                    <footer className="clearfix padding-top text-center">
                        <a className="float-left button small" onClick={() => selectTab('select')}>Select other image</a>
                        <a className="float-right button small" onClick={() => selectTab('download')}>Download result</a>
                        By <a href="http://ienze.me" target="blank">ienze</a> | <a href="https://github.com/dee-gmiterko/palette-modifier" target="blank">contribute</a>
                    </footer>
                </div>
            </div>
        );
    }
}

export default TabModify;
