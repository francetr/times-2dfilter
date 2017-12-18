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
 * Mean Kernel
 *
 * @param {TRaster} kernel - Convolution mask
 * @param {TRaster} img - Input image to process
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {TRaster} - Filtered Image
 *
 * @author Tristan Frances
 */
 const meanKernel = (kernel) => (img, copy = true) => {
     // by default the convolution will start at (kw/2, kh/2)
     let useKernel = splitKernel(kernel);

     let width = img.width;
     let height = img.height;

     let uc = Math.floor(useKernel.width / 2);
     let vc = Math.floor(useKernel.height / 2);

     let output = T.Raster.from(img.raster);
     console.log(output.getPixel(12,1))
     let pixels = deepcopy(output.pixelData);

     output.pixelData = output.pixelData.map(x => 0);

     let scale = useKernel.sum != 0 ? 1 / useKernel.sum : 1 / useKernel.size;
     let sum = 0;
     let i = 0;
     let currentValue = 0;

     for (let y = vc; y < (height - vc); y++){
         for (let x = uc; x < (width - uc); x++){
             sum = 0;
             i = 0;
             for (let v = -vc; v <= vc; v++){
                 let offset = x + (y + v) * width;
                 for (let u = -uc; u <= uc; u++){
                     let tmp = pixels[offset+u];
                     sum += pixels[offset + u] * useKernel.kernel[i];
                     i++;
                     // if (y === vc){
                     //     console.log(x, y, tmp, sum, currentValue);
                     // }
                 }
             }
             currentValue = Math.round(sum / kernel.length * scale);
             if (currentValue < 0){
                 currentValue = 0;
             }
             output.pixelData[x + y * width] = currentValue;
         }
     }
     return output;
 }



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

 const meanFilter = (useKernel) => (img, copy=true) => {
 let output = T.Raster.from(img, copy);
 // let useKernel = splitKernel(kernel);

 // let kh = useKernel.height;
 // let kw = useKernel.width;

 let h = img.height;
 let w = img.width;

 img.pixelData.forEach((pix, i)=>{
  /*
   * Parcours des pixels de l'output pour y mettre la valeur moyenne
   * des pixels parcouru par le useKernel
   * Les pixels pour lesquels le useKernel est en dehors de l'image sont
   * remplacé ar une valeur nulle
   */
  let sum = 0.0;
  let x = i%w;
  let y = Math.floor(i/w);
  sum = pix;
  sum += (x-1 >=0) ? img.pixelData[i-1] : 0.0
  sum += (y-1 >=0) ? img.pixelData[i-w] : 0.0;
  sum += (x+1 >=0) ? img.pixelData[i+1] : 0.0;
  sum += (y+1 >=0) ? img.pixelData[i+w] : 0.0;
  sum += (x-1 >=0 && y-1 >=0) ? img.pixelData[i-1-w] : 0.0;
  sum += (x+1 >=0 && y+1 >=0) ? img.pixelData[i+1+w] : 0.0;
  sum += (x-1 >=0 && y+1 >=0) ? img.pixelData[i-1+w] : 0.0;
  sum += (x+1 >=0 && y-1 >=0) ? img.pixelData[i+1-w] : 0.0;
  output.pixelData[i] = Math.ceil(sum /= useKernel.length);
 });

 // console.log(output.pixelData.map((acc)=>acc,0));

 return output;
 }

 /**
  * Creation of a kernal object
  *
  * @param {TRaster} use - Convolution mask
  * @return {splitKernel} - use object with five properties
  *
  * @author Thomas Maucourt
  */
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
