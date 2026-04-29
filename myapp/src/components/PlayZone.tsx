'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Brain, Scale, Zap, ArrowLeft, Trophy, Award } from 'lucide-react';

type Question = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export default function PlayZone() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions: Question[] = [
    {
      question: "Which Article of the Indian Constitution grants the Election Commission the power of superintendence?",
      options: ["Article 320", "Article 324", "Article 328", "Article 330"],
      correct: 1,
      explanation: "Article 324 provides for the superintendence, direction and control of elections to be vested in an Election Commission."
    },
    {
      question: "Who was the first Chief Election Commissioner of India?",
      options: ["Sukumar Sen", "K.V.K. Sundaram", "S.P. Sen Verma", "Nagendra Singh"],
      correct: 0,
      explanation: "Sukumar Sen served as the first Chief Election Commissioner of India from 1950 to 1958."
    },
    {
      question: "What is the maximum number of members in the Lok Sabha as per the Constitution?",
      options: ["530", "545", "550", "552"],
      correct: 3,
      explanation: "The maximum strength of the House is 552 members - 530 members to represent the States, 20 members to represent the Union Territories, and 2 members to be nominated by the President from the Anglo-Indian Community."
    },
    {
      question: "Which amendment lowered the voting age from 21 to 18?",
      options: ["42nd Amendment", "44th Amendment", "61st Amendment", "73rd Amendment"],
      correct: 2,
      explanation: "The 61st Amendment Act of 1988 lowered the voting age for the Lok Sabha and State Legislative Assembly elections."
    },
    {
      question: "The Rajya Sabha is known as the 'Permanent House' because:",
      options: ["It cannot be dissolved", "Members are elected for life", "It meets every day", "It represents the States"],
      correct: 0,
      explanation: "The Rajya Sabha is a permanent body and is not subject to dissolution."
    },
    {
      question: "Which body conducts elections to the Panchayats and Municipalities?",
      options: ["Election Commission of India", "State Election Commission", "Ministry of Home Affairs", "District Magistrate"],
      correct: 1,
      explanation: "State Election Commissions are responsible for conducting elections to local bodies like Panchayats and Municipalities."
    },
    {
      question: "The 'None of the Above' (NOTA) option was first introduced in India in:",
      options: ["2009", "2013", "2014", "2015"],
      correct: 1,
      explanation: "The Supreme Court directed the Election Commission to provide a NOTA button in 2013."
    },
    {
      question: "Which schedule of the Indian Constitution contains the Anti-Defection Law?",
      options: ["8th Schedule", "9th Schedule", "10th Schedule", "11th Schedule"],
      correct: 2,
      explanation: "The 10th Schedule, added by the 52nd Amendment in 1985, contains provisions regarding disqualification on grounds of defection."
    },
    {
      question: "Who appoints the Chief Election Commissioner?",
      options: ["The Prime Minister", "The President", "The Chief Justice", "The Parliament"],
      correct: 1,
      explanation: "The President of India appoints the Chief Election Commissioner and other Election Commissioners."
    },
    {
      question: "The concept of 'Universal Adult Franchise' means:",
      options: ["Only educated people can vote", "Only taxpayers can vote", "All citizens 18+ can vote without discrimination", "Only land owners can vote"],
      correct: 2,
      explanation: "It ensures every citizen 18 or older has the right to vote regardless of caste, creed, religion, or gender."
    }
  ];

  const handleOptionSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedOption(index);
    setShowFeedback(true);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'radial-gradient(circle at center, rgba(26, 35, 126, 0.1) 0%, transparent 70%)', paddingBottom: '100px' }}>
      <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#1A237E', textShadow: '0 0 15px rgba(26, 35, 126, 0.3)' }}>
        Civic IQ Challenge
      </h2>
      <p style={{ color: '#aaa', marginBottom: '3.5rem', fontSize: '1.2rem' }}>Level: High Intelligence | Questions: 10</p>

      <AnimatePresence mode="wait">
        {!quizComplete ? (
          <motion.div 
            key="quiz-active"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            style={{ width: '90%', maxWidth: '800px' }}
          >
            {/* Progress Bar */}
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '3rem', overflow: 'hidden' }}>
              <motion.div 
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                style={{ height: '100%', background: '#1A237E', boxShadow: '0 0 10px #1A237E' }}
              />
            </div>

            <div className="glass-panel" style={{ padding: '3.5rem', border: '1px solid rgba(26, 35, 126, 0.2)' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '3rem', lineHeight: '1.5' }}>
                <span style={{ color: '#1A237E', marginRight: '15px' }}>{currentQuestion + 1}.</span>
                {questions[currentQuestion].question}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.2rem' }}>
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    style={{
                      padding: '1.5rem 2rem',
                      background: selectedOption === index 
                        ? (index === questions[currentQuestion].correct ? 'rgba(46, 125, 50, 0.2)' : 'rgba(211, 47, 47, 0.2)')
                        : 'rgba(255,255,255,0.03)',
                      border: `2px solid ${
                        selectedOption === index 
                          ? (index === questions[currentQuestion].correct ? '#2E7D32' : '#D32F2F')
                          : (showFeedback && index === questions[currentQuestion].correct ? '#2E7D32' : 'rgba(255,255,255,0.08)')
                      }`,
                      borderRadius: '15px',
                      cursor: showFeedback ? 'default' : 'pointer',
                      fontSize: '1.1rem',
                      color: '#fff',
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    {option}
                    {showFeedback && index === questions[currentQuestion].correct && <CheckCircle2 color="#2E7D32" />}
                    {showFeedback && selectedOption === index && index !== questions[currentQuestion].correct && <XCircle color="#D32F2F" />}
                  </motion.button>
                ))}
              </div>

              {showFeedback && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '3rem' }}>
                  <div style={{ padding: '1.5rem', background: 'rgba(26, 35, 126, 0.05)', borderRadius: '12px', borderLeft: '5px solid #1A237E', marginBottom: '2.5rem' }}>
                    <p style={{ color: '#ccc', fontSize: '1rem', lineHeight: '1.6' }}>{questions[currentQuestion].explanation}</p>
                  </div>
                  <button className="neon-btn" onClick={handleNext} style={{ width: '100%', background: '#1A237E', borderColor: '#1A237E', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '1.2rem' }}>
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Report Card'} <ChevronRight size={20} />
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel" 
            style={{ width: '90%', maxWidth: '600px', padding: '4rem', textAlign: 'center', border: '1px solid #1A237E' }}
          >
            <Award size={80} color="#1A237E" style={{ marginBottom: '2rem' }} />
            <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Civic Score Report</h3>
            <div style={{ fontSize: '4rem', fontWeight: 900, color: '#1A237E', margin: '2rem 0' }}>
              {score * 10}%
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '3rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <p style={{ color: '#888', fontSize: '0.8rem' }}>Correct</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{score}</p>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <p style={{ color: '#888', fontSize: '0.8rem' }}>Questions</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>10</p>
              </div>
            </div>
            <p style={{ color: '#aaa', marginBottom: '3rem', lineHeight: '1.6' }}>
              {score >= 8 ? "Outstanding! You possess an elite understanding of the democratic framework." : "Good effort. Review the explanations to strengthen your civic foundation."}
            </p>
            <button className="neon-btn" onClick={resetQuiz} style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '0 auto', background: '#1A237E' }}>
              <RotateCcw size={20} /> Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
