import { Modal, TextInput, Button } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { usePostProductDiscount } from "../../utils/fetch/useProductDiscount";
import { getDateNow } from "../../utils/helper/getDateNow";
import { moneyFormat } from "../../utils/helper/moneyFormat";

function ModalAddProductDiscountComponent({
  opened,
  onClose,
  onSuccess,
  data,
}) {
  const { loading, postData } = usePostProductDiscount();
  const [form, setForm] = useState({
    product_id: data.id_product,
    price_sell: "",
    amount_discount: "",
    price_discount: "",
    end_time: "",
  });
  const createPriceGrosir = (e) => {
    const priceDiscount =
      Number(form.price_sell) -
      (Number(e.target.value) * Number(form.price_sell)) / 100;
    setForm({
      ...form,
      price_discount: priceDiscount,
      amount_discount: e.target.value,
    });
  };
  const handlePost = async (event) => {
    event.preventDefault();
    await postData(form);
    onClose();
    onSuccess();
  };
  useEffect(() => {
    if (data) {
      setForm({
        ...form,
        price_sell: data.price_sell,
      });
    }
  }, [opened]);
  return (
    <Modal opened={opened} onClose={onClose}>
      <form action="" className="w-full" onSubmit={handlePost}>
        <div className="my-4">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="p-2">Harga Awal</td>
                <td className="p-2">{moneyFormat(form.price_sell)}</td>
              </tr>

              <tr>
                <td className="p-2">Harga Setelah Diskon</td>
                <td className="p-2">{moneyFormat(form.price_discount)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-4">
          <TextInput
            label="Besaran Diskon %"
            min={0}
            max={100}
            data-autofocus
            onChange={createPriceGrosir}
            type="number"
            required
          />
        </div>

        <div className="my-4">
          <TextInput
            type={"date"}
            label="Tanggal Berakhir"
            onChange={(e) => setForm({ ...form, end_time: e.target.value })}
            required
            min={getDateNow()}
          />
        </div>

        <div className="my-4">
          <Button
            type="submit"
            color="orange"
            disabled={loading ? true : false}
            fullWidth
          >
            Buat Diskon
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalAddProductDiscountComponent;
