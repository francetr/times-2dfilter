'use strict'

// create a new empty image
let img = new T.Image("uint8", 360, 288);
// set pixels of the image (raster) to those in boats_pixels
img.setPixels(boats_pixels);


// ##### TESTING PART #####
const isKernelSeparable = kernel => {
    //kernelArray.forEach(element => element.forEach(unit => console.log(unit)));
};

const displayKernel = kernel => kernel.forEach(element => element.forEach(unit => console.log(unit)));

const splitKernel = kernel => {
    let tmpKernel = kernel.split("\n").map(x => x.split(" "));
    return {
        kernel : tmpKernel,
        width : tmpKernel[0].length,
        height : tmpKernel.length,
    };
};

const copyImage = image => {
    let img = new T.Image(image.type, image.width, image.height);
    img.raster = image.raster;
    return img;
};

const fillEdgesWithBlack = (image, kWidth, kHeight) => {
    // create new raster for the image
    let newRaster = new T.Raster(image.type, image.width, image.height);
    let pixels = image.raster.pixelData;
    
    let extraWidth = kWidth / 2;
    let extraHeight = kHeight / 2;
    let colorToFill = image.type == 

    // fill the top and bottom of the array with black pixels
    pixels.unshift(new Array(extraHeight).fill(0));
    pixels.push(new Array(extraWidth).fill(0));

    //image processing
    let pixelArrayOfImage = image.getRaster();
    
};
const convolve = (kernel, image, copy = true) => {
    
    let img = copy ? copyImage(image) : image;
    
    // Reformat kernel from string to object
    kernel = splitKernel(kernel);

    // filling image edges with black pixels in order to allow convolution
    img = fillEdgesWithBlack(img, kernel.width, kernel.height);

    // getting pixel data into an array
    let pixelArrayOfImage = img.raster.pixelData;

    
    
    // splitting the kernel into an array
    
    // convolution
    
};

let kernel = "1 2 1\n-1 -2 -1\n1 2 1";
// console.log(isKernelSeparable(kernel));
convolve(kernel, img, false);

//####################

// create a new window 
let win = new T.Window('Boats');
// create a new view for the window
let view = T.view(img.getRaster());
// add view to the window
win.addView(view);
// add window to the DOM
win.addToDOM("workspace");