"use client";

import { Button } from "@/components/ui/button";
import { Sun, SunMoon } from "lucide-react";
import React, { useState } from "react";

function DarkModeToggleBtn() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <button
      className="hover:bg-transparent"
      onClick={() => setDarkMode((prev) => !prev)}
    >
      {darkMode ? <SunMoon size={25} /> : <Sun size={25} />}
    </button>
  );
}

export default DarkModeToggleBtn;
