import { Button, Table, TextInput } from "@mantine/core";
import LoadingDataComponent from "@/components/reusable/LoadingDataComponent";
import EmptyDataComponent from "@/components/reusable/EmptyDataComponent";
import { BsPlusCircle, BsSearch, BsTrash } from "react-icons/bs";
import { useState } from "react";
import ModalConfirmationComponent from "@/components/reusable/ModalConfirmationComponent";
import ModalAddProductRecomendationComponent from "../../../components/product-recomendation/ModalAddProductRecomendationComponent";
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
    <div className="w-full p-4 bg-white min-h-screen">
      <p className="font-bold text-xl">Daftar Produk Direkomendasikan</p>

      <div className="w-full flex justify-end">
        <Button onClick={() => setShowModalAdd(true)}>
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
          <Button type="submit">
            <BsSearch />
          </Button>
        </form>
      </div>
      <div className="w-full mt-4 overflow-y-auto">
        {loading ? (
          <LoadingDataComponent />
        ) : products.length > 0 ? (
          <Table withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Kode</Table.Th>
                <Table.Th>Nama</Table.Th>
                <Table.Th>Gambar</Table.Th>
                <Table.Th>Opsi</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {products.map((product) => (
                <Table.Tr key={product.id_product}>
                  <Table.Td>{product.sku_product}</Table.Td>
                  <Table.Td>{product.name_product}</Table.Td>
                  <Table.Td>
                    {product.image_product ? (
                      <img
                        src={product.image_product}
                        className="w-[80px] h-[80px]"
                      />
                    ) : (
                      <div className="w-[80px] h-[80px] bg-slate-200"></div>
                    )}
                  </Table.Td>
                  <Table.Td>
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
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
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
  );
}
