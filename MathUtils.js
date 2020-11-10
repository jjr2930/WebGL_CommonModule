export class MathUtils {
    static IsSame(a, b) {
        return a >= b - Number.EPSILON && a <= b + Number.EPSILON;
    }
    static Clamp(value, min, max) {
        let result = value;
        if (result < min)
            result = min;
        else if (result > max)
            result = max;
        return result;
    }
}
MathUtils.DEG2RAD = Math.PI / 180.0;
MathUtils.RAD2DEG = 180.0 / Math.PI;
//# sourceMappingURL=MathUtils.js.map