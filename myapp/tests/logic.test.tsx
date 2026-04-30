import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VoterJourney from '@/components/VoterJourney';

describe('Voter Journey Logic', () => {
  it('identifies user under 18 and shows FUTURE VOTER PATH message', () => {
    render(<VoterJourney userAge={17} />);
    
    // Check if the specific text for under 18 is present
    expect(screen.getByText(/AUTO-DETECT: FUTURE VOTER PATH ACTIVE/i)).toBeInTheDocument();
  });

  it('does not show FUTURE VOTER PATH message for users 18 or older', () => {
    render(<VoterJourney userAge={18} />);
    
    // The specific text should not be present
    expect(screen.queryByText(/AUTO-DETECT: FUTURE VOTER PATH ACTIVE/i)).not.toBeInTheDocument();
  });
});
