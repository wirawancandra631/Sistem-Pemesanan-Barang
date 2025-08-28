import { Modal, TextInput, Button } from "@mantine/core";
import React, { useState } from "react";
import { usePostUserApp } from "../../utils/fetch/useProfil";

function ModalAddUserComponent({ opened, onClose, onSuccess }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { loading, postData } = usePostUserApp();
  const handlePost = async (event) => {
    event.preventDefault();
    await postData(form);
    onClose();
    onSuccess();
  };
  return (
    <Modal opened={opened} onClose={onClose}>
      <form action="" className="w-full" onSubmit={handlePost}>
        <div className="my-4">
          <TextInput
            label="Email"
            type={"email"}
            required
            data-autofocus
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="my-4">
          <TextInput
            label="Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <div className="my-4">
          <Button color="orange" fullWidth type="submit" disabled={loading}>
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalAddUserComponent;
