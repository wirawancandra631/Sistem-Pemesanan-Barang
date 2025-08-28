import { ActionIcon, Button, Tooltip } from "@mantine/core";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@/components/reusable/TableComponent";
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
} from "@/utils/fetch/useBrandProduct";
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
    <>
      <div className="w-full p-4 bg-white">
        <p className="font-bold">Data Brand Produk</p>
      </div>
      <div className="w-full p-4 bg-white mt-4">
        <div className="w-full flex justify-end">
          <Button color={"orange"} onClick={() => setShowModalAdd(true)}>
            <span className="mr-2">Tambah Data</span>
            <BsPlusCircle />
          </Button>
        </div>
        <div className="w-full mt-4 overflow-y-auto">
          {loading ? (
            <LoadingDataComponent />
          ) : brand_products.length > 0 ? (
            <Table>
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Brand</Th>
                  <Th>Options</Th>
                </Tr>
              </Thead>
              <Tbody>
                {brand_products.map((brand) => (
                  <Tr key={brand.id_brand}>
                    <Td>{id++}</Td>
                    <Td>{brand.name_brand}</Td>

                    <Td>
                      <div className="flex justify-center space-x-2">
                        <Tooltip label="Edit data">
                          <ActionIcon
                            color={"yellow"}
                            onClick={(e) => {
                              setIdSelected(brand.id_brand);
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
                              setIdSelected(brand.id_brand);
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
    </>
  );
}
