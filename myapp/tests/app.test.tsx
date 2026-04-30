import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GlobalCivicPlatform from '@/app/page';

// Mock matchMedia for window since we are rendering a component that uses framer-motion or something similar
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock Three.js canvas since it might cause issues in JSDOM
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: any) => <div>{children}</div>,
  useFrame: () => {},
}));

vi.mock('@react-three/drei', () => ({
  OrbitControls: () => null,
  Sphere: ({ children }: any) => <div>{children}</div>,
  MeshDistortMaterial: () => null,
  Stars: () => null,
}));

describe('App Rendering', () => {
  it('renders the Main Dashboard (HeroHub) by default without crashing', () => {
    render(<GlobalCivicPlatform />);
    expect(screen.getByText(/Global Civic Intelligence/i)).toBeInTheDocument();
  });

  it('renders the Navigation Hotbar with all expected items', () => {
    render(<GlobalCivicPlatform />);
    const navItems = ['Dashboard', 'Voter Journey', 'System Lab', 'Quiz', 'Profile'];
    navItems.forEach(item => {
      // Hotbar uses uppercase for its labels, but standard search is case insensitive
      const items = screen.getAllByText(new RegExp(item, 'i'));
      expect(items.length).toBeGreaterThan(0);
    });
  });
});
