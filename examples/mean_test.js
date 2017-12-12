
// create a new empty image
let img = new T.Image("uint8", 360, 288);
// set pixels of the image (raster) to those in boats_pixels
img.setPixels(boats_pixels);

// create a new window
let win = new T.Window('Boats');
// create a new view for the window
let view = T.view(img.getRaster());
// add view to the window
win.addView(view);
// add window to the DOM
win.addToDOM("workspace");


/*
* Apply the mean filter on the image
*/
let kernel="1 1 1\n1 1 1\n1 1 1";
kernel = splitKernel(kernel);

let workflow = T.pipe(
  meanFilter(kernel.kernel),
  T.view
);
let view2 = workflow(img.getRaster());

// let newImg = new T.Image("uint8", 360, 288);
// let applyMean = meanFilter(kernel.kernel) (img.raster);
// newImg.setPixels(applyMean.pixelData);

let win2 = new T.Window('Mean Filter');
// create a new view for the window
// let view2 = T.view(newImg.getRaster());
// add view to the window
win2.addView(view2);
win2.addToDOM("workspace");
// add window to the DOM
