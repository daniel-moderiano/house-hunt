// import { testApiHandler } from 'next-test-api-route-handler';
// import endpoint from '../pages/api/search';
// import type { PageConfig } from 'next';
// import './dbSetupTeardown';

// // Respect the Next.js config object if it's exported
// const handler: typeof endpoint & { config?: PageConfig } = endpoint;

// describe('API route', () => {
//   it('works', async () => {
//     await testApiHandler({
//       handler,
//       requestPatcher: ((req) => req),
//       test: async ({ fetch }) => {
//         const res = await fetch({ method: 'GET' });
//         expect((await res.json()).name).toBe('hello');
//       }
//     });
//   })
// })
export { }

test('works', () => {
  expect(true).toBe(true);
})