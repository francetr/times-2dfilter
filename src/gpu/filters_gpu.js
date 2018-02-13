const gpuConvolve = (kernel) => (raster, gpuEnv, copy = true) => {
    
    let vertexShader = 
    `#version 300 es

        in vec2 a_vertex;
    
        in vec2 a_texCoord;
    
        uniform vec2 u_resolution;
    
        out vec2 v_texCoord;
    
        void main() {
    
            v_texCoord = a_texCoord;
    
            vec2 clipSpace = a_vertex * u_resolution * 2.0 - 1.0;
    
            gl_Position = vec4(clipSpace * vec2(1.0, 1.0), 0.0, 1.0);
    }`;

    let fragmentShader =
    `#version 300 es

        # TO TEST
        precision highp float;
                
        in vec2 v_texCoord;
        
        uniform sampler2D u_raster;
        
        out vec4 outColor;
        
        void main() {
            
            outColor = texture(u_raster, v_texCoord);
}`;

    let program = gpu.createProgram(gpuEnv,vertexShader,fragmentShader);
}