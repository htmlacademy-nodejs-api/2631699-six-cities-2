import {
  ClassConstructor,
  plainToInstance,
} from 'class-transformer';

export function doesSatisfyEnum<E extends object>(value: unknown, target: E): boolean {
  return new Set(Object.values(target)).has(value);
}

export function generateRandomValue(min:number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]):T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}
export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function createErrorObject(message: string) {
  return {
    error: message,
  };
}

export function enumToString<T extends Record<string, string | number>>(enumObj: T): string {
  return Object.values(enumObj)
    .filter((value) => typeof value === 'string' || typeof value === 'number')
    .join(', ');
}


export function capitalize(string: string): string {
  return string[0].toUpperCase() + string.slice(1);
}
