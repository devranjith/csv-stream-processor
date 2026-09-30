import { describe, it, expect } from 'vitest';
import { loginSchema } from './authSchema';

describe('Login Schema Validation', () => {
  it('should pass with valid email and password', () => {
    const validData = {
      email: 'test@example.com',
      password: 'password123',
    };
    
    const result = loginSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should fail with invalid email format', () => {
    const invalidData = {
      email: 'not-an-email',
      password: 'password123',
    };
    
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter a valid email address');
    }
  });

  it('should fail when password is less than 6 characters', () => {
    const invalidData = {
      email: 'test@example.com',
      password: '123',
    };
    
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Password must be at least 6 characters long');
    }
  });

  it('should fail when fields are empty', () => {
    const invalidData = {
      email: '',
      password: '',
    };
    
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      // Check that there are errors for both fields
      const errorPaths = result.error.issues.map(issue => issue.path[0]);
      expect(errorPaths).toContain('email');
      expect(errorPaths).toContain('password');
    }
  });
});
