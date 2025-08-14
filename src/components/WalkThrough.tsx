import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import MoneyMotivation from "@/assets/money-motivation.png";
import Waves from "@/assets/wave.svg";
import { useLocalStorageStore } from "@/stores/localStorage";
import { useNavigate } from "react-router-dom";

const WalkThrough = () => {
  const swiperRef = useRef<any>(null);
  const [isEnd, setIsEnd] = useState(false);
  const { setWalkThrough } = useLocalStorageStore((store) => store);
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-[100svh] max-w-xl mx-auto overflow-hidden">
      <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        pagination={{ clickable: true, el: ".walkthrough-dots" }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setIsEnd(s.isEnd)}
        resistanceRatio={0}
        style={
          {
            // warna & ukuran bullet
            "--swiper-pagination-color": "#ffffff",
            "--swiper-pagination-bullet-inactive-color": "#ffffff99",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "8px",
          } as React.CSSProperties
        }
      >
        {/* SLIDE 1 */}
        <SwiperSlide className="relative flex min-h-[100svh] flex-col">
          {/* Hero image */}
          <div className="relative h-[38vh] w-full overflow-hidden">
            <img
              src={MoneyMotivation}
              alt="Motivasi keuangan"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />
          </div>

          {/* Wave + body */}
          <div className="relative flex flex-1 flex-col -space-y-5">
            <img
              src={Waves}
              alt=""
              aria-hidden="true"
              className="w-full -translate-y-1 rotate-180 select-none"
            />
            <section className="relative flex-1 bg-primary-600 px-6 pt-6 text-white">
              <h1 className="text-2xl font-bold">KASKES: Catat uang pribadi</h1>
              <p className="mt-2 text-white/90 capitalize">
                Catat uang sendiri maupun uang kas jadi simpel
              </p>
            </section>
          </div>
        </SwiperSlide>

        {/* SLIDE 2 */}
        <SwiperSlide className="relative flex min-h-[100svh] flex-col">
          {/* Hero image */}
          <div className="relative h-[38vh] w-full overflow-hidden">
            <img
              src={MoneyMotivation}
              alt="Motivasi keuangan"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />
          </div>

          {/* Wave + body */}
          <div className="relative flex flex-1 flex-col -space-y-5">
            <img
              src={Waves}
              style={{ transform: "scaleX(-1)" }}
              alt=""
              aria-hidden="true"
              className="w-full -translate-y-1 rotate-180 select-none"
            />
            <section className="relative flex-1 bg-primary-600 px-6 pt-6 text-white">
              <h1 className="text-2xl font-bold">Pantau Periode & Selisih</h1>
              <p className="mt-2 text-white/90 capitalize">
                Harian, mingguan, bulanan, hingga tahunan.
              </p>
            </section>
          </div>
        </SwiperSlide>

        {/* SLIDE 3 */}
        <SwiperSlide className="relative flex min-h-[100svh] flex-col">
          {/* Hero image */}
          <div className="relative h-[38vh] w-full overflow-hidden">
            <img
              src={MoneyMotivation}
              alt="Motivasi keuangan"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />
          </div>

          {/* Wave + body */}
          <div className="relative flex flex-1 flex-col -space-y-5">
            <img
              src={Waves}
              alt=""
              aria-hidden="true"
              className="w-full -translate-y-1 rotate-180 select-none"
            />
            <section className="relative flex-1 bg-primary-600 px-6 pt-6 text-white">
              <h1 className="text-2xl font-bold">Kolaborasi Transparan</h1>
              <p className="mt-2 text-white/90 capitalize">
                Bisa Bikin kas kelompok dengan mengundang teman, semua bisa
                setor.
              </p>
            </section>
          </div>
        </SwiperSlide>

        {/* SLIDE 4 */}
        <SwiperSlide className="relative flex min-h-[100svh] flex-col">
          {/* Hero image */}
          <div className="relative h-[38vh] w-full overflow-hidden">
            <img
              src={MoneyMotivation}
              alt="Motivasi keuangan"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />
          </div>

          {/* Wave + body */}
          <div className="relative flex flex-1 flex-col -space-y-5">
            <img
              src={Waves}
              alt=""
              style={{ transform: "scaleX(-1)" }}
              aria-hidden="true"
              className="w-full -translate-y-1 rotate-180 select-none"
            />
            <section className="relative flex-1 bg-primary-600 px-6 pt-6 text-white">
              <h1 className="text-2xl font-bold">Mulai Sekarang</h1>
              <p className="mt-2 text-white/90 capitalize">
                Catat pemasukan anda agar mudah ditelusuri
              </p>
            </section>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Pagination dots: fit & center */}
      <div className="walkthrough-dots absolute bottom-[max(150px,env(safe-area-inset-bottom))] left-1/2 z-50 inline-flex h-fit w-fit -translate-x-1/2 items-center gap-2" />

      {/* Skip */}
      {!isEnd && (
        <button
          className="absolute right-4 top-4 z-50 rounded-full bg-primary text-white px-3 py-1 text-sm font-bold backdrop-blur"
          onClick={() => {
            const s = swiperRef.current;
            if (!s) return;
            s.slideTo(s.slides.length - 1);
          }}
        >
          Skip
        </button>
      )}

      {/* Next / Mulai */}
      <button
        className="absolute left-1/2 z-50 -translate-x-1/2 rounded-full bg-white px-16 py-2 text-sm font-semibold text-primary-600 shadow-md bottom-[max(56px,env(safe-area-inset-bottom))] disabled:opacity-60"
        onClick={() => {
          if (isEnd) {
            setWalkThrough(true);
            navigate("/");
            return;
          }
          swiperRef.current?.slideNext();
        }}
      >
        {isEnd ? "Mulai" : "Next"}
      </button>
    </div>
  );
};

export default WalkThrough;
