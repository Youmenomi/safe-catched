export class Caught {
  constructor(public error: unknown) {}
}

export function safeAwait<T>(promise: Promise<T>) {
  return promise
    .then((data) => {
      return [null, data] as [null, T];
    })
    .catch((error) => {
      return [new Caught(error)] as [Caught];
    });
}

export function safeCall<T extends any[], R>(
  thisArg: unknown,
  value: (...args: T) => R,
  ...args: T
) {
  try {
    return [null, value.call(thisArg, ...args)] as [null, R];
  } catch (error) {
    return [new Caught(error)] as [Caught];
  }
}

export function safeApply<T extends any[], R>(
  thisArg: unknown,
  value: (...args: T) => R,
  args?: T
) {
  try {
    return [
      null,
      args === undefined ? value.apply(thisArg) : value.apply(thisArg, args),
    ] as [null, R];
  } catch (error) {
    return [new Caught(error)] as [Caught];
  }
}
