export class Utilities
{
    public static async CreateNewShader(gl: WebGLRenderingContext, path: string, shaderType : number): Promise<WebGLShader>
    {
        const shaderText = await fetch(path).then(res => res.text());
        const newShader = gl.createShader(shaderType);
        gl.shaderSource(newShader, shaderText);
        gl.compileShader(newShader);
        if (!gl.getShaderParameter(newShader, gl.COMPILE_STATUS))
        {
            console.error("shader error text \n" + shaderText + "\n error msg", gl.getShaderInfoLog(newShader));
            return null;
        }

        return newShader;
    }

    public static async CreateNewProgram(gl: WebGLRenderingContext,
        vertexShader: WebGLShader,
        fragmentShader: WebGLSampler): Promise<WebGLProgram>
    {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        {
            console.error("programlink error : ", gl.getProgramInfoLog(program));
            return null;
        }

        gl.validateProgram(program);
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
        {
            console.error("program validate error : ", gl.getProgramInfoLog(program));
            return null;
        }

        gl.useProgram(program);
        return program;
    }

    public static CreateArrayBuffer(
        gl: WebGLRenderingContext,
        program: WebGLProgram,
        attributeName: string,
        elementCount: number,
        sources: number[]): [WebGLBuffer, number]
    {
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sources), gl.STATIC_DRAW);

        const attribLocation = gl.getAttribLocation(program, attributeName);
        gl.vertexAttribPointer(
            attribLocation,
            elementCount,
            gl.FLOAT,
            false,
            elementCount * Float32Array.BYTES_PER_ELEMENT,
            0);
        gl.enableVertexAttribArray(attribLocation);

        return [buffer, attribLocation];
    }

    public static CreateIndexBufferU16(
        gl: WebGLRenderingContext,
        sources: number[]): WebGLBuffer
    {
        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sources), gl.STATIC_DRAW);
        return indexBuffer
    }

    public static CreateIndexBufferU32(
        gl: WebGLRenderingContext,
        sources: number[]): WebGLBuffer
    {
        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(sources), gl.STATIC_DRAW);
        return indexBuffer
    }

    public static async LoadTexture(gl: WebGLRenderingContext,
        program: WebGLProgram,
        uniformName: string,
        path: string): Promise<void>
    {
        return new Promise((resolve, reject) =>
        {
            const img = new Image();
            img.onload = () =>
            {
                const cubeTexture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, cubeTexture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
                gl.generateMipmap(gl.TEXTURE_2D);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, cubeTexture);
                gl.uniform1i(gl.getUniformLocation(program, uniformName), 0);

                resolve();
            }
            img.onerror = reject;
            img.src = path;
        });
    }
}