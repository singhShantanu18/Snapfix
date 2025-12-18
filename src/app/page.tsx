import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">

      {/* ===================== SECTION 1 ===================== */}
      <div className="relative min-h-screen w-full overflow-hidden">

        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/video-nature.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0EB2B3]/70 to-[#1B6758]/70 backdrop-blur-sm z-10" />

        {/* ===================== NAVBAR ===================== */}
        <nav
          className={`${poppins.className} relative z-30 bg-white flex items-center justify-between px-6 py-4`}
        >
          <Image
            src="/Logo.png"
            alt="SnapFix Logo"
            width={160}
            height={56}
            className="h-12 sm:h-14 w-auto"
          />

          <div className="hidden md:flex gap-8 font-semibold text-lg">
            <Link href="/"><h4 className="cursor-pointer">Home</h4></Link>
            <Link href="/issues"><h4 className="cursor-pointer">Issues</h4></Link>
            <Link href="/report"><h4 className="cursor-pointer">Report</h4></Link>
          </div>

          <button className="border px-6 py-2 rounded-full font-semibold text-sm">
            Login
          </button>
        </nav>

        {/* ===================== HERO TEXT ===================== */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">

          <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-semibold leading-tight">
            MAKE YOUR CITY
          </h1>

          <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-semibold leading-tight">
            <span className="bg-gradient-to-r from-[#3399ff] via-[#8055aa] to-[#cc6677] bg-clip-text text-transparent">
              BETTER,
            </span>{" "}
            <span className="text-black">
              ONE REPORT
            </span>
          </h1>


          <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-semibold leading-tight">
            AT A TIME
          </h1>

        </div>

      </div>

      {/* ===================== SECTION 2 ===================== */}
      <section className="bg-[#f3f9fd] py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-7xl sm:text-6xl font-bold mb-14">
            HOW SNAP FIX<br />WORKS?
          </h2>

          <div className="bg-[#e3e7ce] rounded-[3rem] p-10 flex flex-col lg:flex-row gap-12 items-center">

            <div className="flex flex-col gap-8 w-full lg:w-1/2">

              {[
                "Snap a photo",
                "Select location",
                "Upload",
              ].map((text, index) => (
                <div
                  key={index}
                  className="relative bg-[#a89e1a] h-20 sm:h-24 rounded-full flex items-center pl-24 hover:scale-105 transition"
                >
                  <div className="absolute left-6 h-14 w-14 bg-[#413c17] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {index + 1}
                  </div>
                  <span className="text-white font-semibold text-xl">
                    {text}
                  </span>
                </div>
              ))}

            </div>

            {/* Phone Preview */}
            <div className="relative w-full lg:w-1/2 flex justify-center items-center">

              {/* Phone Wrapper*/}
              <div className="relativew-[420px] sm:w-[520px] md:w-[620px] lg:w-[720px]">


                {/* Phone Image */}
                <Image
                  src="/holding_phone-removebg-preview.png"
                  alt="Phone"
                  width={100}
                  height={100}
                  className="w-full h-auto relative z-10"
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-7 scale-[0.55]">

                  <h4 className="font-bold text-3xl mb-3 tracking-wide">
                    SNAPFIX
                  </h4>

                  <div className="w-full max-w-[55%] space-y-2">

                    <div className="bg-white rounded-md p-2 shadow">
                      <Image src="/iss-3.png" alt="a" width={100} height={100} className="w-full h-auto" />
                    </div>

                    <div className="bg-white rounded-md p-2 shadow">
                      <Image src="/issue.png" alt="b" width={100} height={100} className="w-full h-auto" />
                    </div>

                    <div className="bg-white rounded-md p-2 shadow">
                      <Image src="/issue1.png" alt="c" width={100} height={100} className="w-full h-auto" />
                    </div>

                    <div className="bg-white rounded-md p-2 shadow">
                      <Image src="/iss-3.png" alt="d" width={200} height={100} className="w-full h-auto" />
                    </div>

                  </div>

                  {/* Report Button */}
                  <button className="mt-3 mb-10 bg-black text-white text-sm py-2 w-full max-w-[57%] rounded-full">
                    Report
                  </button>

                </div>

              </div>
            </div>



          </div>

        </div>

      </section>

    </main>
  );
}
