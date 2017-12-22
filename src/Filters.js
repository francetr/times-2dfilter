/*
 *  TIMES: Tiny Image ECMAScript Application
 *  Copyright (C) 2017  Jean-Christophe Taveau.
 *
 *  This file is part of TIMES
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,Image
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with TIMES.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Jean-Christophe Taveau
 */
'use strict'

/**
 * Convolve operation
 *
 * @param {String} kernel - Convolution mask
 * @param {TImage} img - Input image to process
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {TRaster} - Filtered Image
 *
 * @author Thomas Maucourt
 */

const convolve = (kernel) => (image, copy = true) => {
    let useKernel = splitKernel(kernel);
    let output = T.Raster.from(image.raster);
    let pixels = output.pixelData;
    output.pixelData = output.pixelData.map(x => 0.0);
    let scale = useKernel.sum != 0 ? 1.0 / useKernel.sum : 1.0;
    for (let y = Math.floor(useKernel.height / 2); y < (image.height - Math.floor(useKernel.height / 2)); y++){
        for (let x = Math.floor(useKernel.width / 2); x < (image.width - Math.floor(useKernel.width / 2)); x++){
            let sum = 0;
            let i = 0;
            let currentValue = 0.0;
            for (let v = -Math.floor(useKernel.height / 2); v <= Math.floor(useKernel.height / 2); v++){
                let offset = x + (y + v) * image.width;
                for (let u = -Math.floor(useKernel.width / 2); u <= Math.floor(useKernel.width / 2); u++){
                    sum += pixels[offset + u] * useKernel.kernel[i];
                    i++;
                }
            }
            currentValue = image.type == "float32" ? sum * scale : Math.round(sum * scale);
            currentValue = currentValue < 0 ? 0 : currentValue;
            output.pixelData[x + y * image.width] = currentValue;
        }
    }
    return output;
}

 /**
 * Kernel formating
 *
 * @param {String} - kernel as a string (need to be formated as in ImageJ software)
 * @return {Kernel-Object} - Kernel object containing several informations
 *
 * @author Thomas Maucourt
 */
// Function allowing the conversion from a string kernel to a 1D array
const splitKernel = kernel => {
    let splittedKernel = kernel.split("\n").map(x => x.split(" ")).filter(x => x.length != 1);
    let reducedKernel = splittedKernel.reduce((accu, x) => accu.concat(x), []).filter(x => x != "");
    return {
        kernel : reducedKernel.map(x => parseFloat(x)),
        width : splittedKernel[0].filter(x => x != "").length,
        height : splittedKernel.length,
        sum : reducedKernel.reduce((accu, x) => parseFloat(x) + accu, 0),
    };
}

 /**
 * Kernel normalization (optionnal)
 *
 * @param {Kernel-Object} - Take a kernel object and apply normalization as found in ImageJ software
 *
 * @author Thomas Maucourt
 */
const normalizeKernel = kernel => {
    let maximum = Math.abs(Math.max.apply(Math, kernel.kernel));
    kernel.kernel = kernel.kernel.map(x => x / maximum);
}





/**
 * Gaussian Blur Filter
 *
 * @param {Integer} kernelSize - Size (=width) of the kernel used for the Gaussian Blur filter
 * @param {Numeric} sigma - TODO
 * @param {TRaster} image - Input image to process
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {TRaster} - Filtered Image
 *
 * @author Bouchentouf Gary
 */

// const gaussBlur = (kernel, image, copie = true) => convolve(gaussianTerms(9, 1))(image, true);

// const gaussian = (x, sigma) => Math.exp(-x * x / 2.0 * Math.pow(sigma, 2.0)) / Math.sqrt(2.0 * Math.pow(sigma, 2.0) * Math.PI);

// const gaussianTerms = (kernelSize, sigma) => new Array(kernelSize * kernelSize).fill(0).map((x, i) => gaussian(i - kernelSize / 2, sigma)).reduce((acc, x, i) => acc += i % kernelSize === 0 ? "\n" + x + " " : x + " ", "");

const gaussBlur = (kernelSize, sigma) => (image, copy = true) => convolve(new Array(kernelSize * kernelSize).fill(0).map((x, i) => Math.exp(-(i - kernelSize / 2) * (i - kernelSize / 2 / 2.0 * Math.pow(sigma, 2.0)) / Math.sqrt(2.0 * Math.pow(sigma, 2.0) * Math.PI))).reduce((acc, x, i) => acc += i % kernelSize === 0 ? "\n" + x + " " : x + " ", ""))(image, copy);



/**
 * Mean Kernel
 *
 * @param {Integer} kernel - Size (=width) of the kernel used for the mean filter
 * @param {TRaster} image - Input image to process
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {TRaster} - Filtered Image by using the convolution function
 *
 * @author Tristan Frances
 */
 const meanFilter = (kernelSize) => (image, copy = true)=>{
   return convolve(new Array(kernelSize * kernelSize).fill(0).map((x, i) => 1).reduce((acc, x, i) => acc += i % kernelSize === 0 ? "\n" + x + " " : x + " ", ""))(image,copy);
}
