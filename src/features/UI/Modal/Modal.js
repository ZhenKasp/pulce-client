import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => (
  <>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div className={classes.Modal}
    style={{
      transform: props.show ? "translateY(0)" : "translateY(-100vh)",
      opacity: props.show ? "1" : "0"
    }}>
      {props.children}
      <span className={classes.Close} onClick={props.modalClosed} />
    </div>
  </>
);

export default modal;
