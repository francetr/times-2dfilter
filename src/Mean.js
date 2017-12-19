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
 * @param {TRaster} kernel - Convolution mask object
 * @param {TRaster} img - Input image to process
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {TRaster} - Filtered Image by using the convolution function
 *
 * @author Tristan Frances
 */
 const meanFilter = kernel => (image, copy = true)=>{
   return convolve(kernel)(image);
}


 // const meanFilter = (useKernel) => (img, copy=true) => {
 // let output = T.Raster.from(img, copy);
 // // let useKernel = splitKernel(kernel);
 //
 // // let kh = useKernel.height;
 //
 //
 // let h = img.height;
 // let w = img.width;
 //
 // let kw = useKernel.width;
 //
 // img.pixelData.map((pix, i)=>{
 //  /*
 //   * Parcours des pixels de l'output pour y mettre la valeur moyenne
 //   * des pixels parcouru par le useKernel
 //   * Les pixels pour lesquels le useKernel est en dehors de l'image sont
 //   * remplacés par une valeur nulle
 //   */
 //   let x = i%w;
 //   let y = Math.floor(i/w);
 //   useKernel.map((valk, ik)=>{
 //     let sum = 0.0;
 //     let xk = ik%kw;
 //     let yk = Math.floor(ik/kw);
 //     sum = pix;
 //     sum += (x-xk >=0) ? img.pixelData[i-ik] * valk : 0.0
 //     sum += (y-yk >=0) ? img.pixelData[i-w] * valk : 0.0;
 //     sum += (x+ik >=0) ? img.pixelData[i+ik] * valk : 0.0;
 //     sum += (y+ik >=0) ? img.pixelData[i+w] * valk : 0.0;
 //     sum += (x-ik >=0 && y-ik >=0) ? img.pixelData[i-ik-w] * valk : 0.0;
 //     sum += (x+ik >=0 && y+ik >=0) ? img.pixelData[i+ik+w] * valk : 0.0;
 //     sum += (x-ik >=0 && y+ik >=0) ? img.pixelData[i-ik+w] * valk : 0.0;
 //     sum += (x+ik >=0 && y-ik >=0) ? img.pixelData[i+ik-w] * valk : 0.0;
 //     output.pixelData[i] = Math.floor(sum /= useKernel.length);
 //   });
 //
 //  if (i>0 && i<100) {
 //  console.log(output.pixelData[0]);
 //  }
 //
 // });
 //
 // return output;
 // }
