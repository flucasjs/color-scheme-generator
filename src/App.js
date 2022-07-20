import './App.css';
import React from 'react';

function App() {
  const [scheme, setScheme] = React.useState("");
  const [formData, setFormData] = React.useState({
    mode: "analogic",
    color: "#24B1E0"
  })

  React.useEffect(() => {
    searchScheme();
  }, [])

  const searchScheme = async (e) => {
    e && e.preventDefault();

    const url = `https://www.thecolorapi.com/scheme?hex=${formData.color.replace("#", "")}&mode=${formData.mode}&count=5`
    try {
      const res = await fetch(url);
      const data = await res.json();
      let cleanHexValues = data.colors.map(color => color.hex.clean);
      setScheme(cleanHexValues);
    } catch (err) {
      console.error(err);
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const copyToClipboard = (e) => {
    const {textContent} = e.target;
    navigator.permissions.query({ name: "clipboard-write" }).then(result => {
      if (result.state === "granted" || result.state === "prompt") {
        navigator.clipboard.writeText(textContent);
      }
    });
  }

  return (
    <div className={`app-container`}>
      <form onSubmit={searchScheme}>
        <input className={`color-input`} name="color" type="color" value={formData.color} onChange={handleChange}></input>
        <select className={`mode-selector`} name="mode" value={formData.mode} onChange={handleChange}>
          <option value="">--Select a mode--</option>
          <option value="analogic">analogic</option>
          <option value="monochrome">monochrome</option>
          <option value="monochrome-light">monochrome-light</option>
          <option value="monochrome-dark">monochrome-dark </option>
          <option value="complement">complement</option>
          <option value="analogic-complement">analogic-complement</option>
          <option value="triad">triad</option>
          <option value="quad">quad</option>
        </select>
        <button className={`submit-button`}>Get Color Scheme</button>
      </form>
      <div className={`colors-container ${scheme && "box-shadow"}`}>
        {
          scheme && scheme.map(schemeColor => <div key={schemeColor} className={'color-container'} style={{'--bg-color': `#${schemeColor}`}}></div>)
        }
      </div>
      <div className={`hex-values-container`}>
        {
          scheme && scheme.map(schemeColor => <div key={schemeColor} className={`hex-value-container`}><span onClick={copyToClipboard}>#{schemeColor}</span></div>)
        }
      </div>
    </div>
  );
}

export default App;