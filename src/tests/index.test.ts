import helloworld from '../modules/helloWorld'

test('helloworld function to be "Hello World!"', () => {
  expect(helloworld()).toBe('Hello World!')
})

test('return given string', () => {
  expect(helloworld('This is a test!')).toBe('This is a test!')
})
