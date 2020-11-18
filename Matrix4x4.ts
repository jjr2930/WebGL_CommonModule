import { MathUtils } from "./MathUtils.js"
import { Vector3 } from "./Vector3.js";
export class Matrix4x4 
{
    public readonly ROW: number = 4;
    public readonly COLUMN: number = 4;
    public readonly SIZE: number = 16;

    private m: number[];

    constructor(other: Matrix4x4 = null)
    {
        this.m = [];
        for (let i = 0; i < this.SIZE; ++i)
        {
            if (null === other)
                this.m.push(0);
            else
                this.m.push(other.m[i]);
        }
    }

    public GetArray(): number[]
    {
        const result = new Array<number>();
        for (let i = 0; i < this.SIZE; ++i)
            result.push(this.m[i]);

        return result;
    }

    public SetData1D(value: number, index: number): void
    {
        this.m[index] = value;
    }

    public SetData2D(value: number, i: number, j: number): void
    {
        if (i >= 4)
        {
            alert("i must be smaller than 4");
            return;
        }

        if (j >= 4)
        {
            alert(" j must be smaller than 4");
            return;
        }

        const index = this.COLUMN * i + j;
        this.m[index] = value;
    }

    public TranslateXYZ(x: number, y: number, z: number): void
    {
        //this.SetIdentity();
        this.m[3] = x;
        this.m[7] = y;
        this.m[11] = z;
    }

    public ScaleXYZ(x: number, y: number, z: number): void
    {
        //this.SetIdentity();
        this.m[0] = x;
        this.m[5] = y;
        this.m[10] = z;
    }

    // Based on http://www.gamedev.net/reference/articles/article1199.asp
    public RotateAxis(angle: number, axis: Vector3): void
    {
        const radAngle = angle * MathUtils.DEG2RAD;
        const c = Math.cos(radAngle);
        const s = Math.sin(radAngle);
        const t = 1 - c;
        const x = axis.X;
        const y = axis.Y;
        const z = axis.Z;
        const tx = t * x;
        const ty = t * y;

        this.m[0] = tx * x + c; this.m[4] = tx * y - s * z; this.m[8] = tx * z + s * y; this.m[12] = 0;
        this.m[1] = tx * y + s * z; this.m[5] = ty * y + c; this.m[9] = ty * z - s * x; this.m[13] = 0;
        this.m[2] = tx * z - s * y; this.m[6] = ty * z + s * x; this.m[10] = t * z * z + c; this.m[14] = 0;
        this.m[3] = 0; this.m[7] = 0; this.m[11] = 0; this.m[15] = 1;
    }

    public Add(other: Matrix4x4): void
    {
        for (let i = 0; i < this.m.length; ++i)
        {
            this.m[i] += other.m[i];
        }
    }

    public MultiplyScalar(scalar: number): void
    {
        for (let i = 0; i < this.m.length; ++i)
        {
            ;
            this.m[i] *= scalar;
        }
    }

    public SetZero(): void
    {
        for (let i = 0; i < this.SIZE; ++i)
        {
            this.m[i] = 0;
        }
    }

    public SetIdentity(): void
    {

        for (let i = 0; i < this.SIZE; ++i)
        {
            this.m[i] = 0;
        }

        this.m[0] = 1;
        this.m[5] = 1;
        this.m[10] = 1;
        this.m[15] = 1;
    }

    public Mul(b: Matrix4x4): void
    {
        const a = new Matrix4x4(this);

        const a11 = a.m[0], a12 = a.m[4], a13 = a.m[8], a14 = a.m[12];
        const a21 = a.m[1], a22 = a.m[5], a23 = a.m[9], a24 = a.m[13];
        const a31 = a.m[2], a32 = a.m[6], a33 = a.m[10], a34 = a.m[14];
        const a41 = a.m[3], a42 = a.m[7], a43 = a.m[11], a44 = a.m[15];

        const b11 = b.m[0], b12 = b.m[4], b13 = b.m[8], b14 = b.m[12];
        const b21 = b.m[1], b22 = b.m[5], b23 = b.m[9], b24 = b.m[13];
        const b31 = b.m[2], b32 = b.m[6], b33 = b.m[10], b34 = b.m[14];
        const b41 = b.m[3], b42 = b.m[7], b43 = b.m[11], b44 = b.m[15];

        this.m[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        this.m[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        this.m[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        this.m[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

        this.m[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        this.m[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        this.m[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        this.m[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

        this.m[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        this.m[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        this.m[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        this.m[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

        this.m[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        this.m[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        this.m[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        this.m[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
    }

    //https://www.geertarien.com/blog/2017/07/30/breakdown-of-the-lookAt-function-in-OpenGL/
    public SetViewMatrix(eye: Vector3, at: Vector3, up: Vector3): void
    {
        const zAxis = Vector3.Sub(at, eye).Normalized();
        const xAxis = Vector3.Cross(zAxis, up).Normalized();
        const yAxis = Vector3.Cross(xAxis, zAxis);


        this.SetIdentity();
        this.m[0] = xAxis.X; this.m[4] = yAxis.X; this.m[8] = zAxis.X; this.m[12] = eye.X;
        this.m[1] = xAxis.Y; this.m[5] = yAxis.Y; this.m[9] = zAxis.Y; this.m[13] = eye.Y;
        this.m[2] = xAxis.Z; this.m[6] = yAxis.Z; this.m[10] = zAxis.Z; this.m[14] = eye.Z;
    };
    public SetPerspectiveMatrix(fov: number, aspect: number, near: number, far: number)
    {
        const top = Math.tan(fov * 0.5 * MathUtils.DEG2RAD) * near;
        const bottom = -top;
        const right = top * aspect;
        const left = -right;

        this.SetFrustrumMatrix(left, right, top, bottom, near, far)
    }

    public SetFrustrumMatrix(
        left: number,
        right: number,
        top: number,
        bottom: number,
        near: number,
        far: number): void 
    {
        const [l, r, t, b, n, f] = this.ValidateProjectionMatrixParameters(left, right, top, bottom, near, far);

        const x = 2 * n / (r - l);
        const y = 2 * n / (t - b);

        const aa = (r + l) / (r - l);
        const bb = (t + b) / (t - b);
        const cc = -(f + n) / (f - n);
        const dd = -2 * f * n / (f - n);

        this.m[0] = x; this.m[4] = 0; this.m[8] = aa; this.m[12] = 0;
        this.m[1] = 0; this.m[5] = y; this.m[9] = bb; this.m[13] = 0;
        this.m[2] = 0; this.m[6] = 0; this.m[10] = cc; this.m[14] = dd;
        this.m[3] = 0; this.m[7] = 0; this.m[11] = -1; this.m[15] = 0;
    }

    public SetOrthographicMatrix(
        left: number,
        right: number,
        top: number,
        bottom: number,
        near: number,
        far: number): void
    {
        const [l, r, t, b, n, f] = this.ValidateProjectionMatrixParameters(left, right, top, bottom, near, far);

        const w = 1.0 / (r - l);
        const h = 1.0 / (t - b);
        const p = 1.0 / (f - n);

        const x = (r + l) * w;
        const y = (t + b) * h;
        const z = (f + n) * p;

        this.m[0] = 2 * w; this.m[4] = 0; this.m[8] = 0; this.m[12] = -x;
        this.m[1] = 0; this.m[5] = 2 * h; this.m[9] = 0; this.m[13] = -y;
        this.m[2] = 0; this.m[6] = 0; this.m[10] = -2 * p; this.m[14] = -z;
        this.m[3] = 0; this.m[7] = 0; this.m[11] = 0; this.m[15] = 1;
    }

    private ValidateProjectionMatrixParameters(
        left: number,
        right: number,
        top: number,
        bottom: number,
        near: number,
        far: number): [number, number, number, number, number, number]
    {
        let l = left;
        let r = right;
        let t = top;
        let b = bottom;
        let n = near;
        let f = far;

        if (MathUtils.IsSame(left, right))
        {
            l = -1;
            r = 1;
        }

        if (MathUtils.IsSame(top, bottom))
        {
            t = 1;
            b = -1;
        }

        if (MathUtils.IsSame(near, far))
        {
            n = 0.001;
            f = 1000;
        }

        if (far < near)
        {
            const temp = near;
            near = far;
            far = temp;
        }

        if (MathUtils.IsSame(n, 0))
        {
            n = 0.001;
        }

        if (MathUtils.IsSame(f, 0))
        {
            f = 1000;
        }

        return [l, r, t, b, n, f];
    }
    public Set(m0: number, m4: number, m8: number, m12: number,
        m1: number, m5: number, m9: number, m13: number,
        m2: number, m6: number, m10: number, m14: number,
        m3: number, m7: number, m11: number, m15: number)
    {
        this.m[0] = m0; this.m[4] = m4; this.m[8] = m8; this.m[12] = m12;
        this.m[1] = m1; this.m[5] = m5; this.m[9] = m9; this.m[13] = m13;
        this.m[2] = m2; this.m[6] = m6; this.m[10] = m10; this.m[14] = m14;
        this.m[3] = m3; this.m[7] = m7; this.m[11] = m11; this.m[15] = m15;
    }
    public Transepose(): void
    {
        const _m = this.m;
        const r = new Matrix4x4();

        r.m[0] = _m[0]; r.m[4] = _m[1]; r.m[8] = _m[2]; r.m[12] = _m[3];
        r.m[1] = _m[4]; r.m[5] = _m[5]; r.m[9] = _m[6]; r.m[13] = _m[7];
        r.m[2] = _m[8]; r.m[6] = _m[9]; r.m[10] = _m[10]; r.m[14] = _m[11];
        r.m[3] = _m[12]; r.m[7] = _m[13]; r.m[11] = _m[14]; r.m[15] = _m[15];
    }
    public ToString(): string
    {
        let res = "";
        res += this.m[0].toFixed(5) + " , "; res += this.m[4].toFixed(5) + " , "; res += this.m[8].toFixed(5) + " , "; res += this.m[12].toFixed(5) + " , "; res += "\n";
        res += this.m[1].toFixed(5) + " , "; res += this.m[5].toFixed(5) + " , "; res += this.m[9].toFixed(5) + " , "; res += this.m[13].toFixed(5) + " , "; res += "\n";
        res += this.m[2].toFixed(5) + " , "; res += this.m[6].toFixed(5) + " , "; res += this.m[10].toFixed(5) + " , "; res += this.m[14].toFixed(5) + " , "; res += "\n";
        res += this.m[3].toFixed(5) + " , "; res += this.m[7].toFixed(5) + " , "; res += this.m[11].toFixed(5) + " , "; res += this.m[15].toFixed(5) + " , "; res += "\n";

        return res;
    }
}