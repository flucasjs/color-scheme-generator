import './App.css';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ColorSwatch from './components/ColorSwatch';
import ColorForm from './components/ColorForm';
import { useIsDekstop } from './hooks/utils';

function App() {
  const isSmall = useIsDekstop();
  const [scheme, setScheme] = React.useState("");
  const [formData, setFormData] = React.useState({
    mode: "analogic",
    color: "#24B1E0"
  })
  
  const boolArray = [];
  const refArray = [];
  for (let i = 0; i <= 5; i++) {
    boolArray.push(false);
    refArray.push(React.createRef())
  }
  const [isCopied, setIsCopied] = React.useState(boolArray);
  const refs = React.useRef(refArray);


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

  // Remove refs.
  const copyToClipboard = (index, e) => {
    const text = refs.current[index].current.textContent;
    setIsCopied(prevState => prevState.map(() => false));

    // https://developer.mozilla.org/en-US/docs/Web/API/Permissions#browser_support
    navigator.permissions.query({ name: "clipboard-write" }).then(result => {
      if (result.state === "granted" || result.state === "prompt") {
        navigator.clipboard.writeText(text);
        setIsCopied(prevArray => prevArray.map((bool, i) => (index === i)))
      }
    }).catch(err => {
      if (err.name === "TypeError") {
        navigator.clipboard.writeText(text);
        setIsCopied(prevArray => prevArray.map((bool, i) => (index === i)))
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
                <ColorSwatch schemeColor={schemeColor} copyToClipboard={copyToClipboard} refs={refs} i={i} isSmall={isSmall}/>
              ))
            }
          </div>

      {/* <div className={`hex-values-container`}>
        {
          scheme && scheme.map((schemeColor, i) => (
            <div key={schemeColor} className={`hex-value-container`}>
              <span ref={refs.current[i]} onClick={(e) => copyToClipboard(i, e)}>#{schemeColor}</span>
            </div>
          ))
        }
      </div> */}
    </div>
  );
}

export default App;