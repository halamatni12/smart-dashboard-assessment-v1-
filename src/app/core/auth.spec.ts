import { Auth } from './auth';

describe('Auth Service', () => {
  it('should create Auth service instance', () => {
    const service = new Auth();
    expect(service).toBeTruthy();
  });
});
