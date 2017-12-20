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
  
 const gaussBlur = (kernel, image, copie = true) => {
     let output = convolve(gaussianTerms(9, 1), image, true);
     return output;
 };


const gaussian = (x, sigma) => {
  let c = 2.0 * Math.pow(sigma, 2.0);
  return Math.exp(-x * x / c) / Math.sqrt(c * Math.PI);

}

const gaussianTerms = (kernalsize, sigma) => {
    let terms = [kernalsize];
    let tmp = "";
    for (let i = 0; i <= kernalsize; i++){
        terms[i] = gaussian(i - kernalsize / 2, sigma);
        if (i % 3 === 0){
            tmp += "\n";
        }
        tmp += " " + terms[i].toString();
        
    }
    console.log(tmp);
    return tmp;
    
}

// MAIN //





 