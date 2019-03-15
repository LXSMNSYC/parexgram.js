
/* eslint-disable no-undef */
import assert from 'assert';
import {
  CharSet, Quantifier, Feed, Range,
} from '../src';

describe('Quantifier', () => {
  /**
   *
   */
  describe('#parse', () => {
    /**
     *
     */
    it('should return a undefined if a non-Feed is received', () => {
      /**
       *
       */
      assert(typeof new Quantifier(new CharSet('t'), 0).parse() === 'undefined');
      assert(typeof new Quantifier(new CharSet('t'), 0, 1).parse(1) === 'undefined');
      assert(typeof new Quantifier(new CharSet('t'), undefined).parse(true) === 'undefined');
      assert(typeof new Quantifier(new CharSet('t'), 0).parse('') === 'undefined');
      assert(typeof new Quantifier(new CharSet('t'), 0, 1).parse([]) === 'undefined');
      assert(typeof new Quantifier(new CharSet('t'), undefined).parse({}) === 'undefined');
      assert(typeof new Quantifier(new CharSet('t'), 0).parse(() => {}) === 'undefined');
    });
    /**
     *
     */
    it('should return a undefined if there is no matcher', () => {
      assert(typeof new Quantifier().parse(new Feed('test')) === 'undefined');
    });
    /**
     *
     */
    it('should return the correct sequence', () => {
      const peg = new Quantifier(new Range('a', 'z'), 0, 2).parse(new Feed('test'));
      assert(peg[0] === 't');
      assert(peg[1] === 'e');
    });
    /**
     *
     */
    it('should return an empty array if Quantifier(match, 0) matches no result', () => {
      const peg = new Quantifier(new Range('0', '9'), 0).parse(new Feed('test'));
      assert(peg.length === 0);
    });
    /**
     *
     */
    it('should return undefiend if the required matches is not met', () => {
      const peg = new Quantifier(new Range('0', '9'), 1).parse(new Feed('test'));
      assert(typeof peg === 'undefined');
    });
  });
});
