import React from "react";

import basket from "../assets/images/basket.png";
import user1 from "../assets/images/user1.png";
import user2 from "../assets/images/user2.png";
// import user3 from "../assets/user3.png";
// import user4 from "../assets/user4.png";

import deliveryman from "../assets/images/deliveryman.png";

import truck from "../assets/images/truck.png";
import wallet from "../assets/images/wallet.png";

import star from "../assets/images/star.png";

import yellow from "../assets/images/yellow-circle.png";
import purple from "../assets/images/purple-circle.png";
import pink from "../assets/images/pink-circle.png";

const HomeBanner = () => {
  return (
    <section className="w-full py-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-2 items-center">

        {/* LEFT COLUMN */}

        <div>

          <div className="inline-flex items-center gap-2 bg-[#f5d3d3] px-5 py-2 rounded-full font-semibold">
            <img src={basket} className="w-6"/>
            The Best Online Grocery Store
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold mt-6 leading-tight">
            Your One ! Stop Shop <br />
            For <span className="text-[#1c8057]">Quality Groceries</span>
          </h1>

          <p className="text-[#1c8057] font-medium mt-6 max-w-lg">
            Online shop to connect easy for customers and quality delivery
            of healthy groceries with the best quantity and freshness.
          </p>

          {/* BUTTONS */}

          <div className="flex items-center gap-8 mt-8">

            <button className="bg-[#1c8057] text-white font-medium px-6 py-2 rounded-full flex items-center gap-2 hover:opacity-90">
              Shop Now →
            </button>

            <button className="text-[#5a1e1e] font-medium border-b-2 border-[#5a1e1e] hover:border-[#1c8057] transition-colors">
              View All Products
            </button>

          </div>

          {/* RATINGS */}

          <div className="flex items-center gap-4 mt-10">

            <div className="flex -space-x-2">
              <img src={user1} className="w-8 h-8 rounded-full border"/>
              <img src={user2} className="w-8 h-8 rounded-full border"/>
              <img src={user1} className="w-8 h-8 rounded-full border"/>
              <img src={user2} className="w-8 h-8 rounded-full border"/>
            </div>

            <div>
              <p className="font-semibold">⭐ 4.8 Ratings</p>
              <p className="text-sm text-[#1c8057]">
                Trusted by 75+ customers
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN */}

        <div className="relative flex justify-center">

          {/* delivery person */}

          <img
  src={deliveryman}
  className="relative z-10 max-h-[520px] w-full object-contain"
/>

          {/* secure payment card */}
 

          <div className="absolute left-10 top-24 bg-white shadow-lg rounded-full px-6 py-2 flex items-center gap-3" style={{ boxShadow: '20px 4px 4px 0px #00000040' }}>

            <div className="bg-[#1c8057] p-2 rounded-full">
              <img src={wallet} className="w-4"/>
            </div>

            <p className="text-sm font-medium text-gray-600">
              secure payments
            </p>

            <img src={star} className="w-10 absolute -right-4 top-2"/>
          </div>

          {/* fast delivery card */}

          <div className="absolute left-0 bottom-16 bg-white shadow-lg rounded-full px-6 py-2 flex items-center gap-3" style={{ boxShadow: '20px 4px 4px 0px #00000040' }}>

            <div className="bg-[#1c8057] p-2 rounded-full">
              <img src={truck} className="w-4"/>
            </div>

            <p className="text-sm font-medium text-gray-600">
              Fast delivery
            </p>

            <img src={star} className="w-10 absolute -right-4 top-2"/>
          </div>

          {/* DECORATIVE CIRCLES */}

          <img src={yellow} className="absolute bottom-10 right-10 w-8"/>
          <img src={yellow} className="absolute top-64 left-16 w-8"/>
          <img src={purple} className="absolute top-32 right-10 w-8"/>
          
          <img src={purple} className="absolute top-44 left-60 w-4"/>
          <img src={pink} className="absolute top-10 left-52 w-12"/>
           <img src={purple} className="absolute bottom-0 left-56 w-8"/>

        </div>

      </div>
    </section>
  );
};

export default HomeBanner;