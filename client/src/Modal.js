import React, { useState } from "react";
import { notifyError } from "./utils/toaster";

function Modal(props) {
  const [name, setName] = useState("");

  const { handleOk, show } = props;

  const showHideClassName = show ? "modal display-block" : "modal display-none";
  function onClick() {
    if (name.length > 12) {
      notifyError("Your name is too long buddy! :)");
      return;
    } else if (name.length === 0) {
      notifyError("Please, enter your name! :) ");
      return;
    } else {
      handleOk(name);
    }
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div id="modal-content">
          <div className="modal-section" id="modal-title">
            <h3 id="modal-title-h3"> Your name please</h3>
          </div>
          <div className="modal-section" id="modal-input">
            <input
              className="modal-input"
              type="text"
              value={name}
              placeholder="e.g Joe Doe"
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="modal-section" id="modal-btn-wrapper">
            <button className="blue-btn" id="modal-btn" onClick={onClick}>
              Let's go!
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Modal;
