import React, { useState } from "react";
import {
  ActionIcon,
  Badge,
  Button,
  Pagination,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { BsSearch } from "react-icons/bs";
import { FaBarcode } from "react-icons/fa";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@/components/reusable/TableComponent";
import { moneyFormat } from "@/utils/helper/moneyFormat";
import LoadingDataComponent from "@/components/reusable/LoadingDataComponent";
import { useFetchProduct } from "@/utils/fetch/useProduct";
import ModalConfirmationComponent from "@/components/reusable/ModalConfirmationComponent";
import ModalAddProductDiscountComponent from "@/components/product-discount/ModalAddProductDiscountComponent";
import EmptyDataComponent from "@/components/reusable/EmptyDataComponent";
import { useDeleteProductDiscount } from "@/utils/fetch/useProductDiscount";
function ProductDiscountPage() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [productSelected, setProductSelected] = useState(null);
  const [idSelected, setIdSelected] = useState(null);
  const { data: products, loading, fetchData, searchData } = useFetchProduct();
  const { deleteData } = useDeleteProductDiscount();

  const fetchPagination = (page) => {
    setPage(page);
    fetchData(`${BASEURLPRODUCT}?page=${page}`);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    if (keyword) {
      searchData(keyword);
    } else {
      fetchData();
    }
  };
  const handleDelete = async () => {
    await deleteData(idSelected);
    setShowModalDelete(false);
    setIdSelected(null);
    fetchData();
  };
  return (
    <>
      <div className="w-full bg-white p-4 mb-4 ">
        <p className="font-bold">Diskon Produk</p>
      </div>
      <div className="w-full bg-white p-4">
        <div className="mt-4">
          <form className="flex" onSubmit={handleSearch}>
            <div className="mr-2 w-full">
              <TextInput
                placeholder="Cari produk"
                width={"90%"}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <Tooltip label="Cari data">
              <ActionIcon type="submit">
                <BsSearch />
              </ActionIcon>
            </Tooltip>
          </form>
        </div>
        <div className="mt-4 overflow-y-auto">
          {loading ? (
            <LoadingDataComponent />
          ) : products.data.length > 0 ? (
            <>
              <Table withTableBorder withColumnBorders>
                <Thead>
                  <Tr>
                    <Th>Kode Produk</Th>
                    <Th>Nama</Th>
                    <Th>Gambar</Th>
                    <Th>Keterangan</Th>
                    <Th>Opsi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.data.map((product) => (
                    <Tr key={product.id_product}>
                      <Td>
                        <span className="flex justify-center items-center space-x-4">
                          <FaBarcode />
                          <span>{product.sku_product}</span>
                        </span>
                      </Td>
                      <Td>{product.name_product}</Td>
                      <Td>
                        {product.image_product ? (
                          <img
                            src={product.image_product}
                            className="w-[80px] h-[80px] block mx-auto"
                          />
                        ) : (
                          <div class="w-[80px] h-[80px] mx-auto bg-slate-200 flex items-center justify-center">
                            <span className="text-[12px]">No Image</span>
                          </div>
                        )}
                      </Td>
                      <Td>
                        {product.discount ? (
                          <>
                            <p className="text-left text-sm">
                              Harga Awal{" "}
                              <span className="font-bold">
                                {moneyFormat(product.price_sell)}
                              </span>
                            </p>
                            <p className="text-left text-sm">
                              Diskon {product.discount.amount_discount}%
                            </p>
                            <p className="text-left text-sm">
                              Harga Akhir =
                              <span className="font-bold">
                                {moneyFormat(product.discount.price_discount)}
                              </span>
                            </p>
                            <p className="text-left text-sm">
                              Berakhir pada {product.discount.end_time}
                            </p>
                          </>
                        ) : (
                          <Badge color={"red"}>Tidak diskon</Badge>
                        )}
                      </Td>
                      <Td>
                        <div className="flex space-x-2 ">
                          <Button
                            color={"red"}
                            disabled={product.discount ? false : true}
                            onClick={() => {
                              setIdSelected(product.discount.product_id);
                              setShowModalDelete(true);
                            }}
                          >
                            Hapus Diskon
                          </Button>
                          <Button
                            color={"orange"}
                            onClick={() => {
                              setProductSelected(product);
                              setShowModalCreate(true);
                            }}
                            disabled={product.discount ? true : false}
                          >
                            Buat Diskon
                          </Button>
                        </div>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              {products.meta ? (
                <div className="m-2">
                  <Pagination
                    total={
                      products.meta.count
                        ? Math.ceil(products.meta.count / products.meta.perPage)
                        : 0
                    }
                    value={page}
                    onChange={(e) => fetchPagination(e)}
                  />
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <EmptyDataComponent />
          )}
        </div>
      </div>
      {showModalDelete ? (
        <ModalConfirmationComponent
          onCancel={() => setShowModalDelete(false)}
          onConfirmed={handleDelete}
        />
      ) : (
        <></>
      )}
      {showModalCreate ? (
        <ModalAddProductDiscountComponent
          opened={showModalCreate}
          data={productSelected}
          onClose={() => setShowModalCreate(false)}
          onSuccess={() => fetchData()}
        />
      ) : null}
    </>
  );
}

export default ProductDiscountPage;
