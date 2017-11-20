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


/**
 * <Description>
 *
 * @param {type} <name> - <Description>
 * @return {type} - <Description>
 *
 * @author
 */
const convolve = function (img,copy=true) {
  let ouput =  T.Raster.from(img,copy);
  // TODO
  return output;
}

/**
 * <Description>
 *
 * @param {type} img - Array of pixels on which the mean filter is applied
 * @return {type} - Return an output image with a mean filter applied on it
 *
 * @author
 */
const mean = function (img,copy=true) {
  let ouput =  T.Raster.from(img,copy);
  let pix = new Raster();
  // TODO
  return output;
}

let img0 = new T.Image('boats','uint8',360,288);
img0.setPixels(boats_pixels);
let win0 = new T.Window('boats',360,288);
T.renderUint8(win0)(img0.getRaster());

console.time('view');
let view = T.view()(img0.getRaster());
console.timeEnd('view');

document.getElementById('workspace').appendChild(win0.HTMLelement);

view.render(win0);

// console.time('meanFilter')
// mean(img0);
// console.timeEnd('meanFilter')
