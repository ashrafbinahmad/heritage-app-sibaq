import React, { useEffect, useState } from "react";
import AdminLayout, { AdminPageHead } from "./AdminLayout";
import Button from "./Button";
import { Delete, Edit } from "@mui/icons-material";
import InputText from "./InputText";
import { deleteData, getAllData, saveData } from "../lib/firebase";
import heritageCalender from "../data/heritageCalender";
import halalHotelsData from "../data/halalHotels";

export default function HalalHotels() {
  const [edittingId, setEdittingId] = useState(null);
  const [halalHotels, setHalalHotels] = useState(halalHotelsData);
  const [savingTrigger, setSavingTrigger] = useState(0);

  useEffect(() => {
    getAllData("halal-hotels").then((result) => {
      setHalalHotels(result);
    });
    return () => {};
  }, [savingTrigger]);

  const defaulFormData = {
    id: '',
    name: "",
    hotel: "",
    hotelimage: "",
    hotellink: "",
  };
  const [formData, setFormData] = useState(defaulFormData);
  return (
    <AdminLayout>
      <div>
        <AdminPageHead pageTitle={"Halal hotels"} />
        <div className="m-auto py-10 max-w-[1250px] MAIN">
          <div className="flex gap-2 BUTTONS">
            <Button className={"bg-green-900 text-white rounded-[15px]"}>
              Add new halal hotel
            </Button>
            <Button
              className={"bg-green-900 text-white rounded-[15px]"}
              onClick={() => {
                halalHotelsData.map((item, index) => {
                  saveData("halal-hotels", Date.now().toString() + index, item);
                });
                setSavingTrigger(savingTrigger + 1);
              }}
            >
              Save local halal hotels
            </Button>
            <Button
              className={"bg-green-900 text-white rounded-[15px]"}
              onClick={() => {
                halalHotels.map((item, index) => {
                  deleteData("halal-hotels", item._id);
                });
                setSavingTrigger(savingTrigger + 1);
              }}
            >
              Delete all saved halalHotels
            </Button>
          </div>

          <div className="relative gap-5 grid grid-cols-[1fr_2fr] py-8 h-full _overflow-auto FORMSandCARDS">
            <div className="top-[2rem] sticky gap-3 grid bg-white px-5 py-10 rounded-[10px] h-min max-h-[calc(100dvh-3.5rem)] overflow-auto FORM">
              <InputText
                placeholder={"ID"}
                value={formData.id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    id: e.target.value,
                  })
                }
              />
              <InputText
                placeholder={"Name of the hotel"}
                value={formData.hotel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hotel: e.target.value,
                  })
                }
              />
              <InputText
                placeholder={"Nearby heritage place"}
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value.trim().replace(" ", ""),
                  })
                }
              />
              <InputText
                placeholder={"Image address"}
                value={formData.hotelimage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hotelimage: e.target.value.trim().replace(" ", ""),
                  })
                }
              />
              <InputText
                placeholder={"Map address"}
                value={formData.hotellink}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hotellink: e.target.value.trim().replace(" ", ""),
                  })
                }
              />

              <div className="gap-3 grid grid-cols-2">
                <Button
                  className={"bg-green-300 text-green-900"}
                  onClick={() => {
                    if (edittingId) {
                      saveData("halal-hotels", edittingId, formData).then(
                        () => {
                          setSavingTrigger(savingTrigger + 1);
                          setEdittingId(null);
                          setFormData(defaulFormData)
                        }
                      );
                    } else
                      saveData(
                        "halal-hotels",
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
              {halalHotels.map((item, index) => {
                return (
                  <div key={index} className="bg-white p-5 rounded-[30px]">
                    <div className="grid grid-cols-[auto_max-content]">
                      <div>
                        <h3 className="font-bold">{item.id}</h3>
                        <h3 className="font-bold">{item.hotel}</h3>
                        <h3 className="font-bold">Near: {item.name}</h3>
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
                            deleteData("halal-hotels", item._id);
                            setSavingTrigger(savingTrigger + 1);
                          }}
                        >
                          <Delete />
                        </button>
                      </span>
                    </div>
                    <img className="rounded-[10px] w-full h-[200px] min-h-[100px] object-center object-cover" src={item.hotelimage} alt="" />
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
