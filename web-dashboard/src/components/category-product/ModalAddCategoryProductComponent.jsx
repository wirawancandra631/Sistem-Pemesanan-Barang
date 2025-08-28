import { FileInput, Modal, TextInput, Button } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { usePostCategoryProduct } from "../../utils/fetch/useCategoryProduct";

function ModalAddCategoryProductComponent({ opened, onClose, onSuccess }) {
  const { loading, postData } = usePostCategoryProduct();
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
  const handlePost = async (event) => {
    event.preventDefault();
    await postData(form);
    setForm({
      name_category: "",
      icon_category: "",
      icon_category_preview: "",
    });
    onClose();
    onSuccess();
  };
  return (
    <Modal opened={opened} onClose={onClose}>
      <form action="" className="" onSubmit={handlePost}>
        <div className="my-4">
          <TextInput
            label="Nama Kategori"
            placeholder="Makanan"
            required
            data-autofocus
            onChange={(e) =>
              setForm({ ...form, name_category: e.target.value })
            }
          />
        </div>

        <div className="my-4">
          {form.icon_category_preview ? (
            <img
              src={form.icon_category_preview}
              className="w-[80px] h-[80px] mb-2"
            />
          ) : (
            <div className="mb-2 w-[80px] h-[80px] bg-slate-200 rounded-md"></div>
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
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalAddCategoryProductComponent;
