import { getStepId, transformStepsToMap } from '../src/utils';
import { steps } from './__mocks__';

describe('utils', () => {
  describe('getStepId', () => {
    describe('when index is out of boundaries', () => {
      it.each([4, -1, 5, -5])('should return empty string', index => {
        expect(getStepId(steps, index)).toBe('');
      });
    });

    describe('when index within boundaries', () => {
      it.each([0, 1, 2])('should return step id', index => {
        expect(getStepId(steps, index)).toBe(steps[index].id);
      });
    });
  });

  describe('transformStepsToMap', () => {
    describe('when steps is empty', () => {
      const map = transformStepsToMap([]);

      it('should return empty map', () => {
        expect(map.size).toBe(0);
      });
    });

    describe.each([
      [steps.slice(0, 1)],
      [steps.slice(0, 2)],
      [steps.slice(0, 3)],
      [steps.slice(0, 4)],
    ])('when steps is %o', slice => {
      const map = transformStepsToMap(slice);
      const ids = slice.map(step => step.id);

      it('should return a map with same size', () => {
        expect(map.size).toBe(slice.length);
      });

      it.each(ids)('should return a map with %p as keys', id => {
        expect(map.has(id)).toBe(true);
      });

      it.each(slice)('should re turn a map with %o as part of value', step => {
        expect(map.get(step.id)).toMatchObject(step);
      });
    });
  });
});
