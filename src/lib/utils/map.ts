/* eslint @typescript-eslint/no-var-requires: "off" */
import type { Map } from "mapbox-gl";

export async function captureSnapshot(map: Map, snapshotElement: HTMLCanvasElement) {
	return;
	const canvas: HTMLCanvasElement = map.getCanvas();

	function prepareMap(map: Map) {
		// Prepare map for taking snapshot.
		// map.setZoom(1);

		const bounds = map.getBounds();
		map.fitBounds(bounds, { maxZoom: 1 });
		map.setCenter([0, 0]);

		map.setBearing(0);
	}

	async function getImage(canvas: HTMLCanvasElement, snapshotElement: HTMLCanvasElement) {
		const snapshotCanvas: CanvasRenderingContext2D | null = snapshotElement.getContext("2d");

		const dataUrl = canvas.toDataURL();
		snapshotElement.width = 2400;
		snapshotElement.height = 1200;

		const image = new Image(2400, 1200);
		image.src = dataUrl;

		image.onload = function () {
			if (snapshotCanvas) {
				snapshotCanvas.drawImage(image, 0, 0);
			}
		};

		const fetchedImage = await fetch(image.src);
		const imageBlob = await fetchedImage.blob();
		const imageUrl = URL.createObjectURL(imageBlob);
		console.log(imageUrl);

		// Create an anchor element to download the image
		const downloadLink = document.createElement("a");
		downloadLink.href = imageUrl.replace(/^data:image\/[^;]/, "data:application/octet-stream");
		downloadLink.download = "map.png";

		// Trigger a click on the download link to download the image
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	}

	prepareMap(map);

	await getImage(canvas, snapshotElement);
}

export async function generateStaticMap(map: string) {
	// Only works on the server
	const mapboxSdk = require("@mapbox/mapbox-sdk");

	const mapboxClient = mapboxSdk({ accessToken: process.env.PUBLIC_MAPBOX_API_KEY });

	console.log(mapboxClient);
	console.log(map);

	// Generate a static map using an existing mapbox map element
}
