import { describe, it, expect } from 'vitest';

describe('health', () => {
  it('should return ok', () => {
    // Intentionally failing test for training
    expect('ok').toBe('not-ok');
  });
});
