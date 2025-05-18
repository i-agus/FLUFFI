import React, { useState } from 'react';
import './FAQs.css';

const questions = [
  {
    question: "What is Furever?",
    answer: "Furever is a pet adoption platform that connects loving families with pets from shelters and rescues.",
  },
  {
    question: "How do I adopt a pet?",
    answer: "You can browse available pets and click 'Adopt Me' to start the adoption process. A shelter representative will then contact you.",
  },
  {
    question: "Is there any adoption fee?",
    answer: "Yes, there might be a small fee depending on the pet and the shelter. It covers vaccinations and basic care.",
  },
  {
    question: "Can I donate or volunteer?",
    answer: "Absolutely! We welcome volunteers and donors. Contact us through our contact page for more details.",
  },
  {
    question: "How do you ensure the pets are healthy?",
    answer: "All pets listed on Furever are checked by veterinarians and are vaccinated, dewormed, and treated if needed before being listed.",
  },
  {
    question: "Do you support foster care?",
    answer: "Yes! Furever supports fostering programs and works with shelters that encourage temporary care before full adoption.",
  },
  {
    question: "Can I adopt more than one pet?",
    answer: "Yes, every pet needs a loving home. As long as you can take care of all the adopted pets, you can definitely adopt more than one pet."
  },
  {
    question: "Are your services available internationally?",
    answer: "Currently, Furever operates within specific regions. We are working to expand our services to new areas soon.",
  },
  {
    question: "How can shelters list pets on Furever?",
    answer: "Shelters can register with us as partners and get access to their own dashboard for uploading pet profiles, managing applications, and communicating with adopters.",
  }
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <div className="faq-list">
        {questions.map((faq, index) => (
          <div className="faq-wrapper" key={index} onClick={() => toggleFAQ(index)}>
  <div className={`faq-card ${activeIndex === index ? 'active' : ''}`}>
    <div className="faq-question">{faq.question}</div>
    <div className="faq-answer">{faq.answer}</div>
  </div>
</div>

        ))}
      </div>
    </div>
  );
};

export default FAQs;
