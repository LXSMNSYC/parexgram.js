'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
const { min, max } = Math;

/**
 * @desc
 * Represents the consumable string for parsing purposes
 */
class Feed {
  /**
   * Constructs a Feed from a given string.
   * @param {!String} feed
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
   * @param {!number} size
   * @return {String}
   */
  peek(size) {
    const { cursor } = this;
    return this.feed.substring(cursor, typeof size !== 'undefined' ? min(cursor + size, this.feedSize) : this.feedSize);
  }

  /**
   * @desc
   * Checks if the given string is a prefix of the Feed,
   * then eats the prefix.
   * @param {!String} str
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
   * Reverts the previous feed state.
   * @param {Number} size
   */
  revert(size) {
    this.cursor = max(this.cursor - size, 0);
  }

  /**
   * @desc
   * Get the unconsumed size of the Feed
   * @type {Number}
   */
  get size() {
    return this.feedSize - this.cursor;
  }
}

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

/**
 * @desc
 * An Interface of all matcher classes
 *
 * @interface
 */
class Matcher {
  /**
   * @desc
   * Given a feed, attempt to match and consume
   * the prefix of a feed.
   * @param {Feed} feed
   * @abstract
   */
  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  parse(feed) {

  }
}

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

/**
 * @desc
 * Represents a consumer literal
 */
class CharSet extends Matcher {
  /**
   * Constructs a CharSet from a given value.
   * @param {!String} value
   */
  constructor(value) {
    super();
    /**
     * @ignore
     */
    this.value = value;
  }

  /**
   * Attempts to consume the prefix of the feed
   * given the CharSet's value.
   * @param {!Feed} feed
   * @return {String}
   */
  parse(feed) {
    let result;
    if (feed instanceof Feed) {
      const { value } = this;
      if (feed.eat(value)) {
        result = value;
      }
    }
    return result;
  }
}

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
/**
 * @desc
 * Represents a range of characters
 */
class Range extends Matcher {
  /**
   *
   * @param {?String} min
   * @param {?String} max
   */
  constructor(min, max) {
    super();
    /**
     * @ignore
     */
    this.min = typeof min === 'string' ? min : '\x00';
    /**
     * @ignore
     */
    this.max = typeof max === 'string' ? max : '\xFF';
  }

  /**
   * Attempts to consume a prefix character
   * of the feed given that the prefix lies
   * within the range.
   *
   * @param {!Feed} feed
   * @returns {String}
   */
  parse(feed) {
    if (feed instanceof Feed) {
      const c = feed.peek(1);
      if (this.min <= c && c <= this.max) {
        feed.eat(c);
        return c;
      }
    }
    return undefined;
  }
}

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

/**
 * @ignore
 * @param {*} feed
 * @param {*} result
 */
const revert = (feed, result) => {
  const size = result.length - 1;
  for (let i = size; i >= 0; i -= 1) {
    const r = result[i];
    if (r instanceof Array) {
      revert(feed, r);
    }
    if (typeof r === 'string') {
      feed.revert(r.length);
    }
  }
};

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
/**
 * @desc
 * Represents a pattern quantifier which collects
 * successive matches given a range.
 */
class Quantifier extends Matcher {
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

/**
 * @desc
 * Represents a RegExp
 */
class Pattern extends Matcher {
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
          if (m !== null && feed.eat(m[0])) {
            return m[0];
          }
        }
      }
    }
    return undefined;
  }
}

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


/**
 * Represents a succession of matches
 *
 * if one of the matches fail, the sequence
 * returns an empty result.
 */
class Sequence extends Matcher {
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

/**
 * @desc
 * Represents an alternation of matchers
 *
 * Matchers are matched in sequence. If a matcher matches
 * successfully, that matcher's result is returned,
 * otherwise other matchers will be matched until all
 * of the matchers fails.
 */
class Alternation extends Matcher {
  /**
   *
   * @param {Array} matchers
   */
  constructor(matchers) {
    super();
    this.matchers = matchers;
  }

  /**
   *
   * @param {Feed} feed
   * @returns {Array|String}
   */
  parse(feed) {
    if (feed instanceof Feed) {
      // eslint-disable-next-line no-restricted-syntax
      for (const matcher of this.matchers) {
        const r = matcher.parse(feed);

        if (typeof r !== 'undefined') {
          return r;
        }
      }
    }
    return undefined;
  }
}

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

exports.Feed = Feed;
exports.Matcher = Matcher;
exports.CharSet = CharSet;
exports.Range = Range;
exports.Quantifier = Quantifier;
exports.Pattern = Pattern;
exports.Sequence = Sequence;
exports.Alternation = Alternation;
