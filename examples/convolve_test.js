
// create a new empty image
let img = new T.Image("uint8", 360, 288);
// set pixels of the image (raster) to those in boats_pixels
img.setPixels(boats_pixels);


let uint16Boats = boats_pixels.map(x => x*256);
img.setPixels(uint16Boats);
// TESTING //

// Create a kernel
// let kernel = "-1 -1 -1 -1 -1\n-1 -1 -1 -1 -1\n-1 -1 24 -1 -1\n-1 -1 -1 -1 -1\n-1 -1 -1 -1 -1"
// let kernel = "-1 -1 -1\n-1 7 -1\n-1 -1 -1";
let kernel = "-1 -1 -1\n-1 8 -1\n-1 -1 -1";

let result = convolve(kernel, img, true);
img.setPixels(result.pixelData);

// create a new window
let win = new T.Window('Boats');
// create a new view for the window
let view = T.view(img.getRaster());
// add view to the window
win.addView(view);
// add window to the DOM
win.addToDOM("workspace");
