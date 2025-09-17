"use client";
import * as React from "react";

export default function Home() {
  const [password, setPassword] = React.useState("");
  const [length, setLength] = React.useState(10);
  const [copied, setCopied] = React.useState(false);
  const [useChars, setUseChars] = React.useState(true);
  const [useNumbers, setUseNumbers] = React.useState(true);

 
  const ALL =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  const CHARS =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+~`|}{[]:;?><,./-=";
  const NUMBERS = "0123456789";

 
  function generatePassword() {
    let charset = "";
    if (useChars) charset += CHARS;
    if (useNumbers) charset += NUMBERS;
    if (!charset) charset = ALL; 

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const random = Math.floor(Math.random() * charset.length);
      newPassword += charset[random];
    }
    setPassword(newPassword);
    setCopied(false);
  }

  React.useEffect(() => {
    generatePassword();
  }, [length, useChars, useNumbers]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-neutral-900 border border-neutral-800">
        <h1 className="text-2xl font-semibold text-center mb-6 tracking-wide">
          Password Generator
        </h1>

       
        <input
          type="text"
          value={password}
          readOnly
          className="w-full px-3 py-2 mb-4 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none"
        />

        
        <button
          type="button"
          className="w-full mb-4 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors"
          onClick={() => {
            navigator.clipboard.writeText(password);
            setCopied(true);
          }}
        >
          Copy to Clipboard
        </button>

        {copied && (
          <p className="text-sm text-green-400 mb-4 text-center">
            ✅ Password copied!
          </p>
        )}

        
        <label className="block text-sm mb-2 text-neutral-400">
          Length: <span className="text-white font-medium">{length}</span>
        </label>
        <input
          type="range"
          min="4"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-white mb-6"
        />

       
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <input
              id="chars"
              type="checkbox"
              checked={useChars}
              onChange={() => setUseChars(!useChars)}
              className="accent-white"
            />
            <label htmlFor="chars" className="text-neutral-300">
              Include Characters
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="numbers"
              type="checkbox"
              checked={useNumbers}
              onChange={() => setUseNumbers(!useNumbers)}
              className="accent-white"
            />
            <label htmlFor="numbers" className="text-neutral-300">
              Include Numbers
            </label>
          </div>
        </div>

       
        <button
          type="button"
          className="w-full px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors"
          onClick={generatePassword}
        >
          Generate New Password
        </button>
      </div>
    </div>
  );
}
