import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import RDraggable from "react-draggable";

const drag = {
  hiddenTop: {
    y: "50px",
    opacity: 0,
  },
  hiddenBottom: {
    y: "-50px",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

function Draggable({ letter, index }) {
  const [activeDrags, setActiveDrags] = React.useState(0);
  const [isMouseDown, setIsMouseDown] = React.useState(false);

  const onStart = () => {
    setActiveDrags(activeDrags + 1);
  };

  const onStop = () => {
    setActiveDrags(activeDrags - 1);
  };

  React.useEffect(() => {
    const handleMouseDown = (event) => {
      if (event.button === 0) {
        setIsMouseDown(true);
      }
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <RDraggable onStart={onStart} onStop={onStop}>
      <div
        style={{
          display: "inline-block",
          cursor: isMouseDown ? "grabbing" : "grab",
        }}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
      >
        <motion.p
          variants={drag}
          initial={index % 2 === 0 ? "hiddenTop" : "hiddenBottom"}
          animate="visible"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.p>
      </div>
    </RDraggable>
  );
}

Draggable.propTypes = {
  letter: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Draggable;
