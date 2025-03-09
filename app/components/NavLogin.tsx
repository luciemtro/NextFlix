"use client";

import LoginButton from "@/components/loginButton";
import LanguageSelector from "./LanguageSelector";

export default function NavLogin() {
  return (
    <nav>
      <header className="flex justify-between p-4 bg-black text-white">
        <h1 className="text-2xl font-bold">NextFlix</h1>
        <div className="flex gap-4">
          <LanguageSelector />
          <LoginButton />
        </div>
      </header>
    </nav>
  );
}
