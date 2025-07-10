"use client";
import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function AlertModal({ show, onClose, onSubmit, children, btn = "Okay" ,title = "Are you sure?" }) {
  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button className="custfontbtn" onClick={onSubmit}>
          {btn}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
