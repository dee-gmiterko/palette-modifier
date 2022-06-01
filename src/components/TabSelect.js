/* eslint-env browser, jquery */

import React from 'react';
import { useDropzone } from 'react-dropzone';

const TabSelect = ({ changeImage, selectTab }) => {

	const onDrop = (acceptedFiles) => {
		changeImage(acceptedFiles[0]);
		selectTab('modify');
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: onDrop,
		multiple: false,
		accept: "image/*",
	});

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
					<br /><img src={require('../images/example.png')} alt="Example of usage" style={{margin: '1rem', width: 'auto', maxHeight: '140px'}} />
					<br />Image + Color palette = New image
				</p>
			</div>
			<div className="small-12 columns">
				<div {...getRootProps()} style={style}>
					<input {...getInputProps()} />
					{isDragActive ? (
		        <div className="button">Drop the files here ...</div>
					) : (
		      	<div className="button">Drag 'n' drop some files here, or click to select files</div>
		      )}
				</div>
			</div>
			<div className="small-12 columns">
				<footer className="padding-top clearfix text-center">
					<p className="float-right button small" onClick={() => selectTab('modify')}>Modify palette</p>
					By <a href="http://ienze.me" target="blank">ienze</a> | <a href="https://github.com/dee-gmiterko/palette-modifier" target="blank">contribute</a>
        </footer>
			</div>
		</div>
	);
}

export default TabSelect;
