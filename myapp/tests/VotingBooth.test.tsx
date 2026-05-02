import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import VotingBooth from '@/components/VotingBooth';
import React from 'react';

// Mock Three.js
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: any) => <div>{children}</div>,
  useFrame: vi.fn(),
  useThree: vi.fn(),
}));

describe('VotingBooth Component', () => {
  it('renders the voting booth title', () => {
    render(<VotingBooth />);
    expect(screen.getByText(/Digital Voting Booth/i)).toBeDefined();
  });

  it('renders the ballot options', () => {
    render(<VotingBooth />);
    expect(screen.getByText(/Party A/i)).toBeDefined();
    expect(screen.getByText(/Party B/i)).toBeDefined();
  });
});
