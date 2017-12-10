'use strict'

// // create a new empty image
// let img = new T.Image("uint8", 360, 288);
// // set pixels of the image (raster) to those in boats_pixels
// img.setPixels(boats_pixels);


// ##### TESTING PART #####
const isKernelSeparable = kernel => {
    // check if the kernel used is separable
};

const displayKernel = kernel => kernel.forEach(element => element.forEach(unit => console.log(unit)));

const splitKernel = kernel => {
    let tmpKernel = kernel.split("\n").map(x => x.split(" "));
    let finalKernel = tmpKernel.reduce((accu, x) => accu.concat(x), []);
    let sumKernel = finalKernel.reduce((accu, x) => parseInt(x) + accu, 0);
    return {
        kernel : finalKernel.map(x => parseInt(x)),
        width : tmpKernel[0].length,
        height : tmpKernel.length,
        sum : sumKernel,
        size : finalKernel.length
    };
};

const copyImage = image => {
    let img = new T.Image(image.type, image.width, image.height);
    img.raster = image.raster;
    return img;
};

// const fillEdgesWithBlack = (image, kWidth, kHeight) => {
// };

const convolve = (kernel, image, copy = true) => {
    // by default the convolution will start at (kw/2, kh/2)

    // if copy -> create an image copy and process it else -> use the given image directly
    // let img = copy ? copyImage(image) : image;

    // Reformat kernel from string to object
    kernel = splitKernel(kernel);

    // getting image raster and pixel data
    // let imgRaster = img.getRaster()
    let imgPixelData = image.getRaster().pixelData;
    let tmp = imgPixelData;

    // console.log(imgRaster.getPixel(0,0), imgRaster.getPixel(1,0), imgRaster.getPixel(2,0), imgRaster.getPixel(0,1), imgRaster.getPixel(1,1), imgRaster.getPixel(1,2), imgRaster.getPixel(0,2), imgRaster.getPixel(1,2), imgRaster.getPixel(2,2));

    let imageStartPosition = Math.round(kernel.width / 2);
    let imageStopPosition = imgPixelData.length - imageStartPosition;

    let slideCount = 0;
    let kernelCount = 1;
    let tmpImagePosition = 0;
    let tmpPixelValue = 0;

    for (let i = 0; i < imgPixelData.length; i++){
        tmpImagePosition = i;
        kernelCount = 1;
        tmpPixelValue = 0;
        for (let j = 0; j < kernel.size; j++){
            tmpPixelValue += kernel.kernel[j] * imgPixelData[tmpImagePosition];
            if (i === 0){
                console.log(tmpImagePosition, imgPixelData[tmpImagePosition], tmpPixelValue);
            }

            if (kernelCount === kernel.width){
                kernelCount = 0;
                tmpImagePosition += image.width - kernel.width;
            }

            kernelCount++;
            tmpImagePosition++;
        }

        if (i === 0){
            console.log(tmpPixelValue, Math.round(Math.abs(tmpPixelValue / kernel.size)));
            console.log(Math.round(kernel.width / 2) + (Math.floor(kernel.height / 2) * image.width) + i -1 );
        }
        tmp[Math.round(kernel.width / 2) + (Math.round(kernel.height / 2) * image.width) + i - 1] = Math.floor(tmpPixelValue);
        slideCount++;
    }

    img.pixelData = tmp;
};

// Create a kernel and split it in a 1D Array
let kernel = "-1 -1 -1\n-1 8 -1\n-1 -1 -1";

// convolution process
// convolve(kernel, img, false);

//####################

// // create a new window
// let win = new T.Window('Boats');
// // create a new view for the window
// let view = T.view(img.getRaster());
// // add view to the window
// win.addView(view);
// // add window to the DOM
// win.addToDOM("workspace");
