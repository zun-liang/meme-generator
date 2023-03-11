import React from "react";

export default function Form() {
    const [memes, setMemes] = React.useState([])
    const [formData, setFormData] = React.useState({
        topText: "",
        bottomText: "",
        randomImg: "http://i.imgflip.com/1bij.jpg"
    })

    React.useEffect(function() {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setMemes(data.data.memes))
    })

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value 
            }
        })
    }

    function handleClick() {
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
                <button className="form--button" onClick={handleClick}>
                    Get a new meme image  🖼
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