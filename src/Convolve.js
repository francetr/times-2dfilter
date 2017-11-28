'use strict'

// create a new empty image
let img = new T.Image("uint8", 360, 288);
// set pixels of the image (raster) to those in boats_pixels
img.setPixels(boats_pixels);


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
    let img = copy ? copyImage(image) : image;
    
    // Reformat kernel from string to object
    kernel = splitKernel(kernel);

    // getting image raster and pixel data
    let imgPixelData = img.getRaster().pixelData;
    let tmp = imgPixelData;

    // getting start/stop indexes for browsing image
    let imgStartingIndex = (Math.floor(kernel.height / 2) * img.width) + Math.round(kernel.width / 2);
    let imgStoppingIndex = imgPixelData.length - imgStartingIndex;

    console.log(`START : ${imgStartingIndex}\tSTOP : ${imgStoppingIndex}`);
    console.log(`WIDTH : ${img.width}\tHEIGHT : ${img.height}`);
    // convolution
    for (let i = imgStartingIndex; i < imgStoppingIndex; i++){
        let followingCounter = 0
        let newValue = 0;
        for (let j = 0; j < kernel.size; j++){
            if (followingCounter === kernel.width){
                followingCounter = 0;
                i += (img.width-kernel.width);// - kernel.width);
            }
            newValue += kernel.kernel[j] * tmp[i];
            followingCounter++;
            i++;
        }
        if (isNaN(newValue)){break;}
        imgPixelData[i + Math.round(kernel.size/2)] = Math.abs(newValue);
        console.log(`i : ${i}\tOLD : ${tmp[i + Math.round(kernel.size/2)]}\tNEW : ${Math.abs(imgPixelData[i + Math.round(kernel.size/2)])}`);
    }
    img.pixelData = imgPixelData;
};

// Create a kernel and split it in a 1D Array
let kernel = "-1 -1 -1\n-1 8 -1\n-1 -1 -1";

// convolution process
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