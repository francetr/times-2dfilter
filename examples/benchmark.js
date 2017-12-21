// BENCHMARK

/**
  * Function to proceed the benchmark
  *
  * @param {String} type - String of the type of image available
  * @param {Integer} width - Width of the image to process
  * @param {Integer} height - height of the image to process
  * @return {Array} - Array conataining a set of different images (fixed arbitrarely to 20) with different size
  *
  * @author Tristan Frances
 */
const newImages=(type, width, height)=>{
  let tabImg=[];
  let img;

  for (let i = 0; i < width * 6; i+=108){
    if (type === "uint8") {
      img = new T.Image(type, i+width, i+height);
      img.setPixels(boats_pixels);
    }
    else if (type === "uint16") {
      img = new T.Image(type, i+width, i+height);
      img.setPixels(boats_pixels.map((px)=>px*256)); // set pixels with a conversion into uint16
    }
    else if (type == "float32") {
      img = new T.Image(type, i+width, i+height);
      img.setPixels(boats_pixels.map((px) => px/128 - 1.0)); // set pixels ith a conversion into float32
    }
    tabImg.push(img);
  }

  return tabImg;
}

/**
  * Function to proceed the benchmark
  *
  * @param {String} operation - String of the type of operations
  * @param {TRaster} img_ref - Input image to process
  * @return {String} - String of the time processed for each time the operation has been launched
  *
  * Calculate the mean time (in millisecond) that an operation takes to perform on the reference image.
  * According to the image type it will transform or not the pixel value in the raster
  * The mean value is returned as a string.
  *
  * @author Tristan Frances
 */
const benchmark = (operation, img_ref) =>{
  let st ="";
  let r = 0;
  let moy =0;
  let kernelConvolve = "-1 -1 -1\n-1 8 -1\n-1 -1 -1";
  st = st.concat(operation, ",", img_ref.type,",", img_ref.width, "*", img_ref.height, ",");
  if (operation === "convolve") {
    while ( r <20) {
      if (r<10) { // WARMUP
        let img_res = convolve(kernelConvolve)(img_ref, true);
      }else {
        let start = new Date().getMilliseconds();
        let img_res = convolve(kernelConvolve)(img_ref, true);
        let stop = new Date().getMilliseconds();
        let bench = stop-start;
        if (bench <0) {
          bench=0;
        }
        moy += bench;
      }
      r++;
    }
  }else if (operation === "mean") {
    while ( r <20) {
      if (r<10) { // WARMUP
        let img_res = meanFilter(3)(img_ref, true);
      }else {
        let start = new Date().getMilliseconds();
        let img_res = meanFilter(3)(img_ref, true);
        let stop = new Date().getMilliseconds();
        let bench = stop-start;
        if (bench <0) {
          bench=0;
        }
        moy += bench;
      }
      r++;
    }
  }else if (operation === "gaussian") {
    while ( r <20) {
      if (r<10) {//WARMUP
        let img_res = gaussBlur(3, 2.0)(img_ref, true);
      }else {
        let start = new Date().getMilliseconds();
        let img_res = gaussBlur(3, 2.0)(img_ref, true);
        let stop = new Date().getMilliseconds();
        let bench = stop-start;
        if (bench <0) {
          bench=0;
        }
        moy += bench;
      }
      r++;
    }
  }
  moy /= r;
  st = st.concat(Math.floor(moy.toString()),"\n");
  return st;
}

/**
 * Function to download a csv file
 *
 *  This function do benchmark and then add a download action in the
 *  html page to download the result of the benchmark in a csv file
 *
 * @author Gabor Szabo
 */
function download_csv() {
  let csv ="operation,type,taille,temps(ms)\n";
  let operation = ["convolve", "mean", "gaussian"];
  let type = ["uint8", "uint16", "float32"];

  // Proceed the benchmark for the given operations, type and size images

  for (let op = 0; op < operation.length; op++) {
    for (let typ = 0; typ < type.length; typ++) {
      let tmp_img = newImages(type[typ],360, 280);
      for (let image = 0; image < tmp_img.length; image++) {
        csv = csv.concat(benchmark(operation[op], tmp_img[image]));
      }
    }
  }

  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'benchmark.csv';
  document.getElementById('container').appendChild(hiddenElement);
  hiddenElement.click();
}
