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
let kernel="1 1 1\n1 1 1\n1 1 1";
// kernel = splitKernel(kernel);
let result = meanFilter(kernel)(img, true);
img.setPixels(result.pixelData);

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
let r =0


"360", "280"
const newImages=(type, width, height)=>{
  for (let i = 0; i < width*1000; i+=100) {
    for (let j = 0; i < height*1000; j+=100) {
      if (type === "uint8") {
        let img = new T.Image("uint8", 360, 288);
      };
      img.setPixels(boats_pixels);

    };
  };


}


const benchmark = (img_ref, st) =>{
  let r = 0;
  while ( r <10) {
    let start = new Date().getMilliseconds();
    let img_res = meanFilter(kernel)(img_ref, true);
    // img_tmp.setPixels(img_res.pixelData);
    let stop = new Date().getMilliseconds();
    let bench = stop-start;
    if (bench <0) {
      bench=0;
    }
    bench =bench.toString();
    st = st.concat(bench).concat(",");
    r++;
  }
  return st;
}

/**
 * Function to download a csv file
 *
 * @return {TRaster} - Filtered Image by using the convolution function
 *
 *  This function proceed a benchmark and then add a download action in the
 *  html page to download the result of the benchmark in a csv file 
 *
 * @author Gabor Szabo
 */
function download_csv() {

    let csv = benchmark(img, "");

    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'benchmark.csv';
    document.getElementById('container').appendChild(hiddenElement);
    hiddenElement.click();
}

// console.log(benchmark(img, " "));
