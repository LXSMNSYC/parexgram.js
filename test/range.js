/* eslint-disable no-undef */
import assert from 'assert';
import { Range, Feed } from '../src';

describe('Range', () => {
  describe('#parse', () => {
    it('should return a String', () => {
      /**
       *
       */
      assert(typeof new Range().parse(new Feed('test')) === 'string');
    });
    /**
     *
     */
    it('should return a String equal to the CharSet if successful', () => {
      /**
       *
       */
      assert(new Range().parse(new Feed('test')) === 't');
    });
    /**
     *
     */
    it('should return a undefined if unsuccessful', () => {
      /**
       *
       */
      assert(typeof new Range('0', '9').parse(new Feed('tset')) === 'undefined');
    });
    /**
     *
     */
    it('should return a undefined if a non-Feed is received', () => {
      /**
       *
       */
      assert(typeof new Range('0', '9').parse() === 'undefined');
      assert(typeof new Range('0', '9').parse(1) === 'undefined');
      assert(typeof new Range('0', '9').parse(true) === 'undefined');
      assert(typeof new Range('0', '9').parse('') === 'undefined');
      assert(typeof new Range('0', '9').parse([]) === 'undefined');
      assert(typeof new Range('0', '9').parse({}) === 'undefined');
      assert(typeof new Range('0', '9').parse(() => {}) === 'undefined');
    });
  });
});
