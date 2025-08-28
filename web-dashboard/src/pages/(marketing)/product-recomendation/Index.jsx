import { Button, TextInput, Tooltip } from "@mantine/core";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
} from "@/components/reusable/TableComponent";
import LoadingDataComponent from "@/components/reusable/LoadingDataComponent";
import EmptyDataComponent from "@/components/reusable/EmptyDataComponent";
import { BsPlusCircle, BsSearch, BsTrash } from "react-icons/bs";
import { FaBarcode } from "react-icons/fa";

import { useState } from "react";
import ModalConfirmationComponent from "@/components/reusable/ModalConfirmationComponent";
import ModalAddProductRecomendationComponent from "@/components/product-recomendation/ModalAddProductRecomendationComponent";
import {
  useFetchProductRecomendation,
  useDeleteProductRecomendation,
} from "@/utils/fetch/useProductRecomendation";

export default function ProductRecomendationPage() {
  const { deleteData } = useDeleteProductRecomendation();
  const {
    data: products,
    loading,
    fetchData,
    searchData,
  } = useFetchProductRecomendation();
  const [keyword, setKeyword] = useState("");
  const [idSelected, setIdSelected] = useState(null);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleSearch = (event) => {
    event.preventDefault();
    if (keyword) {
      searchData(keyword);
    } else {
      fetchData();
    }
  };

  const handleDelete = () => {
    deleteData(idSelected);
    setShowModalDelete(false);
    fetchData();
  };
  return (
    <>
      <div className="w-full p-4 bg-white">
        <p className="font-bold">Daftar Produk Direkomendasikan</p>
      </div>
      <div className="w-full p-4 bg-white mt-4">
        <div className="w-full flex justify-end">
          <Button color={"orange"} onClick={() => setShowModalAdd(true)}>
            <span className="mr-2">Buat rekomendasi</span>
            <BsPlusCircle />
          </Button>
        </div>
        <div className="w-full mt-4">
          <form
            action=""
            className="w-full flex space-x-2"
            onSubmit={handleSearch}
          >
            <div className="w-full">
              <TextInput
                placeholder="Cari produk"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <Tooltip label="Cari data">
              <Button type="submit">
                <BsSearch />
              </Button>
            </Tooltip>
          </form>
        </div>
        <div className="w-full mt-4 overflow-y-auto">
          {loading ? (
            <LoadingDataComponent />
          ) : products.length > 0 ? (
            <>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Kode</Th>
                    <Th>Nama</Th>
                    <Th>Gambar</Th>
                    <Th>Opsi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map((product) => (
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
                          <div className="w-[80px] h-[80px] bg-slate-200 mx-auto"></div>
                        )}
                      </Td>
                      <Td>
                        <Button
                          color={"red"}
                          onClick={() => {
                            setShowModalDelete(true);
                            setIdSelected(product.id_product);
                          }}
                        >
                          <span className="mr-2">
                            Hapus dari daftar rekomendasi
                          </span>
                          <BsTrash />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </>
          ) : (
            <EmptyDataComponent />
          )}
        </div>
        <ModalAddProductRecomendationComponent
          opened={showModalAdd}
          onClose={() => setShowModalAdd(false)}
          onSuccess={() => fetchData()}
        />
        {showModalDelete ? (
          <ModalConfirmationComponent
            opened={showModalDelete}
            onCancel={() => setShowModalDelete(false)}
            onConfirmed={() => handleDelete()}
          />
        ) : null}
      </div>
    </>
  );
}
