/*
  Test for a uint8 imgae
*/
let kernelConvolve = "-1 -1 -1\n-1 8 -1\n-1 -1 -1";

let img = new T.Image("uint8", 360, 288);
img.setPixels(boats_pixels);
let win = new T.Window('Original Image uint8');
let view = T.view(img.getRaster());
win.addView(view);
win.addToDOM("workspace");

let img01 = new T.Image('uint8',360,288);
let boats_convolve = convolve(kernelConvolve)(img);
img01.setPixels(boats_convolve.pixelData);
let win01 = new T.Window('Convolve Test uint 8');
let view01 = T.view(img01.getRaster());
win01.addView(view01);
win01.addToDOM('workspace');

let img02 = new T.Image('uint8',360,288);
let boats_mean = meanFilter(3)(img);
img02.setPixels(boats_mean.pixelData);
let win02 = new T.Window('Mean Test uint8');
let view02 = T.view(img02.getRaster());
win02.addView(view02);
win02.addToDOM('workspace');

let img03 = new T.Image('uint8',360,288);
let boats_gauss = gaussBlur(3, 2.0)(img);
img03.setPixels(boats_gauss.pixelData);
let win03 = new T.Window('Gaussian Blur Test uint8');
let view03 = T.view(img03.getRaster());
win03.addView(view03);
win03.addToDOM('workspace');


/*
  Test for a uint16 imgae
*/
let img_uint16 = new T.Image('uint16',256,254);
let uint16_blobs = blobs_pixels.map ( (px) => px * 256);
img_uint16.setPixels(uint16_blobs);
let win_uint16 = new T.Window('Original Image uint16');
let view_uint16 = T.view(img_uint16.getRaster());
win_uint16.addView(view_uint16);
win_uint16.addToDOM('workspace');

let img01_uint16 = new T.Image('uint16',256,254);
let uint16_convolve = convolve(kernelConvolve)(img_uint16);
img01_uint16.setPixels(uint16_convolve.pixelData);
let win01_uint16 = new T.Window('Convolve Test uint16');
let view01_uint16 = T.view(img01_uint16.getRaster());
win01_uint16.addView(view01_uint16);
win01_uint16.addToDOM('workspace');

let img02_uint16 = new T.Image('uint16',256,254);
let uint16_mean = meanFilter(3)(img_uint16);
img02_uint16.setPixels(uint16_mean.pixelData);
let win02_uint16 = new T.Window('Mean Test uint16');
let view02_uint16 = T.view(img02_uint16.getRaster());
win02_uint16.addView(view02_uint16);
win02_uint16.addToDOM('workspace');

let img03_uint16 = new T.Image('uint16',256,254);
let uint16_gauss = gaussBlur(3, 2.0)(img_uint16);
img03_uint16.setPixels(uint16_gauss.pixelData);
let win03_uint16 = new T.Window('Gaussian Blur Test uint16');
let view03_uint16 = T.view(img03_uint16.getRaster());
win03_uint16.addView(view03_uint16);
win03_uint16.addToDOM('workspace');

/*
  Test for float 32
*/
let img_float32 = new T.Image('float32',256,254);
let float32_blobs = blobs_pixels.map ((px) => px/128 - 1.0);
img_float32.setPixels(float32_blobs);
let win_float32 = new T.Window('Original Image float32');
let view_float32 = T.view(img_float32.getRaster());
win_float32.addView(view_float32);
win_float32.addToDOM('workspace');

let img01_float32 = new T.Image('float32',256,254);
let float32_convolve = convolve(kernelConvolve)(img_float32);
img01_float32.setPixels(float32_convolve.pixelData);
let win01_float32 = new T.Window('Convolve Test float32');
let view01_float32 = T.view(img01_float32.getRaster());
win01_float32.addView(view01_float32);
win01_float32.addToDOM('workspace');

let img02_float32 = new T.Image('float32',256,254);
let float32_mean = meanFilter(3)(img_float32);
img02_float32.setPixels(float32_mean.pixelData);
let win02_float32 = new T.Window('Mean Test float32');
let view02_float32 = T.view(img02_float32.getRaster());
win02_float32.addView(view02_float32);
win02_float32.addToDOM('workspace');

let img03_float32 = new T.Image('float32',256,254);
let float32_gauss = gaussBlur(3, 2.0)(img_float32);
img03_float32.setPixels(float32_gauss.pixelData);
let win03_float32 = new T.Window('Gaussian Blur Test float32');
let view03_float32 = T.view(img03_float32.getRaster());
win03_float32.addView(view03_float32);
win03_float32.addToDOM('workspace');

// RGBA
// let imgRGBA = new T.Image('rgba',320,200);
// imgRGBA.setPixels(clown_pixels);
// let winRGBA = new T.Window('Clown');
// let viewRGBA = T.view(imgRGBA.getRaster());
// winRGBA.addView(viewRGBA);
// winRGBA.addToDOM('workspace');
