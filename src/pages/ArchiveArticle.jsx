import React from "react";
import { useParams } from "react-router-dom";
import heritagePlaces from "../data/heritagePlaces";
import Navbar from "../components/Navbar";

export default function ArchiveArticle() {
  const { archiveLink } = useParams();
  const archive = heritagePlaces.find((i) => i.link === archiveLink);
  return (
    <div>
      <Navbar className={"bg-green-900 p-5 sticky top-0"} />
      <section className="p-[4rem]">
        <main className="bg-[#dbf1db] m-auto rounded-[50px] max-w-[1200px] font-manjari overflow-hidden">
          <header className="items-end grid grid-cols-[auto_max-content] bg-green-900 p-7 text-white HEADER">
            <div className="LEFT">
              <h1 className="font-black text-[30px]">{archive.name}</h1>
              <ul className="mt-5 font-bold">
                <li>ജനനം: {archive.born}</li>
                <li>മരണം: {archive.death}</li>
              </ul>
              <p className="mt-3 pr-5 max-w-[800px]">{archive.description}</p>
            </div>
            <div>
              <img
                className="rounded-3xl w-[200px] h-[250px] object-center object-cover"
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
                  <p className="text-[18px] whitespace-pre-line">{item.content}</p>
                </>
              );
            })}
          </div>
        </main>
      </section>
    </div>
  );
}
