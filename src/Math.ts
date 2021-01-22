export class Math {
    /**
     * Returns the sum of two numbers.
     *
     * @remarks
     * This is our math utilities lib for shared projects.
     *
     * @param x - The first input number
     * @param y - The second input number
     * @returns The sum of `x` and `y`
     */
    static add(x: number, y: number): number {
      return x + y;
    }
}

console.log(Math.add(1,2))