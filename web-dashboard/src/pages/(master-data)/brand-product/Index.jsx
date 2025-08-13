import { ActionIcon, Button, Table } from "@mantine/core";
import { BsPencil, BsPlusCircle, BsTrash } from "react-icons/bs";
import { useState } from "react";
import ModalConfirmationComponent from "@/components/reusable/ModalConfirmationComponent";
import LoadingDataComponent from "@/components/reusable/LoadingDataComponent";
import EmptyDataComponent from "@/components/reusable/EmptyDataComponent";
import ModalAddBrandProductComponent from "@/components/brand-product/ModalAddBrandProductComponent";
import ModalEditBrandProductComponent from "@/components/brand-product/ModalEditBrandProductComponent";
import {
  useFetchBrandProduct,
  useDeleteBrandProduct,
} from "../../../utils/fetch/useBrandProduct";
export default function BrandProductPage() {
  let id = 1;
  const [idSelected, setIdSelected] = useState(null);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const { data: brand_products, loading, fetchData } = useFetchBrandProduct();
  const { deleteData } = useDeleteBrandProduct();

  const handleDelete = async () => {
    await deleteData(idSelected);
    fetchData();
    setIdSelected(null);
    setShowModalDelete(false);
  };
  return (
    <div className="w-full p-4 bg-white">
      <p className="font-bold text-xl">Data Brand Produk</p>
      <div className="w-full flex justify-end">
        <Button onClick={() => setShowModalAdd(true)}>
          <span className="mr-2">Tambah Data</span>
          <BsPlusCircle />
        </Button>
      </div>
      <div className="w-full mt-4 overflow-y-auto">
        {loading ? (
          <LoadingDataComponent />
        ) : brand_products.length > 0 ? (
          <Table withTableBorder withColumnBorders withRowBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>No</Table.Th>
                <Table.Th>Nama </Table.Th>
                <Table.Th>Opsi</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {brand_products.map((brand) => (
                <Table.Tr key={brand.id_brand}>
                  <Table.Td>{id++}</Table.Td>
                  <Table.Td>{brand.name_brand}</Table.Td>

                  <Table.Td>
                    <div className="flex space-x-2">
                      <ActionIcon
                        color={"yellow"}
                        onClick={(e) => {
                          setIdSelected(brand.id_brand);
                          setShowModalEdit(true);
                        }}
                      >
                        <BsPencil />
                      </ActionIcon>

                      <ActionIcon
                        color={"red"}
                        onClick={(e) => {
                          setShowModalDelete(true);
                          setIdSelected(brand.id_brand);
                        }}
                      >
                        <BsTrash />
                      </ActionIcon>
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        ) : (
          <EmptyDataComponent />
        )}
      </div>
      <ModalAddBrandProductComponent
        opened={showModalAdd}
        onClose={() => setShowModalAdd(false)}
        onSuccess={() => fetchData()}
      />
      <ModalEditBrandProductComponent
        opened={showModalEdit}
        onClose={() => setShowModalEdit(false)}
        id={idSelected}
        onSuccess={() => {
          fetchData();
          setIdSelected(null);
        }}
      />
      {showModalDelete ? (
        <ModalConfirmationComponent
          onCancel={() => setShowModalDelete(false)}
          onConfirmed={() => handleDelete()}
        />
      ) : null}
    </div>
  );
}
