'use strict'

// const displayKernel = kernel => kernel.forEach(element => element.forEach(unit => console.log(unit)));

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

const deepcopy = o => JSON.parse(JSON.stringify(o));

const normalizeKernel = kernel => {
    let maximum = Math.abs(Math.max.apply(Math, kernel.kernel));
    kernel.kernel = kernel.kernel.map(x => x / maximum);
}

const convert = (x, from, to) => parseInt(x, from).toString(to);

const convolve = (kernel) =>  (image, copy = true) => {
    // the convolution will start at (kw/2, kh/2)
    let useKernel = splitKernel(kernel);
    let height = image.height;

    let output = T.Raster.from(image.raster);
    let pixels = output.pixelData;
    output.pixelData = output.pixelData.map(x => 0.0);
    let scale = useKernel.sum != 0 ? 1.0 / useKernel.sum : 1.0;
    let sum = 0.0;
    let i = 0;
    let currentValue = 0.0;

    for (let y = Math.floor(useKernel.height / 2); y < (image.height - Math.floor(useKernel.height / 2)); y++){
        for (let x = Math.floor(useKernel.width / 2); x < (image.width - Math.floor(useKernel.width / 2)); x++){
            sum = 0;
            i = 0;
            for (let v = -Math.floor(useKernel.height / 2); v <= Math.floor(useKernel.height / 2); v++){
                let offset = x + (y + v) * image.width;
                for (let u = -Math.floor(useKernel.width / 2); u <= Math.floor(useKernel.width / 2); u++){
                    let tmp = pixels[offset+u];
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

const convolve2 = (kernel) =>  (image, copy = true) => {
    //     // the convolution will start at (kw/2, kh/2)
    //     let useKernel = splitKernel(kernel);
    
    //     let width = image.width;
    //     let height = image.height;
    
    //     let uc = Math.floor(useKernel.width / 2);
    //     let vc = Math.floor(useKernel.height / 2);
    
    //     let output = T.Raster.from(image.raster);
    
    //     // let pixels = image.type == "float32" ? output.pixelData.map(x => convert(x, 16, 10)) : output.pixelData;
    //     let pixels = output.pixelData;
    
    //     // console.log(pixels);
    
    //     output.pixelData = output.pixelData.map(x => 0.0);
        
    //     let scale = useKernel.sum != 0 ? 1.0 / useKernel.sum : 1.0;//1 / useKernel.size;
        
    //     let sum = 0.0;
    //     let i = 0;
    //     let currentValue = 0.0;
    
    //     for (let y = vc; y < (height - vc); y++){
    //         for (let x = uc; x < (width - uc); x++){
    //             sum = 0;
    //             i = 0;
    //             for (let v = -vc; v <= vc; v++){
    //                 let offset = x + (y + v) * width;
    //                 for (let u = -uc; u <= uc; u++){
    //                     let tmp = pixels[offset+u];
    //                     sum += pixels[offset + u] * useKernel.kernel[i];
    //                     i++;
    //                 }
    //             }
    //             currentValue = image.type == "float32" ? sum * scale : Math.round(sum * scale);
    //             if (currentValue < 0){
    //                 currentValue = 0;
    //             }
    //             output.pixelData[x + y * width] = currentValue;
    //         }
    //     }
    //     return output;
    // }