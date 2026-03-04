import { useEffect, useState, useRef } from "react";
import { getProfile, updateProfile } from "../../api/profileApi";

import defaultAvatar from "../../assets/images/default_user.webp";
import editIcon from "../../assets/images/edit.png";

export default function PersonalInfo() {

  const fileInput = useRef(null);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    profile_image: null,
  });

  const [preview, setPreview] = useState(defaultAvatar);

  /* ---------- LOAD PROFILE ---------- */

  useEffect(() => {

  const fetchProfile = async () => {

    try {

      const res = await getProfile();

      setForm({
        first_name: res.data.first_name || "",
        last_name: res.data.last_name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        gender: res.data.gender || "",
        profile_image: null,
      });

      const baseURL = import.meta.env.VITE_API_URL.replace("/api", "");

      const imageURL = res.data.profile_image
        ? `${baseURL}${res.data.profile_image}`
        : defaultAvatar;

      setPreview(imageURL);

    } catch (err) {
      console.log(err);
    }

  };

  fetchProfile();

}, []);

  /* ---------- INPUT CHANGE ---------- */

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  /* ---------- IMAGE CHANGE ---------- */

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setForm({
      ...form,
      profile_image: file,
    });

    setPreview(URL.createObjectURL(file));

  };

  /* ---------- OPEN FILE SELECT ---------- */

  const openFilePicker = () => {
    fileInput.current.click();
  };

  /* ---------- UPDATE PROFILE ---------- */

const handleSubmit = async (e) => {

  e.preventDefault();

  const formData = new FormData();

  formData.append("first_name", form.first_name);
  formData.append("last_name", form.last_name);
  formData.append("email", form.email);
  formData.append("phone", form.phone);
  formData.append("gender", form.gender);

  if (form.profile_image) {
    formData.append("profile_image", form.profile_image);
  }

  try {

    const res = await updateProfile(formData);

    const baseURL = import.meta.env.VITE_API_URL;

    if (res.data?.data?.profile_image) {
      setPreview(`${baseURL}${res.data.data.profile_image}`);
    }

    alert("Profile updated successfully");

  } catch (err) {

    console.log(err);
    alert("Update failed");

  }

};

  return (

    <div className="px-2 rounded-lg w-full">

      {/* PROFILE IMAGE */}
      <div className="relative w-20 mb-6">

        <img
          src={preview}
          className="w-20 h-20 rounded-full object-cover"
        />

        {/* EDIT ICON */}

        <button
          onClick={openFilePicker}
          className="
          absolute
          bottom-0
          right-0
          bg-[#7b3b36]
          p-1.5
          rounded-full
          "
        >
          <img
            src={editIcon}
            className="w-4 h-4"
          />
        </button>

        {/* HIDDEN FILE INPUT */}

        <input
          type="file"
          ref={fileInput}
          onChange={handleImage}
          className="hidden"
        />

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* FIRST + LAST */}

        <div className="grid grid-cols-2 gap-8">

          <Field
            label="First Name *"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
          />

          <Field
            label="Last Name *"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
          />

        </div>

        {/* EMAIL */}

        <Field
          label="Email *"
          name="email"
          value={form.email}
          onChange={handleChange}
          full
        />

        {/* PHONE */}

        <Field
          label="Phone *"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          full
        />

        {/* GENDER */}

        <Field
          label="Gender *"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          full
        />

        {/* BUTTON */}

        <button
          type="submit"
          className="
          bg-[#1f7a55]
          text-white
          px-10
          py-3
          rounded-full
          font-medium
          mt-4
          hover:opacity-90
          "
        >
          Update Changes
        </button>

      </form>

    </div>

  );
}


/* ---------- INPUT FIELD ---------- */

function Field({ label, name, value, onChange, full }) {

  return (

    <div className={full ? "w-full" : ""}>

      <label className="block mb-2 text-lg font-medium">
        {label}
      </label>

      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        className="
        w-full
        border
        border-gray-400
        rounded-xl
        px-5
        py-3
        outline-none
        bg-white
        "
      />

    </div>

  );
}