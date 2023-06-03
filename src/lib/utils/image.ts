export function downloadBlob(blob: string, filename: string) {
	const a = document.createElement("a");
	a.download = filename;
	a.href = blob;
	// For Firefox https://stackoverflow.com/a/32226068
	document.body.appendChild(a);
	a.click();
	a.remove();
}
