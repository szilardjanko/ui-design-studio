import { useAuth } from "@/context/AuthContext";
import { PopupTextType } from "@/context/SideBarContext";
import { supabase } from "@/lib/supabaseClient";
import React, { useState } from "react";

type PopupContentProps = {
  popupText: PopupTextType;
  name: string;
  setName: (name: string) => void;
  setNameError: (error: string) => void;
  nameError: string;
  saveStatus: string;
};

export const PopupContent: React.FC<PopupContentProps> = ({
  popupText,
  name,
  setName,
  setNameError,
  nameError,
  saveStatus,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { user } = useAuth();

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/api/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      await supabase.auth.signOut();

      window.location.href = "/login";
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  switch (popupText.handleConfirm) {
    case "open":
      return (
        <div className="flex flex-col items-center p-2">
          <div className="text-lg font-semibold">
            Choose where to open your UI design:
          </div>
          <div className="flex flex-col items-start">
            <div>• Open from your Online Account</div>
            <div>• Upload from your Computer</div>
          </div>
        </div>
      );
    case "save":
      return (
        <div className="flex flex-col items-center p-4">
          <div className="mb-4 text-center">
            Save your UI design to your Online Account
          </div>
          <div>File Name:</div>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
            }}
            className="mt-4 rounded-2xl border border-neutral-500 p-2 text-black shadow shadow-slate-700"
          />
          {nameError && <div className="mt-4 text-red-500">{nameError}</div>}
          {saveStatus && (
            <div className="mt-4 text-slate-100">{saveStatus}</div>
          )}
        </div>
      );
    case "account":
      return (
        <div className="flex select-text flex-col p-4">
          <div className="mb-4">Account</div>
          <div>Email: {user?.email}</div>
          <div>
            Created: {new Date(user?.created_at ?? 0).toLocaleDateString()}
          </div>
          <div className="mb-4">ID: {user?.id}</div>
          {confirmDelete && (
            <div className="text-right font-bold text-red-500">
              Confirm account deletion
            </div>
          )}
          <div
            className="cursor-pointer text-right text-red-500"
            onClick={() => {
              if (!confirmDelete) {
                setConfirmDelete(true);
              } else {
                handleDeleteAccount();
              }
            }}
          >
            Delete Account
          </div>
        </div>
      );
    default:
      return (
        <div className="m-5 text-center text-white">{popupText.infoText}</div>
      );
  }
};
