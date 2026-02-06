import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff8fab 0%, #ff6b9d 50%, #e05780 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const QuestionCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 32px;
  padding: 60px 48px;
  box-shadow: 0 30px 80px rgba(214, 51, 132, 0.4);
  max-width: 500px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 10;

  @media (max-width: 480px) {
    padding: 40px 24px;
  }
`;

const HeartIcon = styled(motion.span)`
  font-size: 4rem;
  display: block;
  margin-bottom: 24px;
`;

const Question = styled.h1`
  font-family: 'Georgia', serif;
  font-size: 2rem;
  color: #d63384;
  margin-bottom: 40px;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const YesButton = styled(motion.button)`
  padding: ${props => `${16 + props.growth}px ${48 + props.growth * 2}px`};
  font-size: ${props => `${1.2 + props.growth * 0.02}rem`};
  font-family: 'Georgia', serif;
  background: linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%);
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(255, 107, 157, 0.5);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(255, 107, 157, 0.6);
  }
`;

const NoButton = styled(motion.button)`
  position: ${props => props.escaped ? 'fixed' : 'relative'};
  left: ${props => props.escaped ? props.x : 'auto'};
  top: ${props => props.escaped ? props.y : 'auto'};
  padding: 12px 32px;
  font-size: 1rem;
  font-family: 'Georgia', serif;
  background: transparent;
  color: #e6a4b4;
  border: 2px solid #ffc2d1;
  border-radius: 30px;
  cursor: pointer;
  transition: ${props => props.escaped ? 'none' : 'all 0.3s ease'};
  z-index: 100;

  &:hover {
    background: #fff0f3;
  }
`;

const FloatingHeart = styled(motion.div)`
  position: absolute;
  font-size: ${props => props.size || '24px'};
  opacity: 0.4;
  pointer-events: none;
`;

const PlayfulMessage = styled(motion.p)`
  font-family: 'Georgia', serif;
  font-size: 0.9rem;
  color: #e6a4b4;
  margin-top: 20px;
  font-style: italic;
`;

const messages = [
  "Nice try! 😏",
  "Are you sure about that? 💕",
  "Think again, beautiful! 🌸",
  "I won't give up! 💖",
  "Almost got it! 😊",
  "Come on, you know the answer! 💝",
  "Omotena, come on nau 👀",
  "Asamn, stop eet..you know the right thing 😉",
  "Ajoke, joor nau 😅",
  "oh baby girl, i'm waiting 😉"
];

const QuestionScreen = ({ onYes }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0, escaped: false });
  const [yesGrowth, setYesGrowth] = useState(0);
  const [message, setMessage] = useState('');
  const [messageKey, setMessageKey] = useState(0);

  const handleNoClick = useCallback(() => {
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 60;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    setNoButtonPos({ x: newX, y: newY, escaped: true });
    setYesGrowth(prev => Math.min(prev + 2, 20));
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
    setMessageKey(prev => prev + 1);
  }, []);

  const floatingHearts = [
    { x: '5%', y: '10%', size: '36px', delay: 0 },
    { x: '92%', y: '8%', size: '28px', delay: 0.5 },
    { x: '3%', y: '85%', size: '32px', delay: 1 },
    { x: '90%', y: '80%', size: '40px', delay: 1.5 },
    { x: '50%', y: '3%', size: '24px', delay: 2 },
  ];

  return (
    <Container>
      {floatingHearts.map((heart, index) => (
        <FloatingHeart
          key={index}
          size={heart.size}
          style={{ left: heart.x, top: heart.y }}
          animate={{
            y: [0, -25, 0],
            rotate: [-15, 15, -15],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 3.5,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          💖
        </FloatingHeart>
      ))}

      <QuestionCard
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <HeartIcon
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          💖
        </HeartIcon>

        <Question>Will you be my valentine? 💕</Question>

        <ButtonContainer>
          <YesButton
            growth={yesGrowth}
            onClick={onYes}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            YES 💝
          </YesButton>

          {!noButtonPos.escaped && (
            <NoButton
              onClick={handleNoClick}
              whileHover={{ scale: 1.02 }}
            >
              No
            </NoButton>
          )}
        </ButtonContainer>

        {message && (
          <PlayfulMessage
            key={messageKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </PlayfulMessage>
        )}
      </QuestionCard>

      {noButtonPos.escaped && (
        <NoButton
          escaped={true}
          x={`${noButtonPos.x}px`}
          y={`${noButtonPos.y}px`}
          onClick={handleNoClick}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        >
          No
        </NoButton>
      )}
    </Container>
  );
};

export default QuestionScreen;
