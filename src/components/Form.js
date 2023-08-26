import { saveAs } from "file-saver";
import { useEffect, useRef, useState } from "react";

const Form = () => {
  const [memes, setMemes] = useState([]);
  const [formData, setFormData] = useState({
    topText: "",
    bottomText: "",
    randomImg: "http://i.imgflip.com/1bij.jpg",
  });

  const canvasRef = useRef(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemes(data.data.memes));
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

  const getNewMeme = () => {
    const randomNumber = Math.floor(Math.random() * memes.length);
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        randomImg: memes[randomNumber].url,
      };
    });
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = formData.randomImg;
    img.addEventListener("load", () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "900 8vh Impact";
      ctx.letterSpacing = "1px";
      ctx.shadowColor = "black";
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 0;
      ctx.shadowBlur = 2;
      ctx.fillText(formData.topText.toUpperCase(), canvas.width / 2, 80);
      ctx.fillText(
        formData.bottomText.toUpperCase(),
        canvas.width / 2,
        canvas.height - 30
      );
      canvas.toBlob((blob) => saveAs(blob, "meme.jpg"));
    });
  };

  return (
    <main>
      <div className="form">
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
        <button
          className="form--button"
          id="get-meme-button"
          onClick={getNewMeme}
        >
          Get a new meme image 🖼
        </button>
        <button className="form--button" id="save-button" onClick={saveImage}>
          Save Meme ⬇️
        </button>
        <div className="form--meme">
          <h3 className="meme--text top">{formData.topText}</h3>
          <img src={formData.randomImg} alt="meme img" className="meme--img" />
          <h3 className="meme--text bottom">{formData.bottomText}</h3>
        </div>
        <canvas ref={canvasRef} id="canvas"></canvas>
      </div>
    </main>
  );
};

export default Form;
