import { useState } from "react";
import Newsletter from "../components/Newsletter";
const faqData = {
  "General Information": [
    {
      question: "Are the products fresh and of high quality?",
      answer:
        "Yes. All our products are sourced daily from trusted suppliers and undergo strict quality checks before delivery.",
    },
    {
      question: "What are your delivery hours?",
      answer:
        "We deliver every day from 9:00 AM to 10:00 PM. Delivery timing may vary slightly based on your location.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Credit/Debit cards, UPI, Net Banking, and Cash on Delivery.",
    },
    {
      question: "Do you offer any discounts or promotions?",
      answer:
        "Yes, seasonal discounts, referral rewards, and promotional offers are available regularly.",
    },
    {
      question: "How can I provide feedback about my experience?",
      answer:
        "You can submit feedback through your account dashboard or contact our support team anytime.",
    },
    {
      question: "Do you offer bulk ordering for events or businesses?",
      answer:
        "Yes, bulk ordering is available. Please contact our business support team for special pricing.",
    },
  ],

  "Ordering and payment": [
    {
      question: "How do I place an order?",
      answer:
        "Browse products, add items to cart, and complete checkout securely.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Orders can be canceled before dispatch from the orders section.",
    },
  ],

  "Delivery and pickup": [
    {
      question: "Do you provide same-day delivery?",
      answer: "Yes, same-day delivery is available in selected locations.",
    },
    {
      question: "Can I schedule delivery?",
      answer: "You can select a preferred delivery slot during checkout.",
    },
  ],

  "Products and Availability": [
    {
      question: "Why are some products unavailable?",
      answer:
        "Availability depends on stock levels and supplier delivery schedules.",
    },
  ],

  "Account & Profile": [
    {
      question: "How do I update my profile?",
      answer:
        "Go to Account Settings → Profile to update personal information.",
    },
    {
      question: "I forgot my password. What should I do?",
      answer: "Use the Forgot Password option on the login page.",
    },
  ],
};

export default function FAQ() {
  const categories = Object.keys(faqData);

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen p-4 md:p-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">

        {/* Sidebar */}
        <div className="md:col-span-1 space-y-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl border transition
              ${
                activeCategory === cat
                  ? "bg-yellow-400 text-black font-semibold"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Content */}
        <div className="md:col-span-3 space-y-4">
          {faqData[activeCategory].map((item, index) => (
            <div
              key={index}
              className={`rounded-xl border overflow-hidden transition-all
              ${
                openIndex === index
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {/* Question */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-medium">{item.question}</span>

                <span className="text-xl font-bold">
                  {openIndex === index ? "—" : "+"}
                </span>
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="px-5 pb-5 text-sm opacity-90">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      <Newsletter />
    </div>
  );
}