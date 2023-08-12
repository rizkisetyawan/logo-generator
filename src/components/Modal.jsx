import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "200px",
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

function Modal({ open, onOpenModal }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="modal" variants={modal}>
            <div className="modal-close" onClick={() => onOpenModal(false)}>
              <div>{"\u00d7"}</div>
            </div>
            <div className="modal-body" id="write-canvas" />
            <div className="modal-footer">
              <p>Right click and choose save image</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default Modal;
