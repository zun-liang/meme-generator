import React from "react"
import { useState, useEffect } from "react"

const Form = () => {
    const [memes, setMemes] = useState([])
    const [formData, setFormData] = useState({
        topText: "",
        bottomText: "",
        randomImg: "http://i.imgflip.com/1bij.jpg"
    })

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setMemes(data.data.memes))
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value 
            }
        })
    }

    const getNewMeme = () => {
        const randomNumber = Math.floor(Math.random() * memes.length)
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                randomImg: memes[randomNumber].url
            }
        })
    }

    return (
        <main>
            <div className="form">
                <input 
                    type="text" 
                    placeholder="top text" 
                    className="form--input"
                    name="topText"
                    value={formData.topText}
                    onChange={handleChange} />
                <input 
                    type="text" 
                    placeholder="bottom text" 
                    className="form--input"
                    name="bottomText"
                    value={formData.bottomText}
                    onChange={handleChange} />
                <button className="form--button" id="get-meme-button" onClick={getNewMeme}>
                    Get a new meme image 🖼
                </button>
                <button className="form--button" id="save-button">
                    Save Meme
                </button>
                <div className="form--meme">
                    <h3 className="meme--text top">{formData.topText}</h3>
                    <img src={formData.randomImg} alt="meme img" className="meme--img"/>
                    <h3 className="meme--text bottom">{formData.bottomText}</h3>
                </div>
            </div>
        </main>
    )
}

export default Form