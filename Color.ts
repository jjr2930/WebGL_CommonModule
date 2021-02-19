export class Color
{
    public r: number;
    public g: number;
    public b: number;
    public a: number;


    public Set(r: number, g: number, b: number, a: number)
    {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    public constructor(r = 0, g = 0, b = 0, a = 0)
    {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}