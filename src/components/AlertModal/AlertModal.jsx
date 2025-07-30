"use client";
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslations } from "next-intl";


export default function AlertModal({ show, onClose, onSubmit, children, btn ,title }) {

  const t = useTranslations("tables");
  const buttonText = btn || t("okay");
  const modalTitle = title || t("are_you_sure");

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Header>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        <Button className="custfontbtn bg-white textcolor" onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button className="custfontbtn" onClick={onSubmit}>
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
