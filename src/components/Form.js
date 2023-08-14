import html2canvas from "html2canvas";
import React, { useRef } from "react";
import { useState, useEffect } from "react";

const Form = () => {
  const memeRef = useRef();

  const [memes, setMemes] = useState([]);
  const [formData, setFormData] = useState({
    topText: "",
    bottomText: "",
    randomImg: "http://i.imgflip.com/1bij.jpg",
  });

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemes(data.data.memes));

    // Added [] to the useEffect hook so that it runs only once
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleClick = () => {
    const randomNumber = Math.floor(Math.random() * memes.length);

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        randomImg: memes[randomNumber].url,
      };
    });
  };

  const downloadImage = async () => {
    const canvas = await html2canvas(memeRef.current, {
      useCORS: true,
    });
    const image = canvas.toDataURL("image/png", 1.0);

    const linkToDownload = document.createElement("a");
    linkToDownload.style = "display:none;";
    linkToDownload.download = crypto.randomUUID().toString("hex");
    linkToDownload.href = image;

    document.body.appendChild(linkToDownload);
    linkToDownload.click();
    document.body.removeChild(linkToDownload);

    linkToDownload.remove();
  };

  return (
    <main>
      <div className="form">
        <div className="flex even">
          <input
            type="text"
            placeholder="top text"
            className="form--input"
            name="topText"
            value={formData.topText}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="bottom text"
            className="form--input"
            name="bottomText"
            value={formData.bottomText}
            onChange={handleChange}
          />
        </div>
        <div className="flex even">
          <button className="form--button" onClick={handleClick}>
            Get a new meme image 🖼
          </button>
          <button className="form--button" onClick={downloadImage}>
            Downlaod Image
          </button>
        </div>
        <div className="form--meme" ref={memeRef}>
          <h3 className="meme--text top">{formData.topText}</h3>
          <img src={formData.randomImg} alt="meme img" className="meme--img" />
          <h3 className="meme--text bottom">{formData.bottomText}</h3>
        </div>
      </div>
    </main>
  );
};

export default Form;
