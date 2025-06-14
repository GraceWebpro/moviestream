import React, { useState } from "react";

const faqData = [
  {
    question: "Is PlayBox free to use?",
    answer: "Yes! All our movies and music downloads are completely free for personal use.",
  },
  {
    question: "Do I need to create an account to download?",
    answer: "No account or login is required. Just find what you like and click download.",
  },
  {
    question: "Are the downloads safe?",
    answer: "Absolutely. We ensure all files are clean and safe for download.",
  },
  {
    question: "Can I request a movie or music?",
    answer: "Yes! Use the contact section below to send us a request via email.",
  },
];

const HomeFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2>Frequently Asked Questions</h2>

        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h4>{faq.question}</h4>
              <span className="faq-toggle">{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>

      <style>{`
        .faq-section {
          background-color: transparent;
          padding: 40px 20px;
          color: #333;
        }

        .faq-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-container h2 {
          text-align: center;
          margin-bottom: 30px;
          color: #fff;
        }

        .faq-item {
          margin-bottom: 15px;
          border-bottom: 1px solid #ddd;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 15px;
          border-radius: 6px;
          background: white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .faq-question h4 {
          margin: 0;
          color: #ff5722;
          font-weight: 600;
        }

        .faq-toggle {
          font-size: 24px;
          color: #333;
          font-weight: bold;
          margin-left: 10px;
        }

        .faq-answer {
          margin-top: 10px;
          font-size: 16px;
          line-height: 1.5;
          color: #555;
          animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default HomeFAQ;
