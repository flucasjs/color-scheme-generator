import './App.css';
import React from 'react';
import ColorSwatch from './components/ColorSwatch';
import ColorForm from './components/ColorForm';
import { useIsDesktop } from './hooks/utils';

function App() {
  const isDesktop = useIsDesktop();
  const [scheme, setScheme] = React.useState("");
  const [formData, setFormData] = React.useState({
    mode: "analogic",
    color: "#24B1E0"
  })

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

  const copyToClipboard = (text, e) => {
    navigator.permissions.query({ name: "clipboard-write" }).then(result => {
      if (result.state === "granted" || result.state === "prompt") {
        navigator.clipboard.writeText(text);
      }
    }).catch(err => {
      if (err.name === "TypeError") {
        navigator.clipboard.writeText(text);
      }
    });
  }
  
  React.useEffect(() => {
    searchScheme();
  }, [])

  return (
    <div className={`app-container`}>
          <ColorForm searchScheme={searchScheme} formData={formData} handleChange={handleChange}/>
        
          <div className={`colors-container`}>
            {
              scheme &&
              scheme.map((schemeColor, i) => (
                <ColorSwatch schemeColor={schemeColor} copyToClipboard={copyToClipboard} i={i} isDesktop={isDesktop}/>
              ))
            }
          </div>
    </div>
  );
}

export default App;