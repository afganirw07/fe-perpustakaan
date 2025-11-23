import InputStates from "@/components/form/form-elements/InputStates";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Perpustakaan Nasional"
};

export default function FormElements() {
  return (
    <div>
      <div >
          <InputStates />
      </div>
    </div>
  );
}
