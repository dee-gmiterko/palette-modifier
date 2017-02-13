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
			self.initCanvas(this.width, this.height, callback);
		}, false);
		this.htmlImage.src = this.originalImage;
	}

	initCanvas(width, height, callback) {
		this.canvas = document.createElement('canvas');
		this.canvas.width = width;
		this.canvas.height = height;

		this.context = this.canvas.getContext("2d");

		if(callback) callback();
	}

	modify(palette) {

		var cmt = colorModelTransform(this.originalPalette.map(c => c.rgb()), palette.map(c => c.rgb()));
		// Debug

		this.context.fillStyle = 'white';
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.context.strokeStyle = 'rgba(255, 0, 0, 1)';
		for(var i=1; i<255; i++) {
			this.context.beginPath();
			this.context.moveTo(0*255+ i-1, Math.round(cmt([i-1, 0, 0])[0]));
			this.context.lineTo(0*255+ i, Math.round(cmt([i, 0, 0])[0]));
			this.context.stroke();
		}

		this.context.strokeStyle = 'rgba(0, 255, 0, 1)';
		for(i=1; i<255; i++) {
			this.context.beginPath();
			this.context.moveTo(1*255+ i-1, Math.round(cmt([0, i-1, 0])[1]));
			this.context.lineTo(1*255+ i, Math.round(cmt([0, i, 0])[1]));
			this.context.stroke();
		}

		this.context.strokeStyle = 'rgba(0, 0, 255, 1)';
		for(i=1; i<255; i++) {
			this.context.beginPath();
			this.context.moveTo(2*255+ i-1, Math.round(cmt([0, 0, i-1])[2]));
			this.context.lineTo(2*255+ i, Math.round(cmt([0, 0, i])[2]));
			this.context.stroke();
		}

		var debugImage = this.canvas.toDataURL();

		// Image

		this.context.drawImage(this.htmlImage, 0, 0);

		this.modifyPixels(pixel => {
			var po = cmt(pixel);
			return [Math.round(po[0]), Math.round(po[1]), Math.round(po[2]), 255];
		});

		return [this.canvas.toDataURL(), debugImage];
	}

	modifyPixels(f) {
		var imgData = this.context.getImageData(0,0,this.canvas.width,this.canvas.height);
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

		this.context.putImageData(imgData, 0, 0);
	}

	getImageBlob(callback) {
		this.canvas.toBlob(callback);
	}
}

export default PaletteModifier;