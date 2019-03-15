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
const { min } = Math;

/**
 * @desc
 * Represents the consumable string for parsing purposes
 */
export default class Feed {
  /**
   * Constructs a Feed from a given string.
   * @param {String} feed 
   */
  constructor(feed) {
    /**
     * @ignore
     */
    this.feed = feed;
    /**
     * @ignore
     */
    this.feedSize = feed.length;
    /**
     * @ignore
     */
    this.cursor = 0;
  }

  /**
   * @desc
   * Get the first set of string from the Feed
   * @param {number} size
   * @return {String}
   */
  peek(size) {
    const { cursor } = this;
    return this.feed.substring(cursor, min(cursor + size, this.feedSize));
  }

  /**
   * @desc
   * Checks if the given string is a prefix of the Feed,
   * then eats the prefix.
   * @param {String} str
   * @return {Boolean}
   */
  eat(str) {
    const size = str.length;
    if (this.peek(size) === str) {
      this.cursor = min(this.cursor + size, this.feedSize);
      return true;
    }
    return false;
  }

  /**
   * @desc
   * Get the unconsumed size of the Feed
   * @return {Number}
   */
  get size() {
    return this.feedSize - this.cursor;
  }
}
