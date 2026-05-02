import { useState, useCallback } from 'react';

/**
 * Custom Hook: useVoterStatus
 * Centralizes voter eligibility and status logic (DRY Principle)
 */
export function useVoterStatus(initialAge: number = 18) {
  const [age, setAge] = useState(initialAge);
  const [hasVoterId, setHasVoterId] = useState(false);

  const isEligible = age >= 18;
  
  const getVoterStatusMessage = useCallback(() => {
    if (age < 18) return `Ineligible (Wait ${18 - age} more years)`;
    if (!hasVoterId) return 'Eligible (Action Required: Get Voter ID)';
    return 'Fully Ready to Vote';
  }, [age, hasVoterId]);

  return {
    age,
    setAge,
    hasVoterId,
    setHasVoterId,
    isEligible,
    statusMessage: getVoterStatusMessage()
  };
}
