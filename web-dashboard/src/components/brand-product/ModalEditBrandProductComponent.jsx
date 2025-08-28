import { Modal, TextInput, Button } from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  useUpdateBrandProduct,
  useEditBrandProduct,
} from "../../utils/fetch/useBrandProduct";

function ModalEditBrandProductComponent({ opened, onClose, onSuccess, id }) {
  const { loading, updateData } = useUpdateBrandProduct();
  const { data: brandEdit } = useEditBrandProduct(opened, id);
  const [form, setForm] = useState({
    name_brand: "",
  });

  const handleUpdate = async (event) => {
    event.preventDefault();
    await updateData(id, form);
    onClose();
    onSuccess();
  };
  useEffect(() => {
    if (brandEdit) {
      setForm({
        name_brand: brandEdit.name_brand,
      });
    }
  }, [brandEdit]);

  return (
    <Modal opened={opened} onClose={onClose}>
      <form action="" className="" onSubmit={handleUpdate}>
        <div className="my-4">
          <TextInput
            label="Nama Brand"
            placeholder="Adidas"
            required
            size={"md"}
            data-autofocus
            onChange={(e) => setForm({ ...form, name_brand: e.target.value })}
            value={form.name_brand}
          />
        </div>

        <div className="my-4">
          <Button
            type="submit"
            color={"orange"}
            size="md"
            fullWidth
            disabled={loading}
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalEditBrandProductComponent;
