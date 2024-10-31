import React, { useState } from 'react';
import './faq.css';

const Faq = () => {
  const [active, setActive] = useState(null);

  const handleToggle = (index) => {
    setActive(active === index ? null : index)
  };

  const questions = [
    {question: 'What is Netflix?',
    answer: 'Netflix is a streamling service that offers a wide range of award-winnig TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.'},
    {question: 'What can i watch?',
        answer: 'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more.\nWatch as you want, anytime you want.'},
    {question: 'What is Screetime?',
        answer: 'Netflix allows you to manage the screen time for you and your loved ones, screen time is the amount of time spent you spend using your smartphone to perform activies like watching movies, reading, playing games.'},
    {question: 'Where to watch?',
        answer: 'Watch anywhere, anytime. Sign in to your account and instantly on the web from your personal computer or any internet connected device that offers the netflix app including Tv, smartphones, tablets, laptops, game consoles, and media players.'},
  ];

  return (
    <div className='faq'>
        <h3>Frequently Asked Questions</h3>
        <div className="faq-list">
            {questions.map((faq, index) => (
                <div key={index} className='faq-item'>
                    <div className="faq-question" onClick={() => handleToggle(index)}>
                        {faq.question}<span>{ active === index ? '-' : '+'}</span>
                    </div>
                    {active === index && <div className='faq-answer'>{faq.answer}</div>}
                </div>
            ))}
        </div>
    </div>
  );
};


export default Faq;