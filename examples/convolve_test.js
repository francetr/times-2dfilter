
// create a new empty image
let img = new T.Image("uint8", 360, 288);
// set pixels of the image (raster) to those in boats_pixels
img.setPixels(boats_pixels);

// TESTING //

// Create a kernel and split it in a 1D Array
let kernel = "-1 -1 -1\n-1 8 -1\n-1 -1 -1";

let result = convolve(kernel, img, true);
img.raster = result;


// create a new window
let win = new T.Window('Boats');
// create a new view for the window
let view = T.view(img.getRaster());
// add view to the window
win.addView(view);
// add window to the DOM
win.addToDOM("workspace");
