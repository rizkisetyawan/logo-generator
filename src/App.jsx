import { motion, useAnimation } from "framer-motion";
import html2canvas from "html2canvas";
import React from "react";
import iconDownload from "./assets/download.svg";
import Draggable from "./components/Draggable";
import Modal from "./components/Modal";

import "./app.css";

const logoColors = ["#FE4A49", "#2AB7CA", "#FED766", "#E6E6EA", "#F4F4F8"];

function App() {
  const drawRef = React.useRef(null);
  const controls = useAnimation();
  const [titleLogo, setTitleLogo] = React.useState("Frontend Interview");
  const [sizeLogo, setSizeLogo] = React.useState(26);
  const [selectedColor, setSelectedColor] = React.useState(logoColors[0]);
  const [openModal, setOpenModal] = React.useState(false);

  const handleConvertToCanvas = () => {
    setOpenModal(true);

    const drawElement = drawRef.current;
    html2canvas(drawElement).then((canvas) => {
      const writeCanvasElement = document.getElementById("write-canvas");
      writeCanvasElement.appendChild(canvas);
    });
  };

  const handleTitleLogo = (e) => {
    setTitleLogo(e.target.value);
  };

  const handleSizeLogo = (e) => {
    setSizeLogo(+e.target.value);
  };

  const handleSelectColor = (color) => () => {
    setSelectedColor(color);
  };

  const handleOpenModal = (bool) => {
    setOpenModal(bool);
  };

  const arrTitleLogo = titleLogo.split("");

  React.useEffect(() => {
    controls.start({
      scale: [1, 1.2, 1.5, 1.7, 1],
      opacity: [1, 0.7, 0.5, 0, 1],
      transition: {
        duration: 1,
        times: [0, 0.25, 0.5, 0.75, 1],
      },
    });
  }, [titleLogo, controls]);

  return (
    <>
      <Modal open={openModal} onOpenModal={handleOpenModal} />
      <div className="header">Super Simple Logo Maker 👩‍🎨</div>
      <div className="body">
        <div className="body-box">
          <p className="body-box-label">*The letters are draggable</p>
          <div className="body-box-draw" ref={drawRef}>
            <div
              className="body-box-draw-title"
              style={{
                color: selectedColor,
                fontSize: `${sizeLogo}px`,
                lineHeight: `${sizeLogo + sizeLogo / 2}px`,
              }}
            >
              {arrTitleLogo.map((letter, index) => (
                <Draggable
                  key={`${letter}-${index}`}
                  index={index}
                  letter={letter}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="body-controller">
          <div className="body-controller-title">
            <input
              type="text"
              name="title"
              value={titleLogo}
              onChange={handleTitleLogo}
              placeholder="Type your text logo here"
            />
            <motion.span
              animate={controls}
              initial={{ scale: 0, opacity: 1 }}
            />
          </div>
          <div className="body-controller-size">
            <label htmlFor="vol">Size :</label>
            <input
              type="range"
              id="vol"
              name="vol"
              min="8"
              max="72"
              value={sizeLogo}
              onChange={handleSizeLogo}
              className="body-controller-size-range"
            />
            <label htmlFor="vol">{sizeLogo}px</label>
          </div>
          <div className="body-controller-colors">
            {logoColors.map((color) => (
              <div
                key={color}
                className={`body-controller-color ${
                  color === selectedColor && "body-controller-color-active"
                }`}
                style={{ backgroundColor: color }}
                onClick={handleSelectColor(color)}
              />
            ))}
          </div>
          <button
            className="body-controller-btn"
            onClick={handleConvertToCanvas}
          >
            <img src={iconDownload} className="logo react" alt="React logo" />
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
