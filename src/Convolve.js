'use strict'

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
}

const convolve = (kernel, image, copy = true) => {
    console.log("HELLO");
    // by default the convolution will start at (kw/2, kh/2)
    kernel = splitKernel(kernel)
    let width = image.width;
    let height = image.height;
    let uc = Math.round(kernel.width / 2);
    let vc = Math.round(kernel.height / 2);
    console.log(image.raster.pixelData);
    let pixels = image.raster.pixelData;
    let pixels2 = T.Raster.from(image.raster);

    for (let y = vc; y < height - vc; y++){
        for (let x = uc; x < width - uc; x++){
            let sum = 0;
            let i = 0;
            for (let v = -vc; v <= vc; v++){
                let offset = x + (y + v) * width;
                for (let u = -uc; u < uc; u++){
                    sum += pixels2[offeset + u] * kernel[i++];
                }
            pixels[x + y + width] = sum / kernel.sum;
            }
        }
    }
    pixels2.pixelData = pixels;
    return pixels2;
}


// const subConvolution = (kernel, imagePart) => {
//     let value = 0;
//     for (let k = 0; k < kernel.size; k++){
//         value += kernel[k] * imagePart[k];
//     }
//     return value /= kernel.size;
// }

    // #####################

    // let slideCount = 0;
    // let kernelCount = 1;
    // let tmpImagePosition = 0;
    // let tmpPixelValue = 0;

    // for (let i = 0; i < imgPixelData.length; i++){
    //     tmpImagePosition = i;
    //     kernelCount = 1;
    //     tmpPixelValue = 0;
    //     for (let j = 0; j < kernel.size; j++){
    //         tmpPixelValue += kernel.kernel[j] * imgPixelData[tmpImagePosition];

    //         if (kernelCount === kernel.width){
    //             kernelCount = 0;
    //             tmpImagePosition += image.width - kernel.width;
    //         }

    //         kernelCount++;
    //         tmpImagePosition++;
    //     }

    //     output[Math.round(kernel.width / 2) + (Math.round(kernel.height / 2) * image.width) + i - 1] = Math.floor(tmpPixelValue);
    //     slideCount++;
    // }

    // img.pixelData = output;
};
