import { useEffect, useState } from "react";
import {
  getAddresses,
  addAddress,
  deleteAddress,
  updateAddress,
} from "../../api/addressApi";

export default function ManageAddress() {

  const [addresses, setAddresses] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    const res = await getAddresses();
    setAddresses(res.data);
  };

  /* ================= ADD / UPDATE ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    const form = new FormData(e.target);
    const data = Object.fromEntries(form);

    try {

      if (editing) {
        await updateAddress(editing, data);
      } else {
        await addAddress(data);
      }

      e.target.reset();
      setEditing(null);
      loadAddresses();

    } catch {
      alert("Failed to save address");
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {

    if (!window.confirm("Delete address?")) return;

    await deleteAddress(id);
    loadAddresses();
  };

  /* ================= EDIT ================= */

  const handleEdit = (a) => {

    setEditing(a.id);

    const form = document.getElementById("addressForm");

    form.first_name.value = a.first_name;
    form.last_name.value = a.last_name;
    form.company.value = a.company || "";
    form.country.value = a.country;
    form.street_address.value = a.street_address;
    form.city.value = a.city;
    form.state.value = a.state;
    form.zip_code.value = a.zip_code;
    form.phone.value = a.phone;
    form.email.value = a.email;
  };

  return (

    <div className="max-w-3xl space-y-8">

      {/* ================= ADDRESS LIST ================= */}

      {addresses.map((a) => (

        <div
          key={a.id}
          className="border rounded-xl p-4 flex justify-between items-center"
        >

          <div>
            <p className="font-semibold uppercase">
              {a.first_name}
            </p>

            <p className="text-sm text-gray-600">
              {a.street_address}, {a.city}, {a.zip_code}
            </p>
          </div>

          <div className="flex gap-4 text-green-700 text-sm">

            <button onClick={() => handleEdit(a)}>
              Edit
            </button>

            <button onClick={() => handleDelete(a.id)}>
              Delete
            </button>

          </div>

        </div>

      ))}

      {/* ================= FORM ================= */}

      <form
        id="addressForm"
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div className="grid grid-cols-2 gap-6">

          <Input label="First Name *" name="first_name" />
          <Input label="Last Name *" name="last_name" />

        </div>

        <Input label="Company NAME (OPTIONAL)" name="company" />

        <Input label="Country *" name="country" />

        <Input label="Street Address *" name="street_address" />

        <Input label="City *" name="city" />

        <Input label="State *" name="state" />

        <Input label="Zip code *" name="zip_code" />

        <Input label="Phone *" name="phone" />

        <Input label="Email *" name="email" />

        <button
          className="bg-green-700 text-white px-6 py-2 rounded-full"
        >
          {editing ? "Update Address" : "Add Address"}
        </button>

      </form>

    </div>
  );
}


/* ================= INPUT COMPONENT ================= */

function Input({ label, name }) {

  return (

    <div>

      <label className="block mb-1 text-sm">
        {label}
      </label>

      <input
        name={name}
        required
        className="w-full border rounded-lg px-4 py-2"
      />

    </div>

  );
}