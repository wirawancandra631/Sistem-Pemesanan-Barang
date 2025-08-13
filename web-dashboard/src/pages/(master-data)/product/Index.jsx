import {
  ActionIcon,
  Button,
  Pagination,
  Table,
  TextInput,
} from "@mantine/core";
import {
  BsPencil,
  BsTrash,
  BsEye,
  BsSearch,
  BsPlusCircle,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import LoadingDataComponent from "@/components/reusable/LoadingDataComponent";
import EmptyDataComponent from "@/components/reusable/EmptyDataComponent";
import ModalConfirmationComponent from "@/components/reusable/ModalConfirmationComponent";
import ModalDetailProductComponent from "@/components/product/ModalDetailProductComponent";
import {
  useDeleteProduct,
  useFetchProduct,
} from "../../../utils/fetch/useProduct";
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
    <div className="w-full bg-white   p-4">
      <p className="font-bold text-xl">Data Produk</p>
      <div className="w-full flex justify-end">
        <Link to={"/master-data/product/create"}>
          <Button>
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
          <ActionIcon type="submit">
            <BsSearch />
          </ActionIcon>
        </form>
      </div>
      <div className="mt-4 overflow-y-auto">
        {loading ? (
          <LoadingDataComponent />
        ) : products.data.length > 0 ? (
          <>
            <Table withTableBorder withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Kode Produk</Table.Th>
                  <Table.Th>Nama</Table.Th>
                  <Table.Th>Gambar</Table.Th>
                  <Table.Th>Opsi</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {products.data.map((product) => (
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
                        <div class="w-[80px] h-[80px] bg-slate-200 flex items-center justify-center">
                          <span className="text-[12px]">No Image</span>
                        </div>
                      )}
                    </Table.Td>
                    <Table.Td>
                      <div className="flex space-x-2 ">
                        <ActionIcon
                          onClick={() => {
                            setIdSelected(product.id_product);
                            setShowModalDetail(true);
                          }}
                        >
                          <BsEye />
                        </ActionIcon>
                        <Link
                          to={`/master-data/product/edit/${product.id_product}`}
                        >
                          <ActionIcon color={"yellow"}>
                            <BsPencil />
                          </ActionIcon>
                        </Link>

                        <ActionIcon
                          color={"red"}
                          onClick={() => {
                            setIdSelected(product.id_product);
                            setShowModalDelete(true);
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
  );
}
