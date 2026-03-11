import { useEffect, useState } from "react";
import { getCards, saveCard } from "../../api/paymentApi";

export default function PaymentMethod() {

  const [cards, setCards] = useState([]);

  const [form, setForm] = useState({
    card_holder: "",
    card_number: "",
    expiry_month: "",
    expiry_year: "",
  });

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    const res = await getCards();
    setCards(res.data);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await saveCard(form);

    setForm({
      card_holder: "",
      card_number: "",
      expiry_month: "",
      expiry_year: "",
    });

    loadCards();
  };

  return (

    <div className="max-w-xl">

      {/* SAVED CARDS */}

      <div className="space-y-4 mb-8">

        {cards.map(card => (

          <div
            key={card.id}
            className="border p-4 rounded-lg"
          >

            <p className="font-medium">
              {card.card_holder}
            </p>

            <p className="text-gray-500">
              {card.card_number}
            </p>

            <p className="text-sm">
              Exp: {card.expiry_month}/{card.expiry_year}
            </p>

          </div>

        ))}

      </div>


      {/* ADD CARD FORM */}

      <div className="border p-6 rounded-lg">

        <h3 className="font-semibold mb-4">
          Add New Credit / Debit Card
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            placeholder="Card Holder Name"
            value={form.card_holder}
            onChange={(e) =>
              setForm({...form, card_holder:e.target.value})
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            placeholder="Card Number"
            value={form.card_number}
            onChange={(e) =>
              setForm({...form, card_number:e.target.value})
            }
            className="w-full border p-3 rounded-lg"
          />

          <div className="flex gap-4">

            <input
              placeholder="MM"
              value={form.expiry_month}
              onChange={(e) =>
                setForm({...form, expiry_month:e.target.value})
              }
              className="border p-3 rounded-lg w-full"
            />

            <input
              placeholder="YY"
              value={form.expiry_year}
              onChange={(e) =>
                setForm({...form, expiry_year:e.target.value})
              }
              className="border p-3 rounded-lg w-full"
            />

          </div>

          <button
            className="bg-green-700 text-white px-6 py-2 rounded-full"
          >
            Add Card
          </button>

        </form>

      </div>

    </div>
  );
}