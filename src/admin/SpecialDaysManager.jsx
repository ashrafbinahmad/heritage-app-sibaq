import React, { useEffect, useState } from "react";
import AdminLayout, { AdminPageHead } from "./AdminLayout";
import Button from "./Button";
import { Delete, Edit, Logout, MenuOpen } from "@mui/icons-material";
import InputText from "./InputText";
import InputFile from "./InputFile";
import heritagePlaces from "../data/heritagePlaces";
import InputTextArea from "./InputTextArea";
import { deleteData, getAllData, saveData } from "../lib/firebase";
import heritageCalender from "../data/heritageCalender";

export default function SpecialDays() {
  const [edittingId, setEdittingId] = useState(null);
  const [specialDays, setSpecialDays] = useState(heritageCalender);
  const [savingTrigger, setSavingTrigger] = useState(0);

  useEffect(() => {
    getAllData("special-days").then((result) => {
      setSpecialDays(result);
    });
    return () => {};
  }, [savingTrigger]);

  const defaulFormData = {
    hijridate: "",
    date: "",
    event: "",
  };
  const [formData, setFormData] = useState(defaulFormData);
  return (
    <AdminLayout>
      <div>
        <AdminPageHead pageTitle={"Special days"} />
        <div className="m-auto py-10 max-w-[1250px] MAIN">
          <div className="flex gap-2 BUTTONS">
            <Button className={"bg-green-900 text-white rounded-[15px]"}>
              Add new special day
            </Button>
            <Button
              className={"bg-green-900 text-white rounded-[15px]"}
              onClick={() => {
                heritageCalender.map((item, index) => {
                  saveData("special-days", Date.now().toString() + index, item);
                });
                setSavingTrigger(savingTrigger + 1);
              }}
            >
              Save local special days
            </Button>
            <Button
              className={"bg-green-900 text-white rounded-[15px]"}
              onClick={() => {
                specialDays.map((item, index) => {
                  deleteData("special-days", item._id);
                });
                setSavingTrigger(savingTrigger + 1);
              }}
            >
              Delete all saved specialDays
            </Button>
          </div>

          <div className="relative gap-5 grid grid-cols-[1fr_2fr] py-8 h-full _overflow-auto FORMSandCARDS">
            <div className="top-[2rem] sticky gap-3 grid bg-white px-5 py-10 rounded-[10px] h-min max-h-[calc(100dvh-3.5rem)] overflow-auto FORM">
              <InputText
                value={formData.event}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    event: e.target.value,
                  })
                }
                placeholder={"Special event"}
              />
              <InputText
                placeholder={"Date"}
                value={formData.date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date: e.target.value.trim().replace(" ", ""),
                  })
                }
              />
              <InputText
                placeholder={"Hijri date"}
                value={formData.hijridate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hijridate: e.target.value.trim().replace(" ", ""),
                  })
                }
              />

              <div className="gap-3 grid grid-cols-2">
                <Button
                  className={"bg-green-300 text-green-900"}
                  onClick={() => {
                    if (edittingId) {
                      saveData("special-days", edittingId, formData).then(
                        () => {
                          setSavingTrigger(savingTrigger + 1);
                          setEdittingId(null);
                          setFormData(defaulFormData)
                        }
                      );
                    } else
                      saveData(
                        "special-days",
                        Date.now().toString(),
                        formData
                      ).then(() => {
                        setSavingTrigger(savingTrigger + 1);
                      });
                  }}
                >
                  {edittingId ? `Update event` : `Add event`}
                </Button>
                <Button
                  onClick={() => {
                    setFormData(defaulFormData);
                    setEdittingId(null);
                  }}
                  className={"bg-red-300 text-red-900"}
                >
                  Clear form
                </Button>
              </div>
            </div>
            <div className="gap-5 grid grid-cols-2 pr-2 font-manjari CARDS">
              {specialDays.map((item, index) => {
                return (
                  <div key={index} className="bg-white p-5 rounded-[30px]">
                    <div className="grid grid-cols-[auto_max-content]">
                      <div>
                        <h3 className="font-bold">{item.date}</h3>
                        <h3 className="font-bold">{item.hijridate}</h3>
                      </div>
                      <span>
                        <button
                          onClick={() => {
                            setEdittingId(item._id);
                            setFormData(item);
                          }}
                        >
                          <Edit />
                        </button>
                        <button
                          onClick={() => {
                            deleteData("special-days", item._id);
                            setSavingTrigger(savingTrigger + 1);
                          }}
                        >
                          <Delete />
                        </button>
                      </span>
                    </div>
                    <p className="mt-5">{item.event}</p>
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
