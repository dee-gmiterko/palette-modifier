import interpolatingPolynomial from 'interpolating-polynomial';
import {range} from 'range';

export default function(sourcePoints, targetPoints) {

	sourcePoints = sourcePoints.concat([[0, 0, 0], [255, 255, 255]]);
	targetPoints = sourcePoints.concat([[0, 0, 0], [255, 255, 255]]);

	var zip = (a, b) => {
		return a.map(function (e, i) {
		    return [e, b[i]];
		});
	}

	var interpolations = range(0, 3).map(i => {
		var z = zip(sourcePoints.map(p => p[i]), targetPoints.map(p => p[i]));
		z.sort(function(a, b) {return a[0] - b[0]});
		return interpolatingPolynomial(z);
	});

	return (point) => {
		return point.slice(0, 3).map((a, i) => {return interpolations[i](a)});
	}
}