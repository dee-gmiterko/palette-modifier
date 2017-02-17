import React, { Component } from 'react';
import getColors from 'get-image-colors';
import PaletteModifier from '../paletteModifier';

import TabSelect from './TabSelect';
import TabModify from './TabModify';
import TabDownload from './TabDownload';

class App extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            originalFile: null,
            originalImage: null,
            imageType: "preview",
            image: null,
            originalPalette: null,
            palette: null,
            settings: {
                paletteBlur: 15
            }
        };

        window.App = this;
    }

    changeImage(file) {

        if(file === this.state.originalFile) {
            return;
        }

        var image = file.preview;

        getColors(image).then(palette => {

            var modifier = new PaletteModifier(image, palette);
            modifier.init(() => {this.updateImage(palette)});

            this.setState({
                originalFile: file,
                originalImage: image,
                image: image,
                originalPalette: palette,
                palette: palette,
                modifier: modifier
            });
        });
    }

    changePaletteColor(index, color) {
        var palette = this.state.palette.slice();
        palette[index] = color;
        this.setState({
            palette: palette
        });

        this.updateImage(palette);
    }

    changePaletteColors(palette) {
        this.setState({
            palette: palette
        });

        this.updateImage(palette);
    }

    updateImage(palette) {
        this.state.modifier.modify(palette, this.state.settings);
        this.setState({
            image: this.state.modifier.getImage(this.state.imageType)
        });
    }

    changeImageType(type) {
        this.setState({
            imageType: type,
            image: this.state.modifier.getImage(type)
        });
    }

    render() {
        return (
            <div className="row" id="palette-modifier">
                <ul className="tabs" data-tabs id="app-tabs">
                    <li className="tabs-title is-active"><a href="#select" aria-selected="true">1. Select image</a></li>
                    <li className="tabs-title"><a href="#modify">2. Modify</a></li>
                    <li className="tabs-title"><a href="#download">3. Download</a></li>
                </ul>
                <div className="tabs-content" data-tabs-content="app-tabs">
                    <div className="tabs-panel is-active" id="select">
                        <TabSelect image={this.state.originalImage} changeImage={this.changeImage.bind(this)} />
                    </div>
                    <div className="tabs-panel" id="modify">
                        <TabModify image={this.state.image} palette={this.state.palette} originalPalette={this.state.originalPalette} changePaletteColor={this.changePaletteColor.bind(this)} changePaletteColors={this.changePaletteColors.bind(this)} imageType={this.state.imageType} changeImageType={this.changeImageType.bind(this)} />
                    </div>
                    <div className="tabs-panel" id="download">
                        <TabDownload image={this.state.image} originalImage={this.state.originalImage} palette={this.state.palette} getImageBlob={this.state.modifier ? this.state.modifier.getFullImageBlob.bind(this.state.modifier, this.state.palette, this.state.settings) : null} />
                    </div>
                </div>
            </div>
            );
    }
}

export default App;
