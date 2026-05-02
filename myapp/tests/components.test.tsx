import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '@/components/ErrorBoundary';
import HeroHub from '@/components/HeroHub';
import PowerMap from '@/components/PowerMap';
import React from 'react';

// Mock Three.js and related components since they don't render in JSDOM
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: any) => <div>{children}</div>,
  useFrame: vi.fn(),
  useThree: vi.fn(),
}));

vi.mock('@react-three/drei', () => ({
  OrbitControls: () => null,
  Stars: () => null,
  Float: ({ children }: any) => <div>{children}</div>,
  Text: ({ children }: any) => <div>{children}</div>,
}));

describe('Core Component Suite', () => {
  it('ErrorBoundary should catch and display fallbacks', () => {
    const ProblematicComponent = () => { throw new Error('Test Error'); };
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText(/Something went wrong/i)).toBeDefined();
  });

  it('HeroHub renders main tagline', () => {
    render(<HeroHub onNavigate={vi.fn()} />);
    expect(screen.getByText(/Empowering Global/i)).toBeDefined();
  });

  it('PowerMap renders 3D container placeholder', () => {
    render(<PowerMap />);
    // Since we mocked Canvas, we check for presence
    expect(screen.getByText(/Power Map/i)).toBeDefined();
  });
});
