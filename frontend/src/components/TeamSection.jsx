import team1 from "../assets/images/team1.png";
import team2 from "../assets/images/team2.jpg";
import team3 from "../assets/images/team3.png";


export default function TeamSection() {
  return (
    <section className="py-20 px-4">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-14">

        <p className="text-lg text-gray-700">Our Team</p>

        <h2 className="text-3xl font-semibold text-green-700 mt-2">
          Meet The Passionate
        </h2>

        <h3 className="text-3xl font-bold mt-2">
          Team Behind Our Success
        </h3>
      </div>

      {/* ================= TEAM MEMBERS ================= */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">

        {/* MEMBER 1 */}
        <div>
          <img
            src={team1}
            className="w-full h-[380px] object-cover"
          />

          <h3 className="text-2xl font-bold mt-5">
            David Shan
          </h3>

          <p className="text-sm text-gray-500 tracking-wide">
            CEO & FOUNDER
          </p>
        </div>

        {/* MEMBER 2 */}
        <div>
          <img
            src={team2}
            className="w-full h-[380px] object-cover"
          />

          <h3 className="text-2xl font-bold mt-5 uppercase">
            Jenny
          </h3>

          <p className="text-sm text-gray-500">
            Operation Manger
          </p>
        </div>

        {/* MEMBER 3 */}
        <div>
          <img
            src={team3}
            className="w-full h-[380px] object-cover"
          />

          <h3 className="text-2xl font-bold mt-5 uppercase">
            Hilton
          </h3>

          <p className="text-sm text-gray-500">
            Warehouse Manger
          </p>
        </div>

      </div>

    </section>
  );
}