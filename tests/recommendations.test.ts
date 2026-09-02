import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getPublishedRecommendations,
  hasPublishedRecommendations,
  recommendations,
} from '../src/data/recommendations.ts';

describe('recommendations', () => {
  it('hides section when no authorized items', () => {
    assert.equal(hasPublishedRecommendations(), false);
    assert.equal(getPublishedRecommendations().length, 0);
  });

  it('schema fields exist on type via empty catalog', () => {
    assert.ok(Array.isArray(recommendations));
  });
});
