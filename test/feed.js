/* eslint-disable no-undef */
import assert from 'assert';
import Feed from '../src/feed';

/**
 *
 */
describe('Feed', () => {
  /**
   *
   */
  describe('#peek', () => {
    /**
     *
     */
    it('should return a String', () => {
      /**
       *
       */
      const f = new Feed('Hello World');

      assert(typeof f.peek(5) === 'string');
    });
    /**
     *
     */
    it('should return the correct string', () => {
      /**
       *
       */
      const f = new Feed('Hello World');

      assert(f.peek(5) === 'Hello');
    });
  });
  /**
   *
   */
  describe('#eat', () => {
    /**
     *
     */
    it('should return a Boolean', () => {
      /**
       *
       */
      const f = new Feed('Hello World');

      assert(typeof f.eat('Hello') === 'boolean');
    });
    /**
     *
     */
    it('should return true if the given string is a prefix of the Feed.', () => {
      /**
       *
       */
      const f = new Feed('Hello World');

      assert(f.eat('Hello') === true);
    });
    /**
     *
     */
    it('should return false if the given string is not a prefix of the Feed.', () => {
      /**
       *
       */
      const f = new Feed('Hello World');

      assert(f.eat('olleH') === false);
    });
  });
  /**
   *
   */
  describe('#size', () => {
    /**
     *
     */
    it('should return a Number', () => {
      /**
       *
       */
      const f = new Feed('Hello World');

      assert(typeof f.size === 'number');
    });
    /**
     *
     */
    it('should return the size equal to the received string of the Feed, if #eat is not called.', () => {
      /**
       *
       */
      const s = 'Hello World';
      const l = s.length;
      const f = new Feed(s);

      assert(f.size === l);
    });
    /**
     *
     */
    it('should return the correct size if #eat is not called.', () => {
      /**
       *
       */
      const s = 'Hello World';
      const l = s.length;
      const f = new Feed(s);

      f.eat('Hello');
      assert(f.size === l - 5);
    });
  });
});
