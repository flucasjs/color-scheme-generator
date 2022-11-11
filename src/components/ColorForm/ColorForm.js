import React from 'react';
import { motion } from 'framer-motion';

const ColorForm = ({searchScheme, formData, handleChange}) => {
  const colorInput = React.useRef(null);

  return (
    <form onSubmit={searchScheme}>
      <motion.div className={`color-input-container`}>
        <motion.div
            onClick={() => colorInput.current.click()}
            className={`color-input-text`}
          >
            {formData.color}
        </motion.div>
        <input ref={colorInput} className={`color-input`} name="color" type="color" value={formData.color} onChange={handleChange}></input>
      </motion.div>

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
  )
}

export default ColorForm;