import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Perks from "../Perks";
import Image from "../Image";

import { MapContainer, TileLayer, Marker } from "react-leaflet";

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [maxBeds, setMaxBeds] = useState(1);
  const [numBaths, setNumBaths] = useState(1);
  const [numBedrooms, setNumBedrooms] = useState(1);
  const [area, setArea] = useState(50);
  const [minDays, setMinDays] = useState(2);
  const [price, setPrice] = useState(1);

  function inputHeader(text) {
    return <h2 className="text-xl mt-4">{text}</h2>;
  }

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    try {
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      setAddedPhotos((prev) => {
        return [...prev, filename];
      });
      console.log("Image uploaded:", filename.data);
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
    setPhotoLink("");
  }

  function uploadPhoto(ev) {
    ev.preventDefault();
    try {
      const files = ev.target.files;
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("photos", files[i]);
      }
      axios
        .post("/upload-photos", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          const { data: filenames } = response;
          setAddedPhotos((prev) => {
            return [...prev, ...filenames];
          });
          console.log("Image uploaded from your device:", files);
        });
    } catch (error) {
      console.error("Error uploading the photo from your device:", error);
    }
  }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            Add a new place
          </Link>
        </div>
      )}
      {action == "new" && (
        <div className="mt-4 grow items-center flex justify-around">
          <form>
            {inputHeader("Title")}
            <input
              type="text"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="for example: My exotic house"
            />

            {inputHeader("Address")}
            <input
              type="text"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              placeholder="address"
            />

            {inputHeader("Extra informations")}
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mb-2">Bedrooms</h3>
                <input
                  type="number"
                  value={numBedrooms}
                  onChange={(ev) => setNumBedrooms(ev.target.value)}
                  placeholder="3"
                />
              </div>
              <div>
                <h3 className="mb-2">Number of Beds</h3>
                <input
                  type="number"
                  value={maxBeds}
                  onChange={(ev) => setMaxBeds(ev.target.value)}
                  placeholder="4"
                />
              </div>
              <div>
                <h3 className="mb-2">Number of Baths</h3>
                <input
                  type="number"
                  value={numBaths}
                  onChange={(ev) => setNumBaths(ev.target.value)}
                  placeholder="2"
                />
              </div>
              <div>
                <h3 className="mb-2">Maximum guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                  placeholder="6"
                />
              </div>
              <div>
                <h3 className="mb-2">Min Days</h3>
                <input
                  type="number"
                  value={minDays}
                  onChange={(ev) => setMinDays(ev.target.value)}
                  placeholder="2"
                />
              </div>
              <div>
                <h3 className="mb-2">Area(cm)</h3>
                <input
                  type="number"
                  value={area}
                  onChange={(ev) => setArea(ev.target.value)}
                  placeholder="50"
                />
              </div>
            </div>
            <div className="mt-2 grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="mb-2">Check in time</h2>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                  placeholder="13:00"
                />
              </div>
              <div>
                <h2 className="mb-2">Check out time</h2>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                  placeholder="11:30"
                />
              </div>
            </div>

            {inputHeader("Perks")}
            <p className="text-gray-600 test-sm">
              Select all the perks about your place
            </p>
            <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>

            {inputHeader("Description")}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Give a description about your place"
            />

            <div className="mt-2 grid gap-4 sm:grid-cols-3">
              <div>
                <h2 className="mb-2">Kind of house</h2>
                <input type="text" placeholder="Mounten House" />
              </div>
              <div>
                <h2 className="mb-2">Price per night</h2>
                <input
                  type="number"
                  value={price}
                  onChange={(ev) => setPrice(ev.target.value)}
                  placeholder="99"
                />
              </div>
            </div>

            {inputHeader("Photos")}
            <div className="flex gap-2">
              <input
                type="text"
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
                placeholder={"Add using a link ... jpg"}
              />
              <button onClick={addPhotoByLink} className="add text-center">
                Add Photo
              </button>
            </div>

            <div className="mt-2 grid gap-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
              {addedPhotos.length > 0 &&
                addedPhotos.map((filename) => (
                  <div className="h-32 flex relative" key={filename}>
                    <img
                      className="rounded-2xl w-full object-cover"
                      src={"http://localhost:4000/" + filename}
                      alt=""
                    />
                  </div>
                ))}

              <label className="cursor-pointer flex items-center justify-center border bg-transparent rounded-xl p-8 text-2xl text-gray-450 ">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                  />
                </svg>
                Upload
              </label>
            </div>

            <div className="mt-2 grid ">
              <h2 className="text-gray-600  mt-2 test-sm">
                Anything else you need to add
              </h2>
              <textarea
                value={extraInfo}
                onChange={(ev) => setExtraInfo(ev.target.value)}
                placeholder="The house rules, ect"
              />
            </div>

            <div className="center-container">
              <button className="saveButton">Place your home</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
