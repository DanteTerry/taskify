"use client";

import { Button } from "@/components/ui/button";
import { Sun, SunMoon } from "lucide-react";
import React, { useState } from "react";

function DarkModeToggleBtn() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      onClick={() => setDarkMode((prev) => !prev)}
    >
      {darkMode ? <SunMoon size={25} /> : <Sun size={25} />}
    </Button>
  );
}

export default DarkModeToggleBtn;
