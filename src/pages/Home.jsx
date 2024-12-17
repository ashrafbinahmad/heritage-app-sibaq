import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import heritagePlaces from "../data/heritagePlaces";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "swiper/css";
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
  ArrowForwardRounded,
} from "@mui/icons-material";
import "swiper/css/navigation";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import heritageCalender from "../data/heritageCalender";

export const menuItems = [
  {
    display: "Home",
    link: "/#",
    id: ''
  },
  {
    display: "Quick Links",
    link: "/#quick-links",
    id: 'quick-links'
  },
  {
    display: "About us",
    link: "/#about-us",
    id: 'about-us'
  },
];
export default function Home() {
  return (
    <div className="w-screen overflow-hidden">
      <Header />
      <QuickLinks />
      <Heritagemap />
      <Archives />
      <HijriReminder />
      <Footer />
    </div>
  );
}

function Header() {
  const navigate = useNavigate();
  return (
    <header className="bg-contain bg-no-repeat max-w-[100vw] h-screen text-white overflow-hidden">
      <img
        className="-z-10 absolute max-xl:hidden m-auto w-screen"
        src="/images/2.png"
        alt=""
      />
      <img
        className="-z-10 absolute xl:hidden m-auto h-screen"
        src="/images/headerbg-flat.png"
        alt=""
      />
      <div className="m-auto px-[50px] pt-[60px] max-w-[1300px] container">
        <Navbar className={'relative top-0'} />

        <div className="grid grid-cols-[auto_max-content] mt-[120px] _max-md:mt-10 HEADING-AND-LOGO">
          <div className="HEADING">
            <p className="font-black text-[80px] max-md:text-[30px] max-lg:text-[50px] max-2xl:text-center leading-[1.1]">
              Your Ultimate <br />
              Guide to <br />
              Sacred Sites
            </p>
          </div>
          <div className="max-2xl:hidden RIGHT">
            <img className="w-[300px]" src="/images/1.png" alt="" />
          </div>
        </div>
      </div>
    </header>
  );
}


function QuickLinks() {
  const navigate = useNavigate();
  const quickLinks = [
    {
      display: "Heritage Map",
      link: "/heritagemap",
    },
    {
      display: "Archives",
      link: "/archives",
    },
    {
      display: "Halal Restaurant",
      link: "/halalrestaurant",
    },
    {
      display: "Hijri Reminder",
      link: "/hijrireminder",
    },
  ];
  return (
    <section className="py-[8rem]" id='quick-links'>
      <div className="max-lg:block grid grid-cols-4 m-auto max-w-[1300px] text-center text-white cursor-pointer">
        {quickLinks.map((item, index) => {
          return (
            <div
              onClick={() => {
                navigate(item.link);
              }}
              className="bg-contain bg-no-repeat bg-center p-[5rem]"
              style={{ backgroundImage: "url(/images/4.png)" }}
            >
              {item.display}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Heritagemap() {
  const navigate = useNavigate();
  return (
    <section className="">
      <h2 className="py-5 font-black text-[50px] text-center text-green-900">
        Heritage Map
      </h2>
      <div className="relative h-[80vh] min-h-[500px] overflow-hidden MAP">
        <div className="top-[50px] absolute w-full SEARCH">
          <div
            className="items-center grid grid-cols-[2rem_auto] bg-white m-auto px-5 rounded-[50px] w-[300px] h-[3rem] text-green-900"
            onClick={() => {
              navigate("/heritagemap");
            }}
          >
            <p className="font-black text-xl">🔍</p>
            <p className="font-thin text-xl">Search</p>
          </div>
        </div>
        <iframe
          className="mt-[-90px]"
          src="https://www.google.com/maps/d/embed?mid=1iDwRUIOJoAVhUBROKlFvAeA6kRMNQmg&ehbc=2E312F"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </section>
  );
}

function Archives() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  return (
    <section className="pb-[5rem]">
      <h2 className="py-5 font-black text-[50px] text-center text-green-900 select-none">
        Archives
      </h2>
      <div className="relative">
        <div
          onClick={() => swiperRef.current?.slidePrev()}
          className="top-[50%] left-0 z-40 absolute justify-center items-center grid bg-white shadow-sm ml-5 rounded-full w-[50px] h-[50px] origin-center cursor-pointer"
        >
          {" "}
          <ArrowBackIosRounded />{" "}
        </div>
        <div
          onClick={() => swiperRef.current?.slideNext()}
          className="top-[50%] right-0 z-40 absolute justify-center items-center grid bg-white shadow-sm mr-5 rounded-full w-[50px] h-[50px] cursor-pointer"
        >
          {" "}
          <ArrowForwardIosRounded />{" "}
        </div>
        <div className="px-10">
          <Swiper
            className="cursor-grab"
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {heritagePlaces.map((item, index) => {
              return (
                <SwiperSlide className="rounded-[50px]">
                  <div
                    onClick={() => {
                      navigate(`/archives/${item.link}`);
                    }}
                    className="gap-2 grid bg-[#b4e7b4] p-10 rounded-[50px] h-[300px] cursor-pointer overflow-hidden select-none"
                  >
                    <h3 className="font-black font-manjari text-2xl">
                      {item.name}
                    </h3>
                    <p className="max-h-[250px] font-manjari overflow-hidden">
                      {item.description}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

function HijriReminder() {
  return (
    <section className="pb-[5rem]">
      <h2 className="py-5 font-black text-[50px] text-center text-green-900 select-none">
        Hijri Reminder
      </h2>
      <table className="m-auto w-full max-w-[1200px]">
        <tr className="bg-green-900 text-left text-white text-xl">
          <th className="px-3 py-5">Hijri Date</th>
          <th className="px-3 py-5">Date</th>
          <th className="px-3 py-5">Event</th>
        </tr>
        {heritageCalender.map((item, index) => {
          return (
            <tr className="even:hover:bg-[#bef4be] odd:hover:bg-slate-50 odd:bg-white even:bg-[#d5ffd5] text-lg cursor-pointer">
              <td className="p-3">{item.hijridate}</td>
              <td className="p-3">{item.date}</td>
              <td className="p-3">{item.event}</td>
            </tr>
          );
        })}
      </table>
    </section>
  );
}
