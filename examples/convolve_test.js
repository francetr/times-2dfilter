
// create a new empty image
let img = new T.Image("uint8", 360, 288);
// set pixels of the image (raster) to those in boats_pixels
img.setPixels(boats_pixels);

let img2 = new T.Image("uint16", 360, 288);
let uint16Boats = boats_pixels.map(x => x*256);
img2.setPixels(uint16Boats);

let img3 = new T.Image('float32',256,254);
let float_blobs = blobs_pixels.map( (px) => px/128 - 1.0);
img3.setPixels(float_blobs);

console.log(float_blobs);

// TESTING //

// Create a kernel
// let kernel = "-1 -1 -1 -1 -1\n-1 -1 -1 -1 -1\n-1 -1 24 -1 -1\n-1 -1 -1 -1 -1\n-1 -1 -1 -1 -1"
// let kernel = "-1 -1 -1\n-1 7 -1\n-1 -1 -1";
// let kernel = "-1 -1 -1\n-1 8 -1\n-1 -1 -1";
let kernel = "1 1 1\n1 1 1\n1 1 1";

let result = convolve(kernel, img3, true);
console.log(result.pixelData);
img3.setPixels(result.pixelData);

// create a new window
let win = new T.Window('Boats');
// create a new view for the window
let view = T.view(img3.getRaster());
// add view to the window
win.addView(view);
// add window to the DOM
win.addToDOM("workspace");
