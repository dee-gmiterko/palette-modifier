export default function(sourcePoints, targetPoints) {

	var combs = [[0, 0, 0], [0, 0, 255], [0, 255, 0], [0, 255, 255], [255, 0, 0], [255, 0, 255], [255, 255, 0], [255, 255, 255]];

	sourcePoints = sourcePoints.concat(combs);
	targetPoints = targetPoints.concat(combs);

	return (point) => {

		var distance = (p1, p2) => {
			var dx = p1[0] - p2[0];
			var dy = p1[1] - p2[1];
			var dz = p1[2] - p2[2];
			return Math.sqrt(dx*dx+dy*dy+dz*dz);
		}

		var distances = sourcePoints.map((p, i) => {
			return {
				index: i,
				distance: distance(point, p)
			}
		});

		distances.sort((a, b) => {return a.distance - b.distance});

		var fourNearest = distances.slice(0, 4);

		var totalDistance = fourNearest.reduce((acc, p) => {return acc + p.distance}, 0);

		var sum = fourNearest.reduce((acc, p) => {
			var w = totalDistance - p.distance;
			return [
			acc[0] + w * targetPoints[p.index][0],
			acc[1] + w * targetPoints[p.index][1],
			acc[2] + w * targetPoints[p.index][2]
			];
		}, [0, 0, 0]);

		var aw = 2*totalDistance;

		return [sum[0] / aw, sum[1] / aw, sum[2] / aw];
	}
}