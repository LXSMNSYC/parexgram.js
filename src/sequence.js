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
 * Represents a succession of matches
 *
 * if one of the matches fail, the sequence
 * returns an empty result.
 */
export default class Sequence extends Matcher {
  /**
   * Creates a Sequence from an array of Matchers
   * @param {Array} matchers
   */
  constructor(matchers) {
    super();
    this.matchers = matchers;
  }

  /**
   * Attemps to consume a feed with the array of
   * Matchers.
   *
   * Returns an empty result if one of the matchers
   * fails to match.
   * @param {Feed} feed
   * @return {Array}
   */
  parse(feed) {
    if (feed instanceof Feed) {
      if (this.matchers.length > 0) {
        const result = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const matcher of this.matchers) {
          const r = matcher.parse(feed);

          const flag = typeof r === 'undefined';
          if (flag) {
            revert(feed, result);
            return undefined;
          }

          if (!flag) {
            result.push(r);
          }
        }
        return result;
      }
    }
    return undefined;
  }
}
