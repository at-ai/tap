export function viewFactory(constructor) {
  return function () {
    const element = new constructor();
    return Promise.resolve(element);
  };
}
