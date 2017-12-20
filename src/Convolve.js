'use strict'

const splitKernel = kernel => {
    let splittedKernel = kernel.split("\n").map(x => x.split(" ")).filter(x => x.length != 1);
    let reducedKernel = splittedKernel.reduce((accu, x) => accu.concat(x), []);
    return {
        kernel : reducedKernel.map(x => parseFloat(x)),
        width : splittedKernel[0].length,
        height : splittedKernel.length,
        sum : reducedKernel.reduce((accu, x) => parseFloat(x) + accu, 0),
    };
}

const normalizeKernel = kernel => {
    let maximum = Math.abs(Math.max.apply(Math, kernel.kernel));
    kernel.kernel = kernel.kernel.map(x => x / maximum);
}

const convolve = (kernel) =>  (image, copy = true) => {
    let useKernel = splitKernel(kernel);
    console.log(useKernel);
    let output = T.Raster.from(image.raster);
    let pixels = output.pixelData;
    output.pixelData = output.pixelData.map(x => 0.0);
    let scale = useKernel.sum != 0 ? 1.0 / useKernel.sum : 1.0;

    for (let y = Math.floor(useKernel.height / 2); y < (image.height - Math.floor(useKernel.height / 2)); y++){
        for (let x = Math.floor(useKernel.width / 2); x < (image.width - Math.floor(useKernel.width / 2)); x++){
            let sum = 0;
            let i = 0;
            let currentValue = 0.0;
            for (let v = -Math.floor(useKernel.height / 2); v <= Math.floor(useKernel.height / 2); v++){
                let offset = x + (y + v) * image.width;
                for (let u = -Math.floor(useKernel.width / 2); u <= Math.floor(useKernel.width / 2); u++){
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
