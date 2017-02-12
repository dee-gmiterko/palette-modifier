import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class TabSelect extends Component {

  render() {
    return (
      <Dropzone onDrop={acceptedFiles => this.props.changeImage(acceptedFiles[0])} multiple={false} accept="image/*">
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
    );
  }
}

export default TabSelect;
