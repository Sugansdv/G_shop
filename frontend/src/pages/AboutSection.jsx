import { useRef, useState } from "react";
import aboutVideo from "../assets/videos/supermarket.mp4";
import AboutVisionMission from "../components/AboutVisionMission";
import TeamSection from "../components/TeamSection";
import Newsletter from "../components/Newsletter";

export default function AboutFirstSection() {

  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleVideo = () => {
    if (!videoRef.current) return;

    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <section className="bg-[#f5f5f5] py-16 px-4">

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

        {/* ================= LEFT SIDE ================= */}
        <div>

          <div className="relative w-full">

            {/* VIDEO */}
            <video
              ref={videoRef}
              src={aboutVideo}
              muted
              playsInline
              className="rounded-2xl w-full h-[320px] object-cover"
            />

            {/* ===== 16 YEARS CUBE BADGE ===== */}
            {/* ===== 16 YEARS CUBE BADGE ===== */}
<div className="absolute top-6 -left-2 flex items-center">

  {/* LEFT DEPTH FACE */}
 <div
  className="
    bg-[#ff9801]
    w-[8.5px]
    h-[60.5px]
  "
  style={{
    clipPath: "polygon(100% 0%, 0% 10%, 0% 90%, 100% 100%)"
  }}
/>
  {/* FRONT FACE */}
  <div
    className="
      bg-yellow-400
      h-[67.5px]
      px-5
      flex items-center
      gap-2
      shadow-lg
    "
  >
    <span className="text-2xl font-bold leading-none">16</span>

    <span className="text-sm leading-tight">
      Years <br /> of Services
    </span>
  </div>

</div>

            {/* ===== PLAY BUTTON ===== */}
            <button
              onClick={toggleVideo}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-16 h-16 bg-white/80 rounded-full
                              flex items-center justify-center
                              shadow-lg hover:scale-110 transition">

                {playing ? (
                  /* Pause */
                  <svg className="w-7 h-7" viewBox="0 0 24 24">
                    <rect x="6" y="5" width="4" height="14" />
                    <rect x="14" y="5" width="4" height="14" />
                  </svg>
                ) : (
                  /* Play */
                  <svg className="w-7 h-7 ml-1" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}

              </div>
            </button>

          </div>

          {/* ===== FOUNDER TEXT ===== */}
          <div className="text-center mt-6">
            <p className="tracking-[4px] italic text-gray-800 font-figmahand">
              ALENDER JENNY
            </p>

            <h3 className="text-2xl font-semibold font-poppins">
              Jenny Alexander . Founder
            </h3>
          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div>

          <p className="text-gray-600 mb-2 text-xl">About Us</p>

          <h2 className="text-4xl font-semibold leading-snug">
            Your trusted Partner in
            <br />
            <span className="text-green-600">
              Fresh Grocery Delivery
            </span>
          </h2>

          <p className="text mt-4 text-xl pe-20 font-medium">
            potassium and fiber their consumption one to
            regulate high blood pressure
          </p>

          {/* CHECKLIST */}
          <div className="mt-8 space-y-5 ms-4">

            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-4">

                <div className="w-8 h-8 bg-[#f9c51a] rounded-full
                                flex items-center justify-center text-black">
                  ✔
                </div>

                <p className="text-gray-800 text-lg">
                  ECO – Friendly and Sustainable Practices
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>
      <AboutVisionMission />
      <TeamSection />
      <Newsletter />

    </section>
  );
}