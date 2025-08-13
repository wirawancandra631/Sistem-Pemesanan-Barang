import { ActionIcon, Button, Table } from "@mantine/core";
import { BsPencil, BsPlusCircle, BsTrash } from "react-icons/bs";
import ModalAddCategoryProductComponent from "@/components/category-product/ModalAddCategoryProductComponent";
import ModalEditCategoryProductComponent from "@/components/category-product/ModalEditCategoryProductComponent";
import { useState } from "react";
import ModalConfirmationComponent from "@/components/reusable/ModalConfirmationComponent";

import LoadingDataComponent from "@/components/reusable/LoadingDataComponent";
import EmptyDataComponent from "@/components/reusable/EmptyDataComponent";
import {
  useDeleteCategoryProduct,
  useFetchCategoryProduct,
} from "../../../utils/fetch/useCategoryProduct";
export default function CategoryProductPage() {
  let id = 1;
  const [idSelected, setIdSelected] = useState(null);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const {
    data: category_products,
    loading,
    fetchData,
  } = useFetchCategoryProduct();
  const { deleteData } = useDeleteCategoryProduct();
  const handleDelete = async () => {
    await deleteData(idSelected);
    setShowModalDelete(false);
    fetchData();
    setIdSelected(null);
  };
  return (
    <div className="w-full p-4 bg-white">
      <p className="font-bold text-xl">Data Kategori Produk</p>
      <div className="w-full flex justify-end">
        <Button onClick={(e) => setShowModalAdd(true)}>
          <span className="mr-2">Tambah Data</span>
          <BsPlusCircle />
        </Button>
      </div>
      <div className="w-full mt-4 overflow-y-auto">
        {loading ? (
          <LoadingDataComponent />
        ) : category_products.length > 0 ? (
          <Table withTableBorder={true} withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>No</Table.Th>
                <Table.Th>Nama</Table.Th>
                <Table.Th>Ikon</Table.Th>
                <Table.Th>Opsi</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {category_products.map((category) => (
                <Table.Tr key={category.id_category}>
                  <Table.Td>{id++}</Table.Td>
                  <Table.Td>{category.name_category}</Table.Td>
                  <Table.Td>
                    {category.icon_category ? (
                      <img
                        src={category.icon_category}
                        className="w-[80px] h-[80px]"
                      />
                    ) : (
                      <div className="w-[80px] h-[80px] flex items-center justify-center bg-slate-200">
                        <span className="text-[12px]">No Image</span>
                      </div>
                    )}
                  </Table.Td>
                  <Table.Td>
                    <div className="flex space-x-2">
                      <ActionIcon
                        color={"yellow"}
                        onClick={(e) => {
                          setIdSelected(category.id_category);
                          setShowModalEdit(true);
                        }}
                      >
                        <BsPencil />
                      </ActionIcon>

                      <ActionIcon
                        color={"red"}
                        onClick={(e) => {
                          setShowModalDelete(true);
                          setIdSelected(category.id_category);
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
      <ModalAddCategoryProductComponent
        opened={showModalAdd}
        onClose={() => setShowModalAdd(false)}
        onSuccess={() => {
          setShowModalAdd(false);
          fetchData();
        }}
      />
      <ModalEditCategoryProductComponent
        opened={showModalEdit}
        id={idSelected}
        onClose={() => setShowModalEdit(false)}
        onSuccess={() => {
          setIdSelected(null);
          fetchData();
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
