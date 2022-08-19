import React from 'react';

const ColorForm = ({searchScheme, formData, handleChange}) => {
  return (
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
  )
}

export default ColorForm;