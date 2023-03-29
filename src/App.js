import React, { useState, useEffect } from "react"
import { Routes, Route, Link } from "react-router-dom"
import SimpleCrypto from "simple-crypto-js"

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Link to={"/encrypt"}>
              <button style={{ cursor: "pointer" }}>
                Go to encryption page
              </button>
            </Link>
            <br />
            <Link to={"/decrypt"}>
              <button style={{ cursor: "pointer" }}>
                Go to decryption page
              </button>
            </Link>
          </>
        }
      ></Route>
      <Route path="/encrypt" element={<EncDecPage mode={"enc"} />} />
      <Route path="/decrypt" element={<EncDecPage mode={"dec"} />} />
    </Routes>
  )
}

function EncDecPage({ mode }) {
  const [key, setKey] = useState("")
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [isEncryptMode, setIsEncryptMode] = useState(mode === "enc")

  useEffect(() => {
    document.title = `${isEncryptMode ? "Encryption" : "Decryption"} page`
  })

  const handleProcess = () => {
    console.log(inputText)
    const outputTextToSet = isEncryptMode
      ? encryptText(inputText, key)
      : decryptText(inputText, key)
    setOutputText(outputTextToSet)
  }

  // Encrypt function
  function encryptText(text, key) {
    return new SimpleCrypto(key).encrypt(text)
  }

  // Decrypt function
  function decryptText(text, key) {
    return new SimpleCrypto(key).decrypt(text)
  }

  return (
    <div className="App">
      <h1>{isEncryptMode ? "Encryption" : "Decryption"} Demo</h1>
      <label>{isEncryptMode ? "Encryption" : "Decryption"} Key:</label>
      <input type="text" value={key} onChange={(e) => setKey(e.target.value)} />
      <br />
      <label>{isEncryptMode ? "Plain Text:" : "Encrypted Text:"}</label>
      <br />
      <textarea
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        cols="50"
        rows="5"
      ></textarea>
      <br />
      <button style={{ cursor: "pointer" }} onClick={handleProcess}>
        {isEncryptMode ? "Encrypt" : "Decrypt"}
      </button>
      <br />
      <label>{isEncryptMode ? "Encrypted Text:" : "Decrypted Text:"}</label>
      <br />
      <textarea
        type="text"
        value={outputText}
        readOnly
        cols="50"
        rows="5"
      ></textarea>
      <br />
      <Link to={isEncryptMode ? "/decrypt" : " /encrypt"}>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => setIsEncryptMode(!isEncryptMode)}
        >
          Switch to {isEncryptMode ? "Decryption" : "Encryption"} Mode
        </button>
      </Link>
    </div>
  )
}

export default App
