import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Profile from '@/components/Profile';

describe('Authentication Flow', () => {
  it('triggers the Google Login flow when Sign in button is clicked', () => {
    const mockLogin = vi.fn();
    
    render(
      <Profile 
        user={null} 
        data={{ age: 20, voterIdStatus: true, displayName: '' }}
        setData={vi.fn()}
        onLogin={mockLogin}
      />
    );
    
    const loginButton = screen.getByText(/Sign in with Google/i);
    fireEvent.click(loginButton);
    
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});
