// UINT8
// create a new empty image
let img = new T.Image("uint8", 360, 288);
// set pixels of the image (raster) to those in boats_pixels
img.setPixels(boats_pixels);
// create a new window
let win = new T.Window('Boats');
// create a new view for the window
let view = T.view(img.getRaster());
// add view to the window
win.addView(view);
// add window to the DOM
win.addToDOM("workspace");

// UINT16
// let img01 = new T.Image('uint16',256,254);
// let uint16_blobs = blobs_pixels.map ( (px) => px * 256);
// img01.setPixels(uint16_blobs);
// let win01 = new T.Window('Blobs uint16');
// let view01 = T.view(img01.getRaster());
// win01.addView(view01);
// win01.addToDOM('workspace');


// FLOAT32
// let img02 = new T.Image('float32',256,254);
// let float_blobs = blobs_pixels.map( (px) => px/128 - 1.0);
// img02.setPixels(float_blobs);
// let win02 = new T.Window('Blobs float32');
// let view02 = T.view(img02.getRaster());
// win02.addView(view02);
// win02.addToDOM('workspace');


// RGBA
// let imgRGBA = new T.Image('rgba',320,200);
// imgRGBA.setPixels(clown_pixels);
// let winRGBA = new T.Window('Clown');
// let viewRGBA = T.view(imgRGBA.getRaster());
// winRGBA.addView(viewRGBA);
// winRGBA.addToDOM('workspace');


/*
* Apply the mean filter on the image
*/
// let kernel="1 1 1\n1 1 1\n1 1 1";
// // kernel = splitKernel(kernel);
// let result = meanFilter(kernel)(img, true);
// img.setPixels(result.pixelData);

// let workflow = T.pipe(
//   meanFilter(kernel),
//   T.view
// );
// let view2 = workflow(img.getRaster());

let win2 = new T.Window('Mean Filter');
let view2 = T.view(img.getRaster())
// create a new view for the window

// add view to the window
win2.addView(view2);
win2.addToDOM("workspace");
// add window to the DOM

// BENCHMARK
// let img_tmp = new T.Image("uint8", img.width, img.height);
// let win_tmp = new T.Window('Benchmark');
// let view_tmp = T.view(img_tmp.getRaster());
// win_tmp.addView(view_tmp);
// win_tmp.addToDOM("workspace");

// let res_uint8 = [];

/**
  * Function to proceed the benchmark
  *
  * @param {String} type - String of the type of image available
  * @param {Integer} width - Width of the image to process
  * @param {Integer} height - height of the image to process
  * @return {Array} - Array conataining a set of different images (fixed to 29) with different size
  *
  * @author Tristan Frances
 */
const newImages=(type, width, height)=>{
  let tabImg=[];
  let img;

  for (let i = 0; i < width * 2; i+=25){
    if (type === "uint8") {
      img = new T.Image(type, i+width, i+height);
      img.setPixels(boats_pixels);
    }
    else if (type === "uint16") {
      img = new T.Image(type, i+width, i+height);
      img.setPixels(boats_pixels.map((px)=>px*256));
    }
    else if (type == "float32") {
      img = new T.Image(type, i+width, i+height);
      img.setPixels(boats_pixels.map((px) => px/128 - 1.0));
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
  let kernel="1 1 1\n1 1 1\n1 1 1";
  st = st.concat(operation, ",", img_ref.type,",", img_ref.width, ",", img_ref.height, ",");
  if (operation === "convolve") {
    while ( r <10) {
      let start = new Date().getMilliseconds();
      let img_res = meanFilter(kernelConvolve)(img_ref, true);
      // img_tmp.setPixels(img_res.pixelData);
      let stop = new Date().getMilliseconds();
      let bench = stop-start;
      if (bench <0) {
        bench=0;
      }
      moy += bench;
      r++;
    }
  }else if (operation === "mean") {
    while ( r <10) {
      let start = new Date().getMilliseconds();
      let img_res = meanFilter(kernel)(img_ref, true);
      // img_tmp.setPixels(img_res.pixelData);
      let stop = new Date().getMilliseconds();
      let bench = stop-start;
      if (bench <0) {
        bench=0;
      }
      moy += bench;
      r++;
    }
  }else if (operation === "gaussian") {
    while ( r <10) {
      let start = new Date().getMilliseconds();
      let img_res = gaussBlur(9, 2.0)(img_ref, true);
      // img_tmp.setPixels(img_res.pixelData);
      let stop = new Date().getMilliseconds();
      let bench = stop-start;
      if (bench <0) {
        bench=0;
      }
      moy += bench;
      r++;
    }
  }
  moy /= r;
  moy = moy.toString();
  st = st.concat(moy,"\n");
  return st;
}

/**
 * Function to download a csv file
 *
 *  This function proceed a benchmark and then add a download action in the
 *  html page to download the result of the benchmark in a csv file
 *
 * @author Gabor Szabo
 */
function download_csv() {
  // newImages("uint8", 360, 280);
  // newImages('uint16', 360, 280);
  // newImages('float32', 360, 280);
  let csv ="";
  let operation = ["mean", "convolve", "gaussian"];
  let type = ["uint8", "uint16", "float32"];

  for (let op = 0; op < operation.length; op++) {
    for (let typ = 0; typ < type.length; typ++) {
      let tmp_img = newImages(type[typ],360, 280);
      for (let image = 0; image < tmp_img.length; image++) {
        csv = csv.concat(benchmark(operation[op], tmp_img[image]));
      }
    }
  }

  // csv = csv.concat("\n").concat(benchmark("gaussian", img, ""));
  // console.log(img.raster.pixelData);
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'benchmark.csv';
  document.getElementById('container').appendChild(hiddenElement);
  hiddenElement.click();
}


// let operation = ["mean", "convolve"];

// let type = ["uint8", "uint16", "float32"];
// let str="";

// for (let op = 0; op < operation.length; op++) {
//   for (let typ = 0; typ < type.length; typ++) {
//     let tmp_img = newImages(type[typ],360, 280);
//     for (let image = 0; image < tmp_img.length; image++) {
//       csv = csv.concat(benchmark(operation[op], tmp_img)).concat("\n");
//     }
//   }
// }

// newImages("uint8", 360, 280);
// newImages('uint16', 360, 280);
let kernel="1 1 1\n1 1 1\n1 1 1";
