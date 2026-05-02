import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PlayZone from '@/components/PlayZone';
import React from 'react';

describe('PlayZone Component', () => {
  it('renders the quiz title', () => {
    render(<PlayZone />);
    expect(screen.getByText(/Civic IQ Challenge/i)).toBeDefined();
  });

  it('renders the first question correctly', () => {
    render(<PlayZone />);
    expect(screen.getByText(/Which Article of the Indian Constitution/i)).toBeDefined();
  });
});
