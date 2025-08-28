import { ActionIcon, Button, Tooltip } from "@mantine/core";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "@/components/reusable/TableComponent";
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
} from "@/utils/fetch/useCategoryProduct";
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
    <>
      <div className="w-full p-4 bg-white">
        <p className="font-bold">Data Kategori Produk</p>
      </div>
      <div className="w-full p-4 bg-white mt-4">
        <div className="w-full flex justify-end">
          <Button color={"orange"} onClick={(e) => setShowModalAdd(true)}>
            <span className="mr-2">Tambah Data</span>
            <BsPlusCircle />
          </Button>
        </div>
        <div className="w-full mt-4 overflow-y-auto">
          {loading ? (
            <LoadingDataComponent />
          ) : category_products.length > 0 ? (
            <Table>
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Nama</Th>
                  <Th>Ikon</Th>
                  <Th>Opsi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {category_products.map((category) => (
                  <Tr key={category.id_category}>
                    <Td>{id++}</Td>
                    <Td>{category.name_category}</Td>
                    <Td>
                      {category.icon_category ? (
                        <img
                          src={category.icon_category}
                          className="w-[80px] h-[80px] block mx-auto"
                        />
                      ) : (
                        <div className="w-[80px] h-[80px] mx-auto flex items-center justify-center bg-slate-200">
                          <span className="text-[12px]">
                            {category.name_category[0]}
                          </span>
                        </div>
                      )}
                    </Td>
                    <Td>
                      <div className="flex space-x-2 justify-center">
                        <Tooltip label="Edit data">
                          <ActionIcon
                            color={"yellow"}
                            onClick={(e) => {
                              setIdSelected(category.id_category);
                              setShowModalEdit(true);
                            }}
                          >
                            <BsPencil />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Hapus data">
                          <ActionIcon
                            color={"red"}
                            onClick={(e) => {
                              setShowModalDelete(true);
                              setIdSelected(category.id_category);
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
    </>
  );
}
