/* eslint-env browser, jquery */

import React, { Component } from 'react';
import chroma from 'chroma-js';

import RandomColorsButton from './RandomColorsButton';
import Palette from './Palette';

class TabModify extends Component {

    changePaletteColor(index, color) {
        this.props.changePaletteColor(index, chroma(color.hex));
    }

    render() {
        if(!this.props.image) {

            return (
                <div>
                    <a className="button alert small expanded" onClick={() => $('#app-tabs').foundation('selectTab', 'select')}>Please, select image first</a>
                </div>
            );

        } else {

            var palette = this.props.palette.map(color => color.hex());

            return (
                <div className="row">
                    <div className="small-12 large-8 columns">
                        <div className="text-center" style={{background: '#aaa'}}>
                            <img src={this.props.image} alt="Preview" />
                        </div>
                    </div>
                    <div className="small-12 large-4 columns">
                        <h3>Settings</h3>
                        <div className="settings">
                            <label>
                                Click on colors to modify them
                                <Palette palette={palette} changePaletteColor={this.changePaletteColor.bind(this)} />
                            </label>
                            <label>
                                Modify palette
                                <div className="button-group">
                                    <RandomColorsButton palette={this.props.palette} changePaletteColors={this.props.changePaletteColors} />
                                    <button className="button" onClick={() => this.props.changePaletteColors(this.props.originalPalette)}>Reset</button>
                                </div>
                            </label>
                            <label>
                                Display
                                <select value={this.props.imageType} onChange={event => this.props.changeImageType(event.target.value)}>
                                    <option value="original">Orignal</option>
                                    <option value="preview">Preview</option>
                                    <option value="debug">Debug</option>
                                </select>
                            </label>
                            <a className="button success" onClick={() => $('#app-tabs').foundation('selectTab', 'download')}>Download result</a>
                        </div>
                    </div>
                    <div className="small-12 columns">
                        <footer className="clearfix padding-top text-center">
                            <a className="float-left button small" onClick={() => $('#app-tabs').foundation('selectTab', 'select')}>Select other image</a>
                            <a className="float-right button small" onClick={() => $('#app-tabs').foundation('selectTab', 'download')}>Download result</a>
                            By <a href="http://ienze.me" target="blank">ienze</a> | <a href="https://github.com/Linzee/palette-modifier" target="blank">contribute</a>
                        </footer>
                    </div>
                </div>
            );

        }
    }
}

export default TabModify;
