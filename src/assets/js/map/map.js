/**
 * @template T
 * @callback Effect
 * @returns {T}
 */

/**
 * @template T
 */
export class mapMonad {
    /** @type {Effect<T>} */
    #effect;

    /**
     * @param {Effect<T>} effect
     */
    constructor(effect) {
        this.#effect = effect;
    }

    /**
     * @template A
     * @param {A} value
     * @returns {mapMonad<A>}
     */
    static of(value) {
        return new mapMonad(() => value);
    }

    /**
     * @template A
     * @param {(value: T) => A} f
     * @returns {mapMonad<A>}
     */
    map(f) {
        return new mapMonad(() => f(this.eval()));
    }

    /**
     * @returns {T}
     */
    eval() {
        return this.#effect();
    }
}