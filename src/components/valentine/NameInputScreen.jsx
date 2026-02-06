import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff0f3 0%, #ffd6e0 50%, #ffb3c6 100%);
  padding: 20px;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: 0 20px 60px rgba(255, 105, 135, 0.2);
  max-width: 420px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-family: 'Georgia', serif;
  font-size: 2rem;
  color: #d63384;
  margin-bottom: 8px;
  font-weight: 400;
`;

const Subtitle = styled.p`
  font-family: 'Georgia', serif;
  font-size: 1rem;
  color: #e07a9f;
  margin-bottom: 32px;
  font-style: italic;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  font-size: 1.1rem;
  font-family: 'Georgia', serif;
  border: 2px solid #ffc2d1;
  border-radius: 12px;
  background: #fff;
  color: #d63384;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &::placeholder {
    color: #e6a4b4;
    font-style: italic;
  }

  &:focus {
    border-color: #ff6b9d;
    box-shadow: 0 0 20px rgba(255, 107, 157, 0.2);
  }
`;

const Button = styled(motion.button)`
  margin-top: 24px;
  padding: 16px 48px;
  font-size: 1.1rem;
  font-family: 'Georgia', serif;
  background: linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%);
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(255, 107, 157, 0.4);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(255, 107, 157, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const HeartIcon = styled.span`
  font-size: 3rem;
  display: block;
  margin-bottom: 16px;
`;

const FloatingHeart = styled(motion.div)`
  position: absolute;
  font-size: ${props => props.size || '24px'};
  opacity: 0.6;
`;

const NameInputScreen = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  const hearts = [
    { x: '10%', y: '15%', size: '28px', delay: 0 },
    { x: '85%', y: '20%', size: '20px', delay: 0.5 },
    { x: '15%', y: '75%', size: '24px', delay: 1 },
    { x: '80%', y: '70%', size: '32px', delay: 1.5 },
    { x: '50%', y: '10%', size: '18px', delay: 2 },
  ];

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {hearts.map((heart, index) => (
        <FloatingHeart
          key={index}
          size={heart.size}
          style={{ left: heart.x, top: heart.y }}
          animate={{
            y: [0, -15, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 3,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          💕
        </FloatingHeart>
      ))}

      <Card
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <HeartIcon>💝</HeartIcon>
        <Title>Welcome, My Angel</Title>
        <Subtitle>A little something special awaits you...but first, enter the name of the most beautiful lady to ever exist :: hint (that's you)</Subtitle>
        
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter your name beautiful..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <Button
            type="submit"
            disabled={!name.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Enter 💕
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default NameInputScreen;
