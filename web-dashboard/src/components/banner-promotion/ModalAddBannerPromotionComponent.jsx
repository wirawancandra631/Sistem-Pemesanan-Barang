import { Modal, TextInput, Button, FileInput } from "@mantine/core";
import React, { useState } from "react";
import { usePostBannerPromotion } from "../../utils/fetch/useBannerPromotion";

function ModalAddBannerPromotionComponent({ opened, onClose, onSuccess }) {
  const { loading, postData } = usePostBannerPromotion();
  const [form, setForm] = useState({
    image_banner: "",
    image_banner_preview: "",
  });
  const changeFileInput = (e) => {
    setForm({
      ...form,
      image_banner: e,
      image_banner_preview: URL.createObjectURL(e),
    });
  };

  const handlePost = async (event) => {
    event.preventDefault();
    await postData(form);
    onClose();
    onSuccess();
  };
  return (
    <Modal opened={opened} onClose={onClose}>
      <form action="" className="" onSubmit={handlePost}>
        <div className="my-4">
          <FileInput
            label="Image"
            placeholder="Upload "
            required
            data-autofocus
            onChange={changeFileInput}
            accept="image/*"
          />
        </div>
        {form.image_banner_preview ? (
          <div className="my-4">
            <img
              src={form.image_banner_preview}
              alt=""
              className="w-full h-[150px]"
            />
          </div>
        ) : null}

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

export default ModalAddBannerPromotionComponent;
