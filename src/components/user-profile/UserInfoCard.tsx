"use client";
import React, { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import editUsers from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner"

const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(";").shift() || "");
};

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();


  // ambil dari cookie
  useEffect(() => {
    const id = getCookie("user_id");
    const userName = getCookie("full_name");
    const userEmail = getCookie("email");

    console.log("COOKIE user_id:", id);
    console.log("COOKIE full_name:", userName);
    console.log("COOKIE email:", userEmail);

    if (id) setUserId(id);
    if (userName) setName(userName);
    if (userEmail) setEmail(userEmail);
  }, []);


  const handleSave = async () => {
    try {
      await editUsers(userId, name, email);

      if (!userId) {
        toast.error("User ID tidak ditemukan");
        return;
      }

      toast.success("Berhasil update");

      document.cookie = `full_name=${name}; Path=/; Max-Age=604800; SameSite=Lax;`;
      document.cookie = `email=${email}; Path=/; Max-Age=604800; SameSite=Lax;`;

      router.refresh();

      closeModal();
    } catch (err) {
      toast.error("Gagal update");
      console.log("Gagal update:", err);
    }
  };



  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Informasi Pribadi
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Nama Lengkap</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{name}</p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{email}</p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Bio</p>
              <p className="text-sm font-medHey There I Am Using WhatsAppium text-gray-800 dark:text-white/90">
                Hey There I Am Using WhatsApp
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 lg:w-auto"
        >
          Edit
        </button>
      </div>

      {/* MODAL */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="w-full max-w-[700px] rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Ubah Informasi Personal
          </h4>

          <form className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}>
            <div className="mt-7">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90">
                Informasi Personal
              </h5>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Nama Lengkap</Label>
                  <Input
                    type="text"
                    value={name}
                    placeholder={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Alamat Email</Label>
                  <Input
                    type="text"
                    value={email}
                    placeholder={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Tutup
              </Button>
              <Button size="sm" type="submit" >
                Simpan Perubahan
              </Button>

            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
