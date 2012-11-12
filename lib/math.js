/* Get the nearest and even number for the given value.
 *
 * v - value
 * c - add : if the number is an integer, whether to take the nearest greater (true) or lesser (false) even number (default: true);
 *
 * Returns the nearest and even number.
 */
Math.nearestAndEven = function (v, c) {
    c = (c === false) ? -1 : 1;
    n = (this.floor(v) % 2 === 0) ? this.floor(v) : this.ceil(v);

    n += (n % 2 === 0) ? 0 : c;
    return n;
}
