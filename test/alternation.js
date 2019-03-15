
/* eslint-disable no-undef */
import assert from 'assert';
import {
  Sequence, CharSet, Feed, Alternation,
} from '../src';

describe('Alternation', () => {
  /**
   *
   */
  describe('#parse', () => {
    /**
     *
     */
    it('should return an Array if a matcher returns an Array', () => {
      /**
       *
       */
      const m1 = new Sequence([
        new CharSet('t'), new CharSet('e'),
      ]);

      const alt = new Alternation([m1]);

      assert(alt.parse(new Feed('test')) instanceof Array);
    });
    /**
     *
     */
    it('should return an String if a matcher returns a String', () => {
      /**
       *
       */
      const alt = new Alternation([new CharSet('t')]);

      assert(typeof alt.parse(new Feed('test')) === 'string');
    });
    /**
     *
     */
    it('should return undefined if there are no matchers', () => {
      /**
       *
       */
      const alt = new Alternation([]);

      assert(typeof alt.parse(new Feed('test')) === 'undefined');
    });
    /**
     *
     */
    it('should return undefined if there are no matchers', () => {
      /**
       *
       */
      assert(typeof new Alternation([]).parse() === 'undefined');
      assert(typeof new Alternation([]).parse(1) === 'undefined');
      assert(typeof new Alternation([]).parse(true) === 'undefined');
      assert(typeof new Alternation([]).parse('') === 'undefined');
      assert(typeof new Alternation([]).parse([]) === 'undefined');
      assert(typeof new Alternation([]).parse({}) === 'undefined');
      assert(typeof new Alternation([]).parse(() => {}) === 'undefined');
    });
    /**
     *
     */
    it('should return the other matches if the previous matches fails', () => {
      /**
       *
       */
      const alt = new Alternation([
        new CharSet('e'), new CharSet('t'),
      ]);
      assert(typeof alt.parse(new Feed('test')) === 'string');
    });
  });
});
