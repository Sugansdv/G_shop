import { useState } from "react";

import shipping from "../assets/images/shipping.png";
import payment from "../assets/images/payment.png";
import support from "../assets/images/support.png";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // email validation
  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubscribe = () => {
    setSuccess(false);

    if (!email) {
      setError("Email address is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setSuccess(true);
    setEmail("");
  };

  return (
    <section className="py-14 px-4">

      {/* TOP FEATURES */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center mb-14">

        {/* Free Shipping */}
        <div className="flex items-center justify-center gap-4">
          <img src={shipping} alt="shipping" className="w-12 h-12" />
          <div className="text-left">
            <h4 className="font-semibold">Free shipping</h4>
            <p className="text-sm text-gray-500">
              Free Shipping for order above ₹500
            </p>
          </div>
        </div>

        {/* Flexible Payment */}
        <div className="flex items-center justify-center gap-4">
          <img src={payment} alt="payment" className="w-12 h-12" />
          <div className="text-left">
            <h4 className="font-semibold">Flexible Payment</h4>
            <p className="text-sm text-gray-500">
              Multiple secure payments options
            </p>
          </div>
        </div>

        {/* Support */}
        <div className="flex items-center justify-center gap-4">
          <img src={support} alt="support" className="w-12 h-12" />
          <div className="text-left">
            <h4 className="font-semibold">24 × 7 Support</h4>
            <p className="text-sm text-gray-500">
              we support online all days
            </p>
          </div>
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="max-w-3xl mx-auto text-center">

        <p className="text-xl text-gray-700 mb-2">
          Our Newsletter
        </p>

        <h2 className="text-3xl md:text-4xl font-bold leading-snug">
          Subscribe to Our Newsletter to <br />
          Get Updates on our latest offers
        </h2>

        <p className="text-gray-500 mt-3">
          Get 25% on your order just by subscribing to newsletter
        </p>

        {/* INPUT */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">

          <div className="w-full md:w-[420px]">
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-full font-bold bg-[#fcf1f1] outline-none"
            />

            {error && (
              <p className="text-red-500 text-sm mt-2 text-left">
                {error}
              </p>
            )}
          </div>

          <button
            onClick={handleSubscribe}
            className="bg-yellow-400 hover:bg-yellow-500 transition px-10 py-1 rounded-full font-semibold text-lg"
          >
            subscribe
          </button>
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="mt-6 bg-green-100 text-green-700 px-6 py-3 rounded-lg inline-block">
            Successfully subscribed to our newsletter!
          </div>
        )}
      </div>
    </section>
  );
}