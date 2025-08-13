import { Button, Modal } from "@mantine/core";
import React from "react";

function ModalConfirmationComponent({ onConfirmed, onCancel }) {
  return (
    <Modal opened={true} centered onClose={onCancel}>
      <div className="w-full p-4">
        <p className="font-bold text-xl text-center mb-4">
          Anda akan menghapus data ?
        </p>
        <div className="w-full flex justify-center space-x-2">
          <Button color={"red"} onClick={onCancel}>
            No
          </Button>
          <Button color={"blue"} onClick={onConfirmed}>
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalConfirmationComponent;
