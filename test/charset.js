/* eslint-disable no-undef */
import assert from 'assert';
import { CharSet, Feed } from '../src';

describe('CharSet', () => {
  /**
   *
   */
  describe('#parse', () => {
    /**
     *
     */
    it('should return a String', () => {
      /**
       *
       */
      assert(typeof new CharSet('test').parse(new Feed('test')) === 'string');
    });
    /**
     *
     */
    it('should return a String equal to the CharSet if successful', () => {
      /**
       *
       */
      assert(new CharSet('test').parse(new Feed('test')) === 'test');
    });
    /**
     *
     */
    it('should return a undefined if unsuccessful', () => {
      /**
       *
       */
      assert(typeof new CharSet('test').parse(new Feed('tset')) === 'undefined');
    });
    /**
     *
     */
    it('should return a undefined if a non-Feed is received', () => {
      /**
       *
       */
      assert(typeof new CharSet('test').parse() === 'undefined');
      assert(typeof new CharSet('test').parse(1) === 'undefined');
      assert(typeof new CharSet('test').parse(true) === 'undefined');
      assert(typeof new CharSet('test').parse('') === 'undefined');
      assert(typeof new CharSet('test').parse([]) === 'undefined');
      assert(typeof new CharSet('test').parse({}) === 'undefined');
      assert(typeof new CharSet('test').parse(() => {}) === 'undefined');
    });
  });
});
