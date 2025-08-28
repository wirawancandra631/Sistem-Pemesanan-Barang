import React, { useState } from "react";
import { Modal, TextInput, Button } from "@mantine/core";
import { BsSearch, BsStar } from "react-icons/bs";
import { moneyFormat } from "../../utils/helper/moneyFormat";
import { useSearchProduct } from "../../utils/fetch/useProduct";
import { usePostProductRecomendation } from "../../utils/fetch/useProductRecomendation";
function ModalAddProductRecomendationComponent({ opened, onClose, onSuccess }) {
  const { data: products, setData, searchProduct } = useSearchProduct();
  const { loading, postData } = usePostProductRecomendation();
  const [keyword, setKeyword] = useState("");
  const handleSearch = (event) => {
    event.preventDefault();
    searchProduct(keyword);
  };
  const handlePost = async (id) => {
    await postData(id);
    onClose();
    onSuccess();
    setData([]);
  };

  return (
    <Modal opened={opened} size="100%" onClose={onClose}>
      <form action="" className="w-full flex" onSubmit={handleSearch}>
        <div className="w-full mr-2">
          <TextInput
            placeholder="Cari produk "
            data-autofocus
            required
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <Button type="submit">
          <BsSearch />
        </Button>
      </form>
      <div className="w-full mt-4 min-h-screen">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id_product}
              className="w-full mb-2 border-2 border-slate-200 min-h-[80px] flex"
            >
              <div className="w-[20%] p-2">
                {product.image_product ? (
                  <img
                    src={product.image_product}
                    className="w-[80px] h-[80px]"
                  />
                ) : (
                  <div className="w-[80px] h-[80px] bg-slate-200"></div>
                )}
              </div>
              <div className="w-[80%] p-2">
                <p className="font-bold">
                  {product.name_product}/{product.sku_product}
                </p>
                <p className="my-2"> {moneyFormat(product.price_sell)}</p>
                <div className="ml-auto text-right">
                  {product.recomendation_product ? (
                    <Button color={"red"} disabled>
                      <span className="mr-2">Rekomendasikan produk</span>
                      <BsStar />
                    </Button>
                  ) : (
                    <Button
                      color={"green"}
                      onClick={() => handlePost(product.id_product)}
                      disabled={loading}
                    >
                      <span className="mr-2">Rekomendasikan produk</span>
                      <BsStar />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-[200px] justify-center  items-center">
            <p className="flex space-x-2 items-center">
              <BsSearch />
              <span>Cari produk</span>
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default ModalAddProductRecomendationComponent;
