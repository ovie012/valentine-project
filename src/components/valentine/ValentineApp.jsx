import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import NameInputScreen from './NameInputScreen';
import PoemScreen from './PoemScreen';
import QuestionScreen from './QuestionScreen';
import FinalScreen from './FinalScreen';

const ValentineApp = () => {
  const [screen, setScreen] = useState('name');
  const [name, setName] = useState('');

  const handleNameSubmit = (enteredName) => {
    setName(enteredName);
    setScreen('poem');
  };

  const handlePoemComplete = () => {
    setScreen('question');
  };

  const handleYes = () => {
    setScreen('final');
  };

  return (
    <AnimatePresence mode="wait">
      {screen === 'name' && (
        <NameInputScreen key="name" onSubmit={handleNameSubmit} />
      )}
      {screen === 'poem' && (
        <PoemScreen key="poem" name={name} onComplete={handlePoemComplete} />
      )}
      {screen === 'question' && (
        <QuestionScreen key="question" onYes={handleYes} />
      )}
      {screen === 'final' && (
        <FinalScreen key="final" name={name} />
      )}
    </AnimatePresence>
  );
};

export default ValentineApp;
