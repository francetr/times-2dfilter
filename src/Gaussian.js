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
  * Gaussian Blur Filter
  *
  * @param {TRaster} kernel - Convolution mask
  * @param {TRaster} img - Input image to process
  * @param {boolean} copy - Copy mode to manage memory usage
  * @return {TRaster} - Filtered Image
  *
  * @author Bouchentouf Gary
  */
  
 const gaussBlur = (kernel) => (img,copy=true) => {
    convolve(kernel)(image, copy);
    return output;
 };


const kernelDetermination = (width, height) => {
    let kw = width;
    let kh = height;
    let sigma = kw * kh;

    let string = "";
    
    for (let x = 0; x < width; x++){
        for (let y = 0; y < height; y++){
            let denominator = 2.0 * Math.PI * Math.pow(sigma, 2.0);
            let expo = (Math.pow(x, 2.0) + Math.pow(y, 2.0)) / 2.0 * Math.pow(sigma, 2.0);

            let token = (1 / denominator) * Math.exp(- expo);
            // console.log(token);
            
            string += " " + token.toString();
        }
    }
    console.log(string);
}

// MAIN //





 