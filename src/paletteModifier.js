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

		console.log("modify");

		this.context.drawImage(this.htmlImage, 0, 0);

		var cmt = colorModelTransform(this.originalPalette.map(c => c.rgb()), palette.map(c => c.rgb()));
		this.modifyPixels(pixel => {
			var po = cmt(pixel);
			return [Math.round(po[0]), Math.round(po[1]), Math.round(po[2]), 255];
		});

		return this.canvas.toDataURL();
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
}

export default PaletteModifier;