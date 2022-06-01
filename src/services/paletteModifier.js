import colorModelTransform from './colorModelTransform';

class PaletteModifier {

	constructor(originalImage, originalPalette) {
		this.originalImage = originalImage;
		this.originalPalette = originalPalette;
	}

	init(callback) {
		var self = this;

		this.htmlImage = new Image();
		this.htmlImage.addEventListener('load', function() {
			self.initCanvases(this.width, this.height, callback);
		}, false);
		this.htmlImage.src = this.originalImage;
	}

	initCanvases(imageWidth, imageHeight, callback) {
		this.canvasFull = document.createElement('canvas');
		this.canvasFull.width = imageWidth;
		this.canvasFull.height = imageHeight;

		this.canvasPreview = document.createElement('canvas');
		this.canvasPreview.width = Math.min(imageWidth, 1000);
		this.canvasPreview.height = Math.floor(imageHeight / (imageWidth / this.canvasPreview.width));

		this.canvasDebug = document.createElement('canvas');
		this.canvasDebug.width = 3*255;
		this.canvasDebug.height = 255;

		if(callback) callback();
	}

	modify(palette, settings) {

		var cmt = colorModelTransform(this.originalPalette.map(c => c.rgb()), palette.map(c => c.rgb()), settings);
		
		// Preview

		var cxtPreview = this.canvasPreview.getContext("2d");

		cxtPreview.drawImage(this.htmlImage, 0, 0, this.canvasPreview.width, this.canvasPreview.height);

		this.modifyPixels(this.canvasPreview, pixel => {
			var po = cmt(pixel);
			return [Math.round(po[0]), Math.round(po[1]), Math.round(po[2]), 255];
		});

		// Debug

		var cxtDebug = this.canvasDebug.getContext("2d");

		// background
		cxtDebug.fillStyle = 'white';
		cxtDebug.fillRect(0, 0, 3*255, 255);

		// background lines
		cxtDebug.strokeStyle = 'rgba(0, 0, 0, 0.5)';
		cxtDebug.lineWidth = 1;

		cxtDebug.beginPath();
		cxtDebug.moveTo(255, 0);
		cxtDebug.lineTo(255, 255);
		cxtDebug.stroke();

		cxtDebug.beginPath();
		cxtDebug.moveTo(510, 0);
		cxtDebug.lineTo(510, 255);
		cxtDebug.stroke();
		
		// lines
		var p = cmt([0, 0, 0]);
		for(var i=1; i<255; i++) {

			var t = cmt([i, i, i]);

			cxtDebug.strokeStyle = 'rgba(255, 0, 0, 1)';
			cxtDebug.beginPath();
			cxtDebug.moveTo(0*255+ i-1, 255-Math.round(p[0]));
			cxtDebug.lineTo(0*255+ i, 255-Math.round(t[0]));
			cxtDebug.stroke();
			
			cxtDebug.strokeStyle = 'rgba(0, 255, 0, 1)';
			cxtDebug.beginPath();
			cxtDebug.moveTo(1*255+ i-1, 255-Math.round(p[1]));
			cxtDebug.lineTo(1*255+ i, 255-Math.round(t[1]));
			cxtDebug.stroke();
			
			cxtDebug.strokeStyle = 'rgba(0, 0, 255, 1)';
			cxtDebug.beginPath();
			cxtDebug.moveTo(2*255+ i-1, 255-Math.round(p[2]));
			cxtDebug.lineTo(2*255+ i, 255-Math.round(t[2]));
			cxtDebug.stroke();

			p = t;
		}

		// color points
		var s = 4;
		cxtDebug.strokeStyle = null;
		for(i = 0; i<this.originalPalette.length; i++) {
			var originalColor = this.originalPalette[i].rgb();
			var color = palette[i].rgb();
			cxtDebug.fillStyle = palette[i].css();
			cxtDebug.fillRect(0*255 + originalColor[0] - s/2, 255 - color[0] - s/2, s, s);
			cxtDebug.fillRect(1*255 + originalColor[1] - s/2, 255 - color[1] - s/2, s, s);
			cxtDebug.fillRect(2*255 + originalColor[2] - s/2, 255 - color[2] - s/2, s, s);
		};
	}

	getImage(type) {
		switch(type) {
			case 'original':
			return this.originalImage;
			case 'preview':
			return this.canvasPreview.toDataURL();
			case 'full':
			throw new Error("Use getFullImageBlob instead (this can take long, so its async)");
			case 'debug':
			return this.canvasDebug.toDataURL();
			default:
			throw new Error("Unknown image type");
		}
	}

	getFullImageBlob(palette, settings, callback) {
		setTimeout(() => {

			var cmt = colorModelTransform(this.originalPalette.map(c => c.rgb()), palette.map(c => c.rgb()), settings);

			this.canvasFull.getContext("2d").drawImage(this.htmlImage, 0, 0);

			this.modifyPixels(this.canvasFull, pixel => {
				var po = cmt(pixel);
				return [Math.round(po[0]), Math.round(po[1]), Math.round(po[2]), 255];
			});

			this.canvasFull.toBlob(callback);

		}, 1);
	}

	modifyPixels(canvas, f) {
		var imgData = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
		var data = imgData.data;

		for(var i=0; i<data.length; i+=4) {
			var pixel = data.slice(i, i+4);
			var modifiedPixel = f(pixel);
			//copy back
			data[i] = modifiedPixel[0];
			data[i+1] = modifiedPixel[1];
			data[i+2] = modifiedPixel[2];
			data[i+3] = modifiedPixel[3];
		}

		canvas.getContext("2d").putImageData(imgData, 0, 0);
	}
}

export default PaletteModifier;