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
import revert from './utils';
/**
 * @desc
 * Represents a pattern quantifier which collects
 * successive matches given a range.
 */
export default class Quantifier extends Matcher {
  /**
   *
   * @param {?Number} min
   * @param {?Number} max
   */
  constructor(matcher, min, max) {
    super();
    if (matcher instanceof Matcher) {
      /**
       * @ignore
       */
      this.matcher = matcher;
      /**
       * @ignore
       */
      this.min = typeof min === 'number' ? min : 0;
      /**
       * @ignore
       */
      this.max = typeof max === 'number' ? max : undefined;
    }
  }

  /**
   * Attempts to consume prefixes of a Feed
   * multiple times until a prefix fails to match.
   *
   * If the amount of matched prefixes lies within
   * the quantifier range, an array of matched
   * prefixes is returned.
   *
   * @param {!Feed} feed
   * @returns {Array}
   */
  parse(feed) {
    if (feed instanceof Feed) {
      const { matcher, min, max } = this;
      const isNumber = typeof max === 'number';
      if (matcher instanceof Matcher) {
        const result = [];
        let parsed = matcher.parse(feed);
        let count = 0;
        while (typeof parsed !== 'undefined') {
          result.push(parsed);
          count += 1;
          if (isNumber && count > max) {
            break;
          }
          parsed = matcher.parse(feed);
        }
        if (count >= min) {
          return result;
        }
        revert(feed, result);
      }
    }
    return undefined;
  }
}
