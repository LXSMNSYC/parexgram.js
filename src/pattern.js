/**
 * @license
 * MIT License
 *
 * Copyright (c) 2019 Alexis Munsayac
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * @author Alexis Munsayac <alexis.munsayac@gmail.com>
 * @copyright Alexis Munsayac 2019
 */
import Feed from './feed';
import Matcher from './matcher';

/**
 * @desc
 * Represents a RegExp
 */
export default class Pattern extends Matcher {
  /**
   * Constructs a Pattern from a given value.
   * @param {!(RegExp|String)} value
   */
  constructor(value) {
    super();
    /**
     * @ignore
     */
    if (typeof value === 'string') {
      try {
        /**
         * @ignore
         */
        this.value = new RegExp(value);
      } catch (e) {
        /**
         * @ignore
         */
        this.value = undefined;
      }
    }
    if (value instanceof RegExp) {
      /**
       * @ignore
       */
      this.value = value;
    }
  }

  /**
   * Attempts to consume the prefix of the feed
   * if it matches the Pattern's RegExp value
   * @param {!Feed} feed
   * @return {String}
   */
  parse(feed) {
    if (feed instanceof Feed) {
      const r = feed.peek();
      if (typeof this.value !== 'undefined') {
        if (this.value.test(r)) {
          const m = this.value.exec(r);
          if (m !== null && r.startsWith(m[0])) {
            feed.eat(m[0]);
            return m[0];
          }
        }
      }
    }
    return undefined;
  }
}
