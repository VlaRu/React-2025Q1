import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll, expect } from 'vitest';
import { server } from './msw/server';
import matchers from '@testing-library/jest-dom/matchers';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
expect.extend(matchers);
