import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import heritagePlaces from "../data/heritagePlaces";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "swiper/css";
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
  ArrowForwardRounded,
  NavigateNextRounded,
} from "@mui/icons-material";
import "swiper/css/navigation";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import heritageCalender from "../data/heritageCalender";
import Button from "../admin/Button";

export const menuItems = [
  {
    display: "Home",
    link: "/#",
    id: "",
  },
  {
    display: "Quick Links",
    link: "/#quick-links",
    id: "quick-links",
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
    <header className="relative bg-contain bg-no-repeat max-w-[100vw] h-screen max-md:h-[60dvh] text-white _overflow-hidden">
      <img
        className="-z-10 absolute max-xl:hidden m-auto w-full h-full"
        src="/images/2.png"
        alt=""
      />
      <img
        className="-z-10 absolute xl:hidden m-auto w-full h-full"
        src="/images/headerbg-flat.png"
        alt=""
      />
      <div className="m-auto px-[50px] pt-[60px] max-w-[1300px] container">
        <Navbar className={" sticky  top-0"} />
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
      link: "/#heritagemap",
    },
    {
      display: "Archives",
      link: "/#archives",
    },
    {
      display: "Hijri Reminder",
      link: "/#hijrireminder",
    },
    {
      display: "Home",
      link: "/#",
    },
  ];
  return (
    <section className="py-[3rem]" id="quick-links">
      <div className="max-xl:gap-3 grid grid-cols-4 max-lg:grid-cols-2 m-auto p-10 max-w-[1300px] text-center text-white cursor-pointer">
        {quickLinks.map((item, index) => {
          return (
            <a href={item.link}>
              <div
                className="xl:bg-[url(/images/4.png)] max-xl:bg-accent-dark bg-contain bg-no-repeat bg-center p-[5rem] max-xl:p-[2rem]"
              >
                {item.display}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function Heritagemap() {
  const navigate = useNavigate();
  const [isLookingMap, setIsLookingMap] = useState(false);
  const [archives, setArchives] = useState(heritagePlaces);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  let timeout;
  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section id="heritagemap" className="">
      <h2 className="py-5 font-black text-[50px] text-accent-dark text-center">
        Heritage Map
      </h2>
      <div className="relative h-[90vh] min-h-[500px] overflow-hidden MAP">
        <div
          className="top-[50px] z-10 absolute w-full SEARCH"
          onBlur={() => {
            timeout = setTimeout(() => {
              setIsSearchOpen(false);
            }, 300);
          }}
        >
          <div className="m-auto w-fit h-fit overflow-hidden">
            <div className="m-auto w-[300px] focus-within:w-full max-w-[500px] transition-all duration-[1500] delay-300 focus-within:delay-0">
              <div className="items-center grid grid-cols-[2rem_auto] bg-white px-5 rounded-[20px] w-full h-[3rem] text-accent-dark">
                <p className="font-black text-xl">🔍</p>
                <input
                  onFocus={() => {
                    setIsLookingMap(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full h-full outline-none"
                  placeholder="Search"
                  type="text"
                  name=""
                  id=""
                />
                {/* <p className="font-thin text-xl">Search</p> */}
              </div>
              <div
                className={`bg-white mt-5 rounded-[20px] w-full transition-[height] overflow-auto  duration-[50]  ${
                  isSearchOpen ? "h-[300px] " : "h-0 "
                }`}
              >
                <div className="p-2">
                  {archives.map((item, index) => {
                    return (
                      <div className="border-gray-200 grid grid-cols-[auto_max-content] border-b">
                        <p>{item.name}</p>
                        <a
                          href={item.locationlink}
                          target="_blank"
                          className="border-gray-200 hover:bg-gray-200 border rounded-full"
                        >
                          <NavigateNextRounded />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {!isLookingMap && (
          <div
            className="z-0 absolute bg-accent-dark opacity-70 w-full h-full GREENOVERLAY"
            onClick={() => {
              setIsLookingMap(true);
            }}
          ></div>
        )}
        <iframe
          className="mt-[-67px] w-full h-[calc(100%+67px)]"
          src="https://www.google.com/maps/d/embed?mid=1iDwRUIOJoAVhUBROKlFvAeA6kRMNQmg&ehbc=2E312F"
          // width="100%"
          // height="100%"
        ></iframe>
      </div>
    </section>
  );
}

function Archives() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  return (
    <section className="pb-[5rem]" id="archives">
      <h2 className="py-5 font-black text-[50px] text-accent-dark text-center select-none">
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
            breakpoints={{
              // when window width is <= 499px
              499: {
                slidesPerView: 1,
                spaceBetweenSlides: 50,
              },
              // when window width is <= 799px
              799: {
                slidesPerView: 2,
                spaceBetweenSlides: 30,
              },
              // when window width is <= 999px
              999: {
                slidesPerView: 3,
                spaceBetweenSlides: 30,
              },
            }}
          >
            {heritagePlaces.map((item, index) => {
              return (
                <SwiperSlide className="rounded-[50px]">
                  <div
                    onClick={() => {
                      navigate(`/archives/${item.link}`);
                    }}
                    className="gap-2 grid bg-accent-light p-10 rounded-[50px] h-[500px] cursor-pointer overflow-hidden select-none"
                  >
                    <img
                      className="rounded-[10px] w-full h-[200px] object-center object-cover"
                      src={item.image}
                      alt=""
                    />
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
  const [showFull, setShowFull] = useState(false);
  return (
    <section className="pb-[5rem]" id="hijrireminder">
      <h2 className="py-5 font-black text-[50px] text-accent-dark text-center select-none">
        Hijri Reminder
      </h2>
      <table className="m-auto w-full max-w-[1200px]">
        <tr className="bg-accent-dark text-left text-white text-xl">
          <th className="px-3 py-5">Hijri Date</th>
          <th className="px-3 py-5">Date</th>
          <th className="px-3 py-5">Event</th>
        </tr>
        {heritageCalender.map((item, index) => {
          if (index > 5 && !showFull) return <></>;
          else
            return (
              <tr className="even:hover:bg-accent-light odd:hover:bg-slate-50 odd:bg-white even:bg-[#b1f7e6] text-lg cursor-pointer">
                <td className="p-3">{item.hijridate}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.event}</td>
              </tr>
            );
        })}
      </table>
      {showFull ? (
        <div className="items-center m-auto w-fit">
          <Button
            className={"text-center"}
            onClick={() => {
              setShowFull(false);
            }}
          >
            Show less
          </Button>
        </div>
      ) : (
        <div className="items-center m-auto w-fit">
          <Button
            className={"text-center"}
            onClick={() => {
              setShowFull(true);
            }}
          >
            Show full
          </Button>
        </div>
      )}
    </section>
  );
}
