import interpolatingPolynomial from 'interpolating-polynomial';
import {range} from 'range';

export default function(sourcePoints, targetPoints) {

	sourcePoints = sourcePoints.concat([[0, 0, 0], [255, 255, 255]]);
	targetPoints = targetPoints.concat([[0, 0, 0], [255, 255, 255]]);

	var zip = (a, b) => {
		return a.map(function (e, i) {
		    return [e, b[i]];
		});
	}

	var interpolations = range(0, 3).map(i => {
		var z = zip(sourcePoints.map(p => p[i]), targetPoints.map(p => p[i]));
		z.sort((a, b) => { return a[0] - b[0] });
		return z;
	});

	interpolations.forEach(ints => console.log(JSON.stringify(ints)));

	return (point) => {
		return point.slice(0, 3).map((a, i) => {
			// interpolations[i]

			var high = 0;
		    while(interpolations[i][high][0] < a) {
		        high++;
		    }

		    if(high == 0) {
		    	return interpolations[i][high][1];
		    }

		    var low = high - 1;

		    var x1 = interpolations[i][low][0];
		    var y1 = interpolations[i][low][1];
		    var x2 = interpolations[i][high][0];
		    var y2 = interpolations[i][high][1];

		    var d = x2 - x1;

		    if(d==0) {
		    	console.log({low, high, i, x1, y1, x2, y2, a});
		    }

		    var r = (d - (a-x1)) * y1 + (d - (x2-a)) * y2;
		    return r / d;
		});
	}
}