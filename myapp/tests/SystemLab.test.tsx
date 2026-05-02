import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SystemLab from '@/components/SystemLab';
import React from 'react';

describe('SystemLab Component', () => {
  it('renders the parliamentary title', () => {
    render(<SystemLab />);
    expect(screen.getByText(/Parliamentary Architecture/i)).toBeDefined();
  });

  it('renders Lok Sabha section by default', () => {
    render(<SystemLab />);
    expect(screen.getByText(/Lok Sabha \(18th\)/i)).toBeDefined();
  });
});
