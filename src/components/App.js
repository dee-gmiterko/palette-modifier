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
      image: null,
      originalPalette: null,
      palette: null
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
      modifier.init();

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

    console.log("changePaletteColor");

    var palette = this.state.palette.slice();
    palette[index] = color;
    this.setState({
      palette: palette
    });

    this.updateImage();
  }

  changePaletteColors(palette) {
    this.setState({
      palette: palette
    });

    this.updateImage();
  }

  updateImage() {
    var image, debugImage;
    [image, debugImage] = this.state.modifier.modify(this.state.palette);
    this.setState({
      image: image,
      debugImage: debugImage
    });
  }

  render() {
    return (
      <div className="row" id="palette-modifier">
        <ul className="tabs" data-tabs id="app-tabs">
          <li className="tabs-title is-active"><a href="#select" aria-selected="true">Select image</a></li>
          <li className="tabs-title"><a href="#modify">Modify</a></li>
          <li className="tabs-title"><a href="#download">Download</a></li>
        </ul>
        <div className="tabs-content" data-tabs-content="example-tabs">
          <div className="tabs-panel is-active" id="select">
            <TabSelect image={this.state.originalImage} changeImage={this.changeImage.bind(this)} />
          </div>
          <div className="tabs-panel" id="modify">
            <TabModify image={this.state.image} debugImage={this.state.debugImage} palette={this.state.palette} changePaletteColor={this.changePaletteColor.bind(this)} changePaletteColors={this.changePaletteColors.bind(this)}/>
          </div>
          <div className="tabs-panel" id="download">
            <TabDownload image={this.state.image} />
          </div>
        </div>
      </div>
      );
  }
}

export default App;
