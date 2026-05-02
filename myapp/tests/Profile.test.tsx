import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Profile from '@/components/Profile';
import React from 'react';

describe('Profile Component', () => {
  const mockProps = {
    user: { displayName: 'Test User', email: 'test@example.com', photoURL: null },
    data: { age: 25, voterIdStatus: true, displayName: 'Test User' },
    setData: vi.fn(),
    onLogin: vi.fn(),
  };

  it('renders user information when logged in', () => {
    render(<Profile {...mockProps} />);
    expect(screen.getByText(/Test User/i)).toBeDefined();
    expect(screen.getByText(/VERIFIED CITIZEN/i)).toBeDefined();
  });

  it('renders login button when not logged in', () => {
    render(<Profile {...mockProps} user={null} />);
    expect(screen.getByText(/Sign in with Google/i)).toBeDefined();
  });
});
