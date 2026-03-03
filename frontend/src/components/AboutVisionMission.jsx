import family from "../assets/images/family.jpg";
import vision from "../assets/images/vision.png";
import mission from "../assets/images/mission.png";

export default function AboutVisionMission() {
  return (
    <section className="relative pt-44 px-20">

      {/* ================= FLOATING IMAGE ================= */}
     <div className="absolute right-20 top-10 z-10 w-[820px] hidden lg:block">
  <img
    src={family}
    alt="family"
    className="w-full max-h-[450px] object-fit rounded-3xl shadow-lg"
  />
</div>

      {/* ================= GREY BOX ================= */}
      <div className="bg-[#e9e9e9] py-20">

        <div className="max-w-6xl mx-auto flex justify-center lg:justify-end px-20">

          {/* Vision + Mission Container */}
          <div className="grid md:grid-cols-2 gap-16 text-center lg:text-left lg:w-[55%] mt-64">

            {/* ===== VISION ===== */}
            <div className="flex flex-col items-center lg:items-start">

              <div className="bg-green-700 p-4 rounded-md mb-4 ms-5">
                <img src={vision} className="w-6" />
              </div>

              <h3 className="font-semibold text-lg">Our vision</h3>

              <p className="text-sm mt-1 max-w-xs">
                potassium and fiber their consumption content ensures
                a better metabolism helps one to regulate high blood pressure
              </p>

            </div>

            {/* ===== MISSION ===== */}
            <div className="flex flex-col items-center lg:items-start ms-5">

              <div className="bg-green-700 p-4 rounded-md mb-4">
                <img src={mission} className="w-6" />
              </div>

              <h3 className="font-semibold text-lg">Our Mission</h3>

              <p className=" text-sm mt-1 max-w-xs">
                potassium and fiber their consumption content ensures
                a better metabolism helps one to regulate high blood pressure
              </p>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}