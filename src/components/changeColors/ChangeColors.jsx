'use client'
import React, { useEffect, useState } from 'react'

export default function ChangeColors() {

   

    const [colors, setColors] = useState({
        primary: '#007bff',
        background: '#ffffff',
        text: '#000000',
    });

    const updateColors = () => {
        document.documentElement.style.setProperty('--primary-color', colors.primary);
        document.documentElement.style.setProperty('--background-color', colors.background);
        document.documentElement.style.setProperty('--text-color', colors.text);
    };

    useEffect(() => {
        updateColors();
    }, [colors]);

  return <>
  
  
      <div>
          <h2>Theme Settings</h2>
          <label>Primary Color: <input type="color" value={colors.primary} onChange={e => setColors({ ...colors, primary: e.target.value })} /></label>
          <label>Background: <input type="color" value={colors.background} onChange={e => setColors({ ...colors, background: e.target.value })} /></label>
          <label>Text Color: <input type="color" value={colors.text} onChange={e => setColors({ ...colors, text: e.target.value })} /></label>
      </div>
    
  
  
  </>
}
