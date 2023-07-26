import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Select } from "react-dropdown-select";
// import {Select} from "react-select";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [phone, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function registerUser() {
    try{
      axios.post("/registerB", {
        first_name,
        last_name,
        property,
        username,
        phone,
        email,
        password,
      });
      alert('Submision successful!');
    } catch(e){
      alert('Registeration FAILED!');
    }
  }

  const propertyOptions = [
    { value: "administrator", label: "Administator" },
    { value: "host", label: "Host" },
    { value: "tenant", label: "Tenant" },
    { value: "anonymous", label: "Anonymous" },
  ];

  const handlePropertyChange = (selectedOptions) => {
    // Extracting the values from selected options and storing them in the state
    const selectedValues = selectedOptions.map(option => option.value);
    setSelectedProperties(selectedValues);

    // mine
    // console.log('Selected Properties:', selectedProperties);
    
    // console.log(selectedOptions);
    // setSelectedProperties(selectedOptions.value);
  };

  const handleSubmit = () => {
    // Here, you can perform any additional actions or submit the selectedProperties to the database
    console.log('Selected Properties:', selectedProperties);
    // Your database submission logic goes here...
  };

  const customStyles = {    
    borderRadius: '15px',
    backgroundColor: "rgba(249, 250, 251)",
  };
  
  

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mt-34">
        <h1 className="text-4xl text-center mt-6">Create an account</h1>
          <form  onSubmit={registerUser}>
          <div class="grid gap-4 mb-6 md:grid-cols-2 mt-6">
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                First name
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="John" value={first_name} onChange={ev => setFirstName(ev.target.value)}
                required
              />
            </div>
            <div>
              <label
                for="last_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Last name
              </label>
              <input
                type="text"
                id="last_name"
                className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Doe" value={last_name} onChange={ev => setLastName(ev.target.value)}
                required
              />
            </div>
            <div>
              <label
                for="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className=" bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Username" value={username} onChange={ev => setUsername(ev.target.value)}
                required
              />
            </div>
            <div>
              <label
                for="property"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Choose Property
              </label>
              <Select
                options={propertyOptions}
                placeholder="Choose"
                value = {selectedProperties}// value={propertyOptions.filter(option => selectedProperties.includes(option.value))}
                onChange = {handlePropertyChange}
                multi
                // classNames="bg-gray-50 border-gray-300 text-gray-900 rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                // required
                style={customStyles}
              />
            </div> 
            <div>
              <label
                for="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Phone number" value={phone} onChange={ev => setPhoneNumber(ev.target.value)}
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>
          <div class="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="you@mail.com" value={email} onChange={ev => setEmail(ev.target.value)}
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="ex. a1b2c3!" value={password} onChange={ev => setPassword(ev.target.value)}
              required
            />
          </div>
          {/* <div class="mb-6">
            <label
              for="confirm_password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirm_password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="•••••••••"
            //   ELEGXOS TOY PASSWORD
              required
            ></input>
          </div>
          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              I agree with the{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
            </label>
          </div> */}
          <button
            type="submit" 
            // onClick={handleSubmit}
            className="primary hover:bg-blue-900 focus:ring-2 focus:outline-none"
          >
            Submit
          </button>
          <div className="text-center py-2 text-gray-700 mb-6">
            Already a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
