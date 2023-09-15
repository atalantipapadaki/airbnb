import {Link, Navigate} from "react-router-dom";
import React, { useContext, useState } from 'react';
import './App.css';
import { UserContext } from "./UserContext";
import ImageProfile from "./ImageProfile";
import axios from "axios";

export default function Header(){
    const [redirect, setRedirect] = useState(false);
    const {user, setUser} = useContext(UserContext);

    const [toggleMenu, setToggleMenu] = useState(false);

    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu);
    };

    async function logout() {
        await axios.post("/logout");
        setUser(null);
        setToggleMenu(false);
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={"/"} />;
    }
    //εξαφανιζεται το header. προτεινω εαν δεν μπορουμε/προλαβουμε αν το 
    // φτιαξουμε να αφήσουμε το logout μονο στο profile και να σβησουμε τις
    //3 γραμμουλες

    return(
        <div>
            <header className="header"> 
                <Link to={'/'} className="flex items-center gap-2"> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span className="font-bold text-xl">Places</span>
                </Link>
                
                <div className="flex gap-6 items-center border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-250">
                    <div> Anywhere </div>
                    <div className="border-l border-gray-300"></div>
                    <div> Any week </div>
                    <div className="border-l border-gray-300"></div>
                    <div> Guests </div>
                    <button className="bg-primary text-white p-2 rounded-full"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </div>

                <div className="flex gap-2 items-center border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-250">
                    {!!user && <button 
                        className="flex bg-transparent"
                        onClick={handleToggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 relative button-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    }
                    {/*επειδη αρκετα ασχοληθηκα, αν προλαβουμε να του φτιαξουμε την θεση
                    αλλιως μπορουμε να αφησουμε σταθερα εκει το logout button*/}
                    {!!user && toggleMenu && (
                            <button  
                                className="bg-primary text-white w-min rounded-2xl p-2 "
                                onClick={logout}>
                            {" "}
                            Logout{" "}
                            </button>
                        )}
                    <Link to={user?'/account':'/login'} className="flex gap-2 items-center">
                        <div className="rounded-full item-button border border-gray-600 overflow-hidden">  
                            {user && user.profilephoto?.[0] ?  ( 
                                <ImageProfile
                                className="rounded-3xl w-8 object-cover aspect-square"
                                src={user.profilephoto?.[0]}
                                alt=""
                            />
                            ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 relative top-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        
                            )}
                        </div>
                        {!!user && (
                            <div>
                                {user.username}
                            </div>
                        )}
                    </Link> 
                </div>

                
            </header>
            
        </div>
    )
}