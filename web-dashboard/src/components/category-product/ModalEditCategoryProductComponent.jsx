import { FileInput, Modal, TextInput, Button } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { BsUpload } from "react-icons/bs";
import {
  useEditCategoryProduct,
  useUpdateCategoryProduct,
} from "../../utils/fetch/useCategoryProduct";

function ModalEditCategoryProductComponent({ opened, onClose, id, onSuccess }) {
  const { loading, updateData } = useUpdateCategoryProduct();
  const { data: categoryEdited } = useEditCategoryProduct(opened, id);
  const [form, setForm] = useState({
    name_category: "",
    icon_category: "",
    icon_category_preview: "",
  });
  const handleImageUpload = (e) => {
    setForm({
      ...form,
      icon_category: e,
      icon_category_preview: URL.createObjectURL(e),
    });
  };
  const handleUpdate = async (event) => {
    event.preventDefault();
    await updateData(form, id);
    onClose();
    onSuccess();
  };
  useEffect(() => {
    if (categoryEdited) {
      setForm({
        ...form,
        name_category: categoryEdited.name_category,
        icon_category_preview: categoryEdited.icon_category,
      });
    }
  }, [categoryEdited]);
  return (
    <Modal opened={opened} onClose={onClose}>
      <form action="" className="" onSubmit={handleUpdate}>
        <div className="my-4">
          <TextInput
            label="Nama Kategori"
            placeholder="Makanan"
            required
            data-autofocus
            onChange={(e) =>
              setForm({ ...form, name_category: e.target.value })
            }
            value={form.name_category}
          />
        </div>

        <div className="my-4">
          {form.icon_category_preview ? (
            <img
              src={form.icon_category_preview}
              className="w-[80px] h-[80px]"
            />
          ) : (
            <div className="mb-2 w-[80px] h-[80px] bg-slate-200"></div>
          )}
          <FileInput
            label="Ikon Kategori"
            placeholder="Upload"
            leftSection={<BsUpload />}
            onChange={handleImageUpload}
            accept="image/*"
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

export default ModalEditCategoryProductComponent;
