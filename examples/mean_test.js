// UINT8
// create a new empty image
// let img = new T.Image("uint8", 360, 288);
// // set pixels of the image (raster) to those in boats_pixels
// img.setPixels(boats_pixels);
// // create a new window
// let win = new T.Window('Boats');
// // create a new view for the window
// let view = T.view(img.getRaster());
// // add view to the window
// win.addView(view);
// // add window to the DOM
// win.addToDOM("workspace");

// UINT16
let img01 = new T.Image('uint16',256,254);
let uint16_blobs = blobs_pixels.map ( (px) => px * 256);
img01.setPixels(uint16_blobs);
let win01 = new T.Window('Blobs uint16');
let view01 = T.view(img01.getRaster());
win01.addView(view01);
win01.addToDOM('workspace');


// FLOAT32
// let img02 = new T.Image('float32',256,254);
// let float_blobs = blobs_pixels.map( (px) => px/128 - 1.0);
// img02.setPixels(float_blobs);
// let win02 = new T.Window('Blobs float32');
// let view02 = T.view(img02.getRaster());
// win02.addView(view02);
// win02.addToDOM('workspace');


// RGBA
// let imgRGBA = new T.Image('rgba',320,200);
// imgRGBA.setPixels(clown_pixels);
// let winRGBA = new T.Window('Clown');
// let viewRGBA = T.view(imgRGBA.getRaster());
// winRGBA.addView(viewRGBA);
// winRGBA.addToDOM('workspace');


/*
* Apply the mean filter on the image
*/
let kernel="1 1 1\n1 1 1\n1 1 1";
kernel = splitKernel(kernel);


let workflow = T.pipe(
  meanFilter(kernel.kernel),
  T.view
);
let view2 = workflow(img01.getRaster());

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
