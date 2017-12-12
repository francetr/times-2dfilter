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
  * Mean Filter
  *
  * @param {TRaster} kernel - Convolution mask
  * @param {TRaster} img - Input image to process
  * @param {boolean} copy - Copy mode to manage memory usage
  * @return {TRaster} - Filtered Image
  *
  * @author Tristan Frances
  */
 // const meanFilter = (kernel, img, copy=true) => {
 //  let output = T.Raster.from(img.raster, copy);
 //  img.raster.pixelData.reduce((accu, value) => accu+value, output.pixelData);
 //  // output = img.raster.pixelData.map((value)=> value);
 //  // output.type = img.type;
 //  let kh = kernel.height;
 //  let kw = kernel.width;
 //  return output;
 // }

 const meanFilter = (kernel)=> (img, copy=true) => {
 let output = T.Raster.from(img, copy);

 let kh = kernel.height;
 let kw = kernel.width;

 let h = img.height;
 let w = img.width;

 output.pixelData.forEach((pix, i)=>{
  let sum = 0;
  let x = i%w;
  let y = Math.floor(i/w);
  sum = pix;
  sum += (x-1 >=0) ? img.pixelData[i-1] : 0.0;
  sum += (y-1 >=0) ? img.pixelData[i-w] : 0.0;
  sum += (x+1 >=0) ? img.pixelData[i+1] : 0.0;
  sum += (y+1 >=0) ? img.pixelData[i+w] : 0.0;
  sum += (x-1 >=0 && y-1 >=0) ? img.pixelData[i-1-w] : 0.0;
  sum += (x+1 >=0 && y+1 >=0) ? img.pixelData[i+1+w] : 0.0;
  sum += (x-1 >=0 && y+1 >=0) ? img.pixelData[i-1+w] : 0.0;
  sum += (x+1 >=0 && y-1 >=0) ? img.pixelData[i+1-w] : 0.0;
  output.pixelData[i] = (sum /= kernel.length);
 });


 return output;
 }

 /**
  * Creation of a kernal object
  *
  * @param {TRaster} kernel - Convolution mask
  * @return {splitKernel} - kernel object with five properties
  *
  * @author Thomas Maucourt
  */
 const splitKernel = (kernel) => {
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
