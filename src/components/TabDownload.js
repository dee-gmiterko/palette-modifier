import React, { Component } from 'react';
import fileDownload from 'react-file-download';

class TabDownload extends Component {

  render() {
    if(!this.props.image) {
      return (
        <div>
          <h2>Please, select image first</h2>
        </div>
      );
    } else {
      return (
        <div className="row">
          <a className="button success" onClick={() => fileDownload(this.props.image, 'output.png')}>Download</a>
        </div>
      );
    }
  }
}

export default TabDownload;
