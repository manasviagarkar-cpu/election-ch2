import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import VoterJourney from '@/components/VoterJourney';
import React from 'react';

describe('VoterJourney Component', () => {
  it('renders the voter journey title', () => {
    render(<VoterJourney userAge={20} />);
    expect(screen.getByText(/Voter Journey/i)).toBeDefined();
  });

  it('detects future voter path for age < 18', () => {
    render(<VoterJourney userAge={16} />);
    expect(screen.getByText(/FUTURE VOTER PATH ACTIVE/i)).toBeDefined();
  });

  it('renders stage cards', () => {
    render(<VoterJourney userAge={20} />);
    expect(screen.getByText(/Stage 1: Beginner/i)).toBeDefined();
    expect(screen.getByText(/Stage 2: Registration/i)).toBeDefined();
    expect(screen.getByText(/Stage 3: Ready to Vote/i)).toBeDefined();
  });
});
