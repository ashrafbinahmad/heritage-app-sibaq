import React, { useEffect, useState } from "react";
import AdminLayout, { AdminPageHead } from "./AdminLayout";
import Button from "./Button";
import { Delete, Edit, Logout, MenuOpen } from "@mui/icons-material";
import InputText from "./InputText";
import InputFile from "./InputFile";
import heritagePlaces from "../data/heritagePlaces";
import InputTextArea from "./InputTextArea";
import { deleteData, getAllData, saveData } from "../lib/firebase";

export default function ArchiveManager() {
  const [edittingId, setEdittingId] = useState(null);
  const [archives, setArchives] = useState(heritagePlaces);
  const [savingTrigger, setSavingTrigger] = useState(0);

  useEffect(() => {
    getAllData("archives").then((result) => {
      setArchives(result);
    });
    return () => {};
  }, [savingTrigger]);

  const defaulFormData = {
    name: "",
    link: "",
    born: "",
    death: "",
    description: "",
    image: "",
    articles: [
      {
        title: "",
        content: "",
      },
    ],
  };
  const [formData, setFormData] = useState(defaulFormData);
  return (
    <AdminLayout>
      <div>
        <AdminPageHead pageTitle={"Archives"} />
        <div className="m-auto py-10 max-w-[1250px] MAIN">
          <div className="flex gap-2 BUTTONS">
            <Button className={"bg-green-900 text-white rounded-[15px]"}>
              Add new archive
            </Button>
            <Button
              className={"bg-green-900 text-white rounded-[15px]"}
              onClick={() => {
                heritagePlaces.map((item, index) => {
                  saveData("archives", Date.now().toString(), item);
                });
                setSavingTrigger(savingTrigger + 1);
              }}
            >
              Save local archives
            </Button>
          </div>

          <div className="relative gap-5 grid grid-cols-[1fr_2fr] py-8 h-full _overflow-auto FORMSandCARDS">
            <div className="top-[2rem] sticky gap-3 grid bg-white px-5 py-10 rounded-[10px] h-min max-h-[calc(100dvh-3.5rem)] overflow-auto FORM">
              <InputText
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                    link: e.target.value.trim().replace(" ", ""),
                  })
                }
                placeholder={"Title"}
              />
              <InputText
                placeholder={"Custom link"}
                value={formData.link}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    link: e.target.value.trim().replace(" ", ""),
                  })
                }
              />
              <div className="gap-3 grid grid-cols-2">
                <InputText
                  placeholder={"Birth"}
                  value={formData.born}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      born: e.target.value,
                    })
                  }
                />
                <InputText
                  placeholder={"Death"}
                  value={formData.death}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      death: e.target.value,
                    })
                  }
                />
              </div>
              <InputText
                placeholder={"Description"}
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />
              {formData.articles.map((item, index) => {
                return (
                  <div key={index} className="gap-3 grid ARTICLES">
                    <div className="grid grid-cols-[auto_min-content]">
                      <p className="text-xs"> Subheading {index + 1}</p>
                      <button
                        onClick={() => {
                          setFormData({
                            ...formData,
                            articles: formData.articles.filter(
                              (item, i) => index != i
                            ),
                          });
                        }}
                      >
                        <Delete />
                      </button>
                    </div>
                    <InputText
                      value={item.title}
                      onChange={(e) => {
                        const articles = formData.articles;
                        articles[index].title = e.target.value;
                        setFormData({ ...formData, articles });
                      }}
                      placeholder={"Subheading"}
                    />
                    <InputTextArea
                      value={item.content}
                      onChange={(e) => {
                        const articles = formData.articles;
                        articles[index].content = e.target.value;
                        setFormData({ ...formData, articles });
                      }}
                      placeholder={"Article"}
                    />
                  </div>
                );
              })}

              <Button
                onClick={() => {
                  setFormData({
                    ...formData,
                    articles: [
                      ...formData.articles,
                      { title: "", content: "" },
                    ],
                  });
                }}
              >
                Add sub heading
              </Button>
              <InputText
                placeholder={"Image link"}
                value={formData.image}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.value,
                  })
                }
              />
              <div className="gap-3 grid grid-cols-2">
                <Button
                  className={"bg-green-300 text-green-900"}
                  onClick={() => {
                    if (edittingId) {
                      saveData("archives", edittingId, formData).then(() => {
                        setSavingTrigger(savingTrigger + 1);
                      });
                    } else
                      saveData(
                        "archives",
                        Date.now().toString(),
                        formData
                      ).then(() => {
                        setSavingTrigger(savingTrigger + 1);
                      });
                  }}
                >
                  {edittingId ? `Update archive` : `Add archive`}
                </Button>
                <Button
                  onClick={() => {
                    setFormData(defaulFormData);
                  }}
                  className={"bg-red-300 text-red-900"}
                >
                  Clear form
                </Button>
              </div>
            </div>
            <div className="gap-5 grid grid-cols-2 pr-2 font-manjari CARDS">
              {archives.map((item, index) => {
                return (
                  <div key={index} className="bg-white p-5 rounded-[30px]">
                    <div className="grid grid-cols-[auto_max-content]">
                      <h3 className="font-bold">{item.name}</h3>
                      <span>
                        <button
                          onClick={() => {
                            // setEdittingId(item.id)
                            setFormData(item);
                          }}
                        >
                          <Edit />
                        </button>
                        <button onClick={()=> {
                          deleteData('archives', item._id)
                          setSavingTrigger(savingTrigger + 1)
                        }}>
                          <Delete />
                        </button>
                      </span>
                    </div>
                    <p className="mt-5">
                      {item.description?.substring(0, 200)}...
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
