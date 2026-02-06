import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const float = keyframes`
  0%, 100% { transform: translateY(100vh) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff6b9d 0%, #e05780 50%, #c9184a 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const CelebrationCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 40px;
  padding: 60px 48px;
  box-shadow: 
    0 40px 100px rgba(201, 24, 74, 0.4),
    0 0 60px rgba(255, 107, 157, 0.3);
  max-width: 520px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 10;

  @media (max-width: 480px) {
    padding: 40px 24px;
    border-radius: 32px;
  }
`;

const BigHeart = styled(motion.div)`
  font-size: 6rem;
  margin-bottom: 24px;
  animation: ${pulse} 1.5s ease-in-out infinite;

  @media (max-width: 480px) {
    font-size: 4rem;
  }
`;

const Title = styled(motion.h1)`
  font-family: 'Georgia', serif;
  font-size: 2.2rem;
  color: #d63384;
  margin-bottom: 16px;
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-family: 'Georgia', serif;
  font-size: 1.2rem;
  color: #e07a9f;
  font-style: italic;
  margin-bottom: 32px;
  line-height: 1.6;
`;

const FloatingHeart = styled.div`
  position: absolute;
  font-size: ${props => props.size || '24px'};
  left: ${props => props.left};
  animation: ${float} ${props => props.duration || '8s'} linear infinite;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0.8;
`;

const Sparkle = styled.div`
  position: absolute;
  font-size: ${props => props.size || '16px'};
  left: ${props => props.left};
  top: ${props => props.top};
  animation: ${sparkle} ${props => props.duration || '2s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const DateBadge = styled(motion.div)`
  display: inline-block;
  background: linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%);
  color: white;
  padding: 12px 28px;
  border-radius: 30px;
  font-family: 'Georgia', serif;
  font-size: 1rem;
  box-shadow: 0 8px 24px rgba(255, 107, 157, 0.4);
  margin-top: 8px;
`;

const LoveMessage = styled(motion.p)`
  font-family: 'Georgia', serif;
  font-size: 1rem;
  color: #c9184a;
  margin-top: 32px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #fff0f3 0%, #ffd6e0 100%);
  border-radius: 16px;
`;

const FinalScreen = ({ name }) => {
  const [hearts] = useState(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 20 + 16}px`,
      duration: `${Math.random() * 6 + 6}s`,
      delay: `${Math.random() * 5}s`,
      emoji: ['💖', '💕', '💗', '💝', '💘', '🌸', '🌷', '✨'][Math.floor(Math.random() * 8)]
    }))
  );

  const [sparkles] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 12 + 10}px`,
      duration: `${Math.random() * 2 + 1.5}s`,
      delay: `${Math.random() * 3}s`,
    }))
  );

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <Container>
      {hearts.map((heart) => (
        <FloatingHeart
          key={heart.id}
          left={heart.left}
          size={heart.size}
          duration={heart.duration}
          delay={heart.delay}
        >
          {heart.emoji}
        </FloatingHeart>
      ))}

      {sparkles.map((s) => (
        <Sparkle
          key={s.id}
          left={s.left}
          top={s.top}
          size={s.size}
          duration={s.duration}
          delay={s.delay}
        >
          ✨
        </Sparkle>
      ))}

      <CelebrationCard
        initial={{ opacity: 0, scale: 0.5, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.34, 1.56, 0.64, 1],
          delay: 0.2 
        }}
      >
        <BigHeart>💘</BigHeart>

        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Thank you for being my Valentine 💕
        </Title>

        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {capitalize(name)}, you've just made me the happiest person in the world!
        </Subtitle>

        <DateBadge
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
        >
          💝 Official since {today} 💝
        </DateBadge>

        <LoveMessage
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          Every love story is beautiful, but ours will be my favorite. 
          <br />
          Here's to our forever 💖
        </LoveMessage>
      </CelebrationCard>
    </Container>
  );
};

export default FinalScreen;
