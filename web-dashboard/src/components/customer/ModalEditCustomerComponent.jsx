import { Modal, TextInput, Button, Badge } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useUpdateCustomer } from "../../utils/fetch/useCustomer";

function ModalEditCustomerComponent({ opened, onClose, onSuccess, data }) {
  const [form, setForm] = useState({
    customer_id: "",
    member_type: "",
  });
  const { loading, updateData } = useUpdateCustomer();
  useEffect(() => {
    if (opened && data) {
      setForm({
        ...form,
        customer_id: data.id_customer,
        member_type: data.member ? data.member.member_type : "",
      });
    }
  }, [opened]);
  const handlePost = async (e) => {
    e.preventDefault();
    await updateData(form);
    onClose();
    onSuccess();
  };
  return (
    <Modal opened={opened} onClose={onClose}>
      <form action="" className="w-full" onSubmit={handlePost}>
        <div className="my-4">
          <p>
            Status Member : {form.member_type ? form.member_type : "Non Member"}{" "}
          </p>
        </div>
        <div className="my-4 flex justify-between items-center">
          <label htmlFor="member_type_mitra">
            <Badge color={"orange"}>MITRA</Badge>
          </label>
          <input
            type="radio"
            name="member_type"
            id="member_type_mitra"
            value={"MITRA"}
            checked={form.member_type == "MITRA" ? true : false}
            onChange={(e) => setForm({ ...form, member_type: "MITRA" })}
            required
          />
        </div>

        <div className="my-4 flex justify-between items-center">
          <label htmlFor="member_type_gold">
            <Badge color={"black"}>GOLD</Badge>
          </label>
          <input
            type="radio"
            name="member_type"
            id="member_type_gold"
            value={"GOLD"}
            checked={form.member_type == "GOLD" ? true : false}
            onChange={(e) => setForm({ ...form, member_type: "GOLD" })}
            required
          />
        </div>

        <div className="my-4">
          <Button type="submit" fullWidth color={"orange"}>
            Save
          </Button>
        </div>
      </form>
      {/* <form action="" className="" onSubmit={handleUpdate}>
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
        </div> */}
      {/* </form> */}
    </Modal>
  );
}

export default ModalEditCustomerComponent;
