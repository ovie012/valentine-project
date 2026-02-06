import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffd6e0 0%, #ffb3c6 50%, #ff8fab 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const Greeting = styled(motion.h1)`
  font-family: 'Georgia', serif;
  font-size: 2.5rem;
  color: white;
  text-shadow: 0 4px 20px rgba(214, 51, 132, 0.3);
  margin-bottom: 40px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const PoemContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: 0 20px 60px rgba(255, 105, 135, 0.3);
  max-width: 500px;
  width: 100%;
  text-align: center;

  @media (max-width: 480px) {
    padding: 32px 24px;
  }
`;

const PoemText = styled(motion.p)`
  font-family: 'Georgia', serif;
  font-size: 1.4rem;
  line-height: 1.8;
  color: #d63384;
  font-style: italic;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const PoemNumber = styled.span`
  display: block;
  font-size: 0.9rem;
  color: #e6a4b4;
  margin-top: 24px;
  font-style: normal;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  font-size: ${props => props.size || '24px'};
  opacity: 0.5;
  pointer-events: none;
`;

const poems = [
  "From the moment I saw you smile,\nI knew my heart had chosen you.",
  "Your beauty isn't just what I see,\nIt's how my world feels lighter with you in it.",
  "Some things don't take time to know,\nYou were my yes from the very start.",
  "Every moment with you feels like\na dream I never want to wake from.",
  "You're not just someone special,\nYou're everything I never knew I needed."
];

const PoemScreen = ({ name, onComplete }) => {
  const [showGreeting, setShowGreeting] = useState(true);
  const [currentPoem, setCurrentPoem] = useState(0);

  useEffect(() => {
    const greetingTimer = setTimeout(() => {
      setShowGreeting(false);
    }, 2500);

    return () => clearTimeout(greetingTimer);
  }, []);

  useEffect(() => {
    if (!showGreeting) {
      const poemTimer = setTimeout(() => {
        if (currentPoem < poems.length - 1) {
          setCurrentPoem(prev => prev + 1);
        } else {
          setTimeout(() => onComplete(), 1500);
        }
      }, 4000);

      return () => clearTimeout(poemTimer);
    }
  }, [showGreeting, currentPoem, onComplete]);

  const floatingElements = [
    { emoji: '💕', x: '5%', y: '10%', size: '32px', delay: 0 },
    { emoji: '🌸', x: '90%', y: '15%', size: '28px', delay: 0.5 },
    { emoji: '💗', x: '8%', y: '80%', size: '26px', delay: 1 },
    { emoji: '✨', x: '88%', y: '75%', size: '24px', delay: 1.5 },
    { emoji: '💖', x: '50%', y: '5%', size: '30px', delay: 2 },
    { emoji: '🌷', x: '15%', y: '45%', size: '22px', delay: 2.5 },
    { emoji: '💝', x: '85%', y: '50%', size: '28px', delay: 3 },
  ];

  return (
    <Container>
      {floatingElements.map((el, index) => (
        <FloatingElement
          key={index}
          size={el.size}
          style={{ left: el.x, top: el.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [-10, 10, -10],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            delay: el.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {el.emoji}
        </FloatingElement>
      ))}

      <AnimatePresence mode="wait">
        {showGreeting ? (
          <Greeting
            key="greeting"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
          >
            Hello, {name} 💕
          </Greeting>
        ) : (
          <PoemContainer
            key="poem"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <PoemText
                key={currentPoem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                "{poems[currentPoem]}"
                <PoemNumber>{currentPoem + 1} / {poems.length}</PoemNumber>
              </PoemText>
            </AnimatePresence>
          </PoemContainer>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default PoemScreen;
