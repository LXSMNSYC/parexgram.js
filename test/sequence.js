
/* eslint-disable no-undef */
import assert from 'assert';
import { Sequence, CharSet, Feed } from '../src';

describe('Sequence', () => {
  /**
   *
   */
  describe('#parse', () => {
    /**
     *
     */
    it('should return an Array', () => {
      /**
       *
       */
      assert(new Sequence([new CharSet('t')]).parse(new Feed('test')) instanceof Array);
    });
    /**
     *
     */
    it('should return an Array equal to the Matchers if successful', () => {
      /**
       *
       */
      const m1 = new CharSet('t');
      const m2 = new CharSet('e');
      const s = new Sequence([m1, m2]).parse(new Feed('test'));
      assert(s[0] === 't');
      assert(s[1] === 'e');
    });
    /**
     *
     */
    it('should return undefined if no matchers were passed', () => {
      /**
       *
       */
      const s = new Sequence([]).parse(new Feed('test'));
      assert(typeof s === 'undefined');
    });
    /**
     *
     */
    it('should return undefined if one of the matchers fails', () => {
      /**
       *
       */
      const m1 = new CharSet('t');
      const m2 = new CharSet('e');
      const m3 = new CharSet('t');
      const s = new Sequence([new Sequence([m1, m2]), m3]).parse(new Feed('test'));
      assert(typeof s === 'undefined');
    });
  });
});
