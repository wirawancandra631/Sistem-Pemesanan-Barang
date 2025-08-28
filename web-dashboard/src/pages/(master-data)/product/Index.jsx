import {
  ActionIcon,
  Button,
  Pagination,
  TextInput,
  Tooltip,
} from "@mantine/core";
import {
  BsPencil,
  BsTrash,
  BsEye,
  BsSearch,
  BsPlusCircle,
} from "react-icons/bs";
import { FaBarcode } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useState } from "react";
import LoadingDataComponent from "@/components/reusable/LoadingDataComponent";
import {
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
} from "@/components/reusable/TableComponent";
import EmptyDataComponent from "@/components/reusable/EmptyDataComponent";
import ModalConfirmationComponent from "@/components/reusable/ModalConfirmationComponent";
import ModalDetailProductComponent from "@/components/product/ModalDetailProductComponent";
import { useDeleteProduct, useFetchProduct } from "@/utils/fetch/useProduct";
import { moneyFormat } from "../../../utils/helper/moneyFormat";
export default function ProductPage() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [idSelected, setIdSelected] = useState(null);
  const { deleteData } = useDeleteProduct();
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const { data: products, loading, fetchData, searchData } = useFetchProduct();

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
    fetchData();
  };
  return (
    <>
      <div className="w-full bg-white p-4 mb-4 ">
        <p className="font-bold">Data Produk</p>
      </div>
      <div className="w-full bg-white p-4">
        <div className="w-full flex justify-end">
          <Link to={"/master-data/product/create"}>
            <Button color="orange">
              <span className="mr-2">Input Produk</span>
              <BsPlusCircle />
            </Button>
          </Link>
        </div>
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
                    <Th>Sku Produk</Th>
                    <Th>Nama</Th>
                    <Th>Harga</Th>
                    <Th>Gambar</Th>
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
                      <Td>{moneyFormat(product.price_sell)}</Td>
                      <Td>
                        {product.image_product ? (
                          <img
                            src={product.image_product}
                            className="w-[80px] h-[80px] block mx-auto"
                          />
                        ) : (
                          <div class="mx-auto w-[80px] h-[80px] bg-slate-200 flex items-center justify-center">
                            <span className="text-[12px]">No Image</span>
                          </div>
                        )}
                      </Td>
                      <Td>
                        <div className="flex space-x-2 justify-center ">
                          <Tooltip label="Detail data">
                            <ActionIcon
                              onClick={() => {
                                setIdSelected(product.id_product);
                                setShowModalDetail(true);
                              }}
                            >
                              <BsEye />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Edit data">
                            <Link
                              to={`/master-data/product/edit/${product.id_product}`}
                            >
                              <ActionIcon color={"yellow"}>
                                <BsPencil />
                              </ActionIcon>
                            </Link>
                          </Tooltip>
                          <Tooltip label="Hapus data">
                            <ActionIcon
                              color={"red"}
                              onClick={() => {
                                setIdSelected(product.id_product);
                                setShowModalDelete(true);
                              }}
                            >
                              <BsTrash />
                            </ActionIcon>
                          </Tooltip>
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
        <ModalDetailProductComponent
          opened={showModalDetail}
          onClose={() => setShowModalDetail(false)}
          id={idSelected}
        />
        {showModalDelete ? (
          <ModalConfirmationComponent
            onConfirmed={handleDelete}
            onCancel={() => setShowModalDelete(false)}
          />
        ) : null}
      </div>
    </>
  );
}
