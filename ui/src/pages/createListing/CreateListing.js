import React, { useContext, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import design1 from "../../assets/img/3dDesigns/0275.png";
import errorAlert from "../../components/alerts/errorAlert";
import successAlert from "../../components/alerts/successAlert";
import warningAlert from "../../components/alerts/warningAlert";
import FirstForm from "../../components/createListing/FirstForm";
import SecondForm from "../../components/createListing/SecondForm";
import { AuthContext } from "../../context/Auth/AuthContextProvider";
import { ListingsContext } from "../../context/Listings/ListingsContextProvider";
import "./createListing.css";

function CreateListing() {
  const {
    authState: { user },
    setIsOwner,
  } = useContext(AuthContext);
  const { create } = useContext(ListingsContext);

  const [nextFormState, setNextFormState] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    address: {
      details: "",
      district: "",
      city: "",
    },
    description: "",
    area: { length: "", width: "" },
    bathrooms: "",
    bedrooms: "",
    payment: { price: "", period: "" },
    status: "",
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadAlert = async () => {
      if (!user?.isOwner) {
        const alert = await warningAlert(
          "You are not an owner",
          "Become an owner to create listings? Your renting history can be lost.\nYou can always create a new account to avoid the aforementioned troubles."
        );
        if (!alert.isConfirmed) {
          window.location.href = "/";
        }
      }
    };
    loadAlert();
  }, [user]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    // check empty fields
    if (Object.values(formData).some((item) => !item)) {
      return alert("Not enough information.");
    }
    // no action if no image is chosen
    if (images.length <= 0) {
      return alert("Please provide some images of the property.");
    }

    // ! not using FormData means multer won't work
    // append to FormData
    const fd = new FormData();
    Object.keys(formData).forEach((key) => {
      fd.append(`${key}`, formData[key]);
    });
    // nested objects escaped the loop in state
    const nestedObject = ["address", "area", "payment"];
    for (const item of nestedObject) {
      Object.keys(formData[item]).forEach((key) => {
        fd.append(`${item}[${key}]`, formData[item][key]);
      });
    }
    // append image (must use form-data)
    for (const image of images) {
      fd.append("images", image);
    }

    // create listing
    const res = await create(fd);

    if (res?.success) {
      await successAlert(res.message)
        .then(setIsOwner({ isOwner: true }))
        .then(() => {
          window.location.href = "/";
        });
    } else errorAlert(res?.message);
  };

  return (
    <div className="">
      <div className="container mx-auto relative justify-between">
        <div className="w-full">
          <div className="text-3xl font-bold mb-3">
            Create a listing and find ready-to-move renters in seconds.
          </div>
          {/* divided into two forms */}
          <div className="relative w-8/12">
            <CSSTransition
              in={nextFormState}
              classNames="nextform"
              timeout={1500}
            >
              <div className="absolute w-9/12" encType="multipart/form-data">
                {nextFormState ? (
                  <SecondForm
                    data={formData}
                    setData={setFormData}
                    setImages={setImages}
                    setNextFormState={setNextFormState}
                    handleOnSubmit={handleOnSubmit}
                  />
                ) : (
                  <FirstForm
                    data={formData}
                    setData={setFormData}
                    setNextFormState={setNextFormState}
                  />
                )}
              </div>
            </CSSTransition>
          </div>
        </div>
        <div className="absolute w-3/12 right-0 top-0">
          <img src={design1} className="w-full" alt=""></img>
        </div>
      </div>
    </div>
  );
}

export default CreateListing;
