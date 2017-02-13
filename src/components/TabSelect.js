/* eslint-env browser, jquery */

import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class TabSelect extends Component {

	onDrop(acceptedFiles) {
		this.props.changeImage(acceptedFiles[0]);
		$('#app-tabs').foundation('selectTab', 'modify');
	}

	render() {

		var style = {
			width: '100%',
        	borderWidth: 3,
        	borderColor: '#888',
        	color: '#888',
        	borderStyle: 'dashed',
			borderRadius: 16,
			textAlign: 'center',
			padding: '4em',
			cursor: 'pointer'
		}

		return (
			<div className="row">
				<div className="small-12 columns">
					<p className="text-center">
						<br />Change color palette of your image to anything you want!
						<br /><img src={require('../images/example.png')} style={{margin: '1rem', width: 'auto', maxHeight: '140px'}} />
						<br />Image + Color palette = New image
					</p>
				</div>
				<div className="small-12 columns">
					<Dropzone onDrop={this.onDrop.bind(this)} multiple={false} accept="image/*" style={style}>
						<div className="button">Try dropping some files here, or click to select files to modify.</div>
					</Dropzone>
				</div>
				<div className="small-12 columns">
					<div className="padding-top clearfix">
						<p className="float-right button small" onClick={() => $('#app-tabs').foundation('selectTab', 'modify')}>Modify palette</p>
					</div>
				</div>
			</div>
			);
	}
}

export default TabSelect;
