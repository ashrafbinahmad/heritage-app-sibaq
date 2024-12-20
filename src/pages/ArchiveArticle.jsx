import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import heritagePlaces from "../data/heritagePlaces";
import Navbar from "../components/Navbar";
import halalHotels from "../data/halalHotels";
import Button from "../admin/Button";

export default function ArchiveArticle() {
  const { archiveLink } = useParams();
  const archive = heritagePlaces.find((i) => i.link === archiveLink);
  useEffect(() => {
    window.scrollY = 0
    return () => {};
  }, []);   

  return (
    <div>
      <Navbar className={"bg-green-900 p-5 sticky top-0"} />
      <section className="p-[4rem]">
        <main className="bg-[#dbf1db] m-auto rounded-[50px] max-w-[1200px] font-manjari overflow-hidden">
          <header className="max-lg:block items-end grid grid-cols-[auto_max-content] bg-green-900 p-7 text-white HEADER">
            <div className="max-lg:mb-4 LEFT">
              <h1 className="font-black text-[30px]">{archive.name}</h1>
              <ul className="mt-5 font-bold">
                {archive.born && <li>ജനനം: {archive.born}</li>}
                {archive.death && <li>മരണം: {archive.death}</li>}
              </ul>
              <p className="mt-3 pr-5 max-w-[800px]">{archive.description}</p>
            </div>
            <div>
              <img
                className="rounded-xl w-[200px] max-lg:w-full h-[250px] object-center object-cover"
                src={archive.image}
                alt=""
              />
            </div>
          </header>
          <div className="p-10">
            {archive.articles.map((item, index) => {
              return (
                <>
                  <h2 className="font-black text-[30px]">{item.title}</h2>
                  <p className="text-[18px] whitespace-pre-line">
                    {item.content}
                  </p>
                  <div className="gap-10 grid grid-flow-col mt-5 NEARBY_HOTELS">
                    {archive.hotels.map((hotelId, index) => {
                      const currentHotel = halalHotels.find(
                        (hotel) => hotel.id === hotelId
                      );
                      return (
                        <div className="font-sans">
                          <img
                            className="rounded-xl w-full h-[200px] object-center object-cover"
                            src={currentHotel.hotelimage}
                            alt=""
                          />
                          <p className="mt-5 font-bold text-lg">
                            {currentHotel.hotel}
                          </p>
                          <a href={currentHotel.hotellink} target="_blank">
                            <Button className={"bg-white"}>Navigate</Button>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </main>
      </section>
    </div>
  );
}
