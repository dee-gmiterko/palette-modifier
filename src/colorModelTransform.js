import {range} from 'range';

export default function(sourcePoints, targetPoints, settings) {

	sourcePoints = sourcePoints.concat([[0, 0, 0], [255, 255, 255]]);
	targetPoints = targetPoints.concat([[0, 0, 0], [255, 255, 255]]);

	var zip = (a, b) => {
		return a.map(function (e, i) {
		    return [e, b[i]];
		});
	}

	var interpolations = range(0, 3).map(i => {
		var points = zip(sourcePoints.map(p => p[i]), targetPoints.map(p => p[i]));
		points.sort((a, b) => { return a[0] - b[0] });
		
		var f = (a) => {
			var high = 0;
		    while(points[high][0] < a) {
		        high++;
		    }

		    if(high === 0) {
		    	return points[high][1];
		    }

		    var low = high - 1;

		    var x1 = points[low][0];
		    var y1 = points[low][1];
		    var x2 = points[high][0];
		    var y2 = points[high][1];

		    var d = x2 - x1;

		    var e = ((a-x1) / d);
		    var r = (1-e) * y1 + (e) * y2;
		    return r;
		};

		var blurRange = range(-1*settings.paletteBlur, settings.paletteBlur+1);
		return range(0, 255+1).map(a => {
			var n = blurRange.length;
			var s = 0;
			for(i of blurRange) {
				if(a+i<0 || a+i>255) {
					s += a+i;
					continue;
				}
				s += f(a+i);
			}
			return s / n;
		});
	});

	return (point) => {
		return point.slice(0, 3).map((a, i) => {
			if(a<0||a>255) {
				console.log(a, i);
			}
			return interpolations[i][a];
		});
	}
}