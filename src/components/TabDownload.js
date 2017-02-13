/* eslint-env browser, jquery */

import React, { Component } from 'react';
import fileDownload from 'react-file-download';

class TabDownload extends Component {

  download() {
    console.log(this.props.getImageBlob);
    this.props.getImageBlob(blob => {
      fileDownload(blob, 'output.png');
    });
  }

  render() {
    if(!this.props.image) {
      return (
        <div>
          <p className="button alert small expanded" onClick={() => $('#app-tabs').foundation('selectTab', 'select')}>Please, select image first</p>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="small-12 columns">
            <a className="button success" onClick={this.download.bind(this)}>Download</a>
          </div>
          <div className="small-12 columns">
            <div className="clearfix padding-top">
              <p className="float-left button small" onClick={() => $('#app-tabs').foundation('selectTab', 'modify')}>Modify palette</p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default TabDownload;
