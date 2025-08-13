import { Modal, TextInput, Button } from "@mantine/core";
import React, { useState } from "react";
import { usePostBrandProduct } from "../../utils/fetch/useBrandProduct";

function ModalAddBrandProductComponent({ opened, onClose, onSuccess }) {
  const { loading, postData } = usePostBrandProduct();
  const [form, setForm] = useState({
    name_brand: "",
  });

  const handlePost = async (event) => {
    event.preventDefault();
    await postData(form, onSuccess);
    onClose();
  };
  return (
    <Modal opened={opened} onClose={onClose}>
      <form action="" className="" onSubmit={handlePost}>
        <div className="my-4">
          <p className="font-bold">Tambahkan Brand Produk</p>
        </div>
        <div className="my-4">
          <TextInput
            label="Nama Brand"
            placeholder="Adidas"
            required
            size={"md"}
            data-autofocus
            onChange={(e) => setForm({ ...form, name_brand: e.target.value })}
          />
        </div>

        <div className="my-4">
          <Button type="submit" size="md" fullWidth disabled={loading}>
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalAddBrandProductComponent;
