
// create a new empty image
let img = new T.Image("uint8", 360, 288);
// set pixels of the image (raster) to those in boats_pixels
img.setPixels(boats_pixels);

// create a new window
let win = new T.Window('Boats');
gaussBlur()
// create a new view for the window
let view = T.view(img.getRaster());
// add view to the window
win.addView(view);
// add window to the DOM
win.addToDOM("workspace");
