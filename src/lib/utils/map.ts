import type { Map } from "mapbox-gl";

export function captureSnapshot(map: Map, snapshotElement: HTMLCanvasElement) {
	if (map.getZoom() > 1) {
		map.setZoom(1);
		setTimeout(() => {
			getImage();
		}, 100);
	}

	function getImage() {
		const ctx: CanvasRenderingContext2D | null = snapshotElement.getContext("2d");

		const png = map.getCanvas().toDataURL();
		const copy = new Image(2400, 1200);

		copy.src = png;
		copy.onload = function () {
			snapshotElement.width = copy.naturalWidth;
			snapshotElement.height = copy.naturalHeight;

			if (ctx) {
				ctx.drawImage(copy, 0, 0);
			}
			// logo();
			// textbox();
		};
	}

	getImage();
}
