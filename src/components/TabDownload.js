/* eslint-env browser, jquery */

import React, { Component } from 'react';
import fileDownload from 'react-file-download';

import Palette from './Palette';

const TabDownload = ({ image, originalImage, palette, getImageBlob, selectTab }) => {

    const download = () => {
        getImageBlob(blob => {
            fileDownload(blob, 'output.png');
        });
    }

    if(!image) {
        return (
            <div>
                <p className="button alert small expanded" onClick={() => selectTab('select')}>Please, select image first</p>
            </div>
        );

    } else {

        return (
            <div className="row">
                <div className="small-12 medium-6 columns">
                    <div>
                        <h3>Download result</h3>
                        <p className="text-center">
                            <a className="button dowload success large" onClick={download} style={{marginTop: '1.3em'}}>Save</a> <br/>
                        </p>
                        <p>This will apply new palette to full-size image and let you save it. If you aren't satisfied with result you can</p>
                        <a className="button small" onClick={() => selectTab('select')}>Try another image</a>
                        <a className="button small" onClick={() => selectTab('select')}>Modify palette</a>
                    </div>
                    <div>
                        <h3>Show your support</h3>
                        <p>Are you happy with your result? Let me know.</p>
                        <ul className="share-buttons">
                          <li><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fienze.me%2Fpalette-modifier&t=Palette%20modifier" title="Share on Facebook" target="_blank"><img alt="Share on Facebook" src={require("../images/social/Facebook.svg")} /></a></li>
                          <li><a href="https://twitter.com/intent/tweet?source=http%3A%2F%2Fienze.me%2Fpalette-modifier&text=Palette%20modifier:%20http%3A%2F%2Fienze.me%2Fpalette-modifier" target="_blank" title="Tweet"><img alt="Tweet" src={require("../images/social/Twitter.svg")} /></a></li>
                          <li><a href="https://plus.google.com/share?url=http%3A%2F%2Fienze.me%2Fpalette-modifier" target="_blank" title="Share on Google+"><img alt="Share on Google+" src={require("../images/social/Google+.svg")} /></a></li>
                          <li><a href="http://www.tumblr.com/share?v=3&u=http%3A%2F%2Fienze.me%2Fpalette-modifier&t=Palette%20modifier&s=" target="_blank" title="Post to Tumblr"><img alt="Post to Tumblr" src={require("../images/social/Tumblr.svg")} /></a></li>
                          <li><a href="http://www.reddit.com/submit?url=http%3A%2F%2Fienze.me%2Fpalette-modifier&title=Palette%20modifier" target="_blank" title="Submit to Reddit"><img alt="Submit to Reddit" src={require("../images/social/Reddit.svg")} /></a></li>
                        </ul>
                    </div>
                </div>
                <div className="small-12 medium-6 columns">
                    <div className="row">
                        <div className="small-6 columns">
                            <img src={originalImage} alt="Original" />
                        </div>
                        <div className="small-6 columns">
                            <img src={image} alt="Preview" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="small-12 columns text-center">
                            <div className="download-palette">
                                <Palette palette={palette} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="small-12 columns">
                    <footer className="clearfix padding-top text-center">
                        <a className="float-left button small" onClick={() => selectTab('select')}>Modify palette</a>
                        By <a href="http://ienze.me" target="blank">ienze</a> | <a href="https://github.com/dee-gmiterko/palette-modifier" target="blank">contribute</a>
                    </footer>
                </div>
            </div>
        );
    }
}

export default TabDownload;
