/* eslint-disable no-undef */
import assert from 'assert';
import { Pattern, Feed } from '../src';

const feed = new Feed('some expression');
console.log(new Pattern('[a-z]+').parse(feed)); // 'some'

describe('Pattern', () => {
  it('it should match correctly given a RegExp', () => {
    assert(new Pattern(/[a-zA-Z]/).parse(new Feed('Hello World')) === 'H');
  });
  it('it should match correctly given a String', () => {
    assert(new Pattern('[a-zA-Z]').parse(new Feed('Hello World')) === 'H');
  });
  it('it should return undefined if there is a non-Feed', () => {
    /**
     *
     */
    assert(typeof new Pattern().parse() === 'undefined');
    assert(typeof new Pattern().parse(1) === 'undefined');
    assert(typeof new Pattern().parse(true) === 'undefined');
    assert(typeof new Pattern().parse('') === 'undefined');
    assert(typeof new Pattern().parse([]) === 'undefined');
    assert(typeof new Pattern().parse({}) === 'undefined');
    assert(typeof new Pattern().parse(() => {}) === 'undefined');
  });
  it('it should return undefined if there is a no valid RegExp', () => {
    /**
     *
     */
    assert(typeof new Pattern().parse(new Feed('Hello World')) === 'undefined');
    assert(typeof new Pattern('[a').parse(new Feed('Hello World')) === 'undefined');
  });
  it('it should return undefined if RegExp match fails', () => {
    /**
     *
     */
    assert(typeof new Pattern(/[0-9]/).parse(new Feed('Hello World')) === 'undefined');
  });
  it('it should return undefined if RegExp matches but is not a prefix', () => {
    /**
     *
     */
    assert(typeof new Pattern(/[a-z]/).parse(new Feed('Hello World')) === 'undefined');
  });
});
