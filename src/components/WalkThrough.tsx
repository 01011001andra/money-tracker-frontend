import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import MoneyMotivation from "@/assets/money-motivation.png";
import Waves from "@/assets/wave.svg";

const WalkThrough = () => {
  const swiperRef = useRef<any>(null);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="relative w-full min-h-[100svh] overflow-hidden">
      <Swiper
        modules={[Pagination]}
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
              <h1 className="text-2xl font-bold">Kelola Kas Bareng</h1>
              <p className="mt-2 text-white/90">
                Catat pemasukan & pengeluaran, buat laporan, dan kolaborasi
                transparan dengan teman.
              </p>
            </section>
          </div>
        </SwiperSlide>

        {/* SLIDE 2 */}
        <SwiperSlide className="relative flex min-h-[100svh] flex-col">
          <div className="flex flex-1 items-center justify-center px-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Semua Terkontrol</h2>
              <p className="mt-2 text-gray-600">
                Atur split, persetujuan transaksi, dan export laporan cepat.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Pagination dots: fit & center */}
      <div className="walkthrough-dots absolute bottom-[max(150px,env(safe-area-inset-bottom))] left-1/2 z-50 inline-flex h-fit w-fit -translate-x-1/2 items-center gap-2" />

      {/* Skip */}
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

      {/* Next / Mulai */}
      <button
        className="absolute left-1/2 z-50 -translate-x-1/2 rounded-full bg-white px-16 py-2 text-sm font-semibold text-primary-600 shadow-md bottom-[max(56px,env(safe-area-inset-bottom))] disabled:opacity-60"
        onClick={() => {
          if (isEnd) {
            // TODO: ganti ke navigasi kamu, mis. react-router / next-router
            // navigate("/home");  // atau router.push("/home")
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
