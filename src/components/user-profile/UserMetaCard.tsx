"use client";
import React from "react";
import { useModal } from "../../hooks/useModal";
import Image from "next/image";
import { useState, useEffect } from "react";


const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(';').shift() || '');
};
export default function UserMetaCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const userName = getCookie("full_name");
    const userEmail = getCookie("email");

    if (userName) {
      setName(userName);
    }
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const defaultFirstName = name.split(" ")[0] || "";
  const defaultLastName = name.split(" ").slice(1).join(" ") || "";

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <Image
                width={80}
                height={80}
                src="https://i.pinimg.com/736x/c9/2f/e8/c92fe814f244075c3b7ed54ac371a358.jpg"
                alt="user"
              />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {isClient ? name : "Loading..."}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {email}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}