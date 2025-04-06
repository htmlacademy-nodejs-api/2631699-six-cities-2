export function doesSatisfyEnum<E extends object>(value: unknown, target: E): boolean {
  return new Set(Object.values(target)).has(value);
}
