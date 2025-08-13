import { ActionIcon, Table, TextInput, Button } from "@mantine/core";
import { BsSearch, BsTrash, BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  useDeleteCustomer,
  useFetchCustomer,
} from "../../utils/fetch/useCustomer";
import EmptyDataComponent from "../../components/reusable/EmptyDataComponent";
import LoadingDataComponent from "../../components/reusable/LoadingDataComponent";
import ModalConfirmationDialog from "../../components/reusable/ModalConfirmationComponent";
import { useState } from "react";
export default function CustomerPage() {
  const {
    data: customers,
    loading,
    fetchData,
    searchData,
  } = useFetchCustomer();
  const { deleteData } = useDeleteCustomer();
  let id = 1;
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [idSelected, setIdSelected] = useState(null);
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
      <div className="w-full p-4 bg-white">
        <p className="text-xl font-bold">Data Customer</p>
        <div className="w-full mt-4">
          <form action="" className="w-full flex" onSubmit={handleSearch}>
            <div className="w-full mr-2">
              <TextInput
                placeholder="Cari customer"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <Button type="submit">
              <BsSearch />
            </Button>
          </form>
        </div>
        <div className="w-full mt-4 overflow-x-auto">
          {loading ? (
            <LoadingDataComponent />
          ) : customers.length > 0 ? (
            <Table withTableBorder withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>No</Table.Th>
                  <Table.Th>Nama Customer</Table.Th>
                  <Table.Th>Profil</Table.Th>
                  <Table.Th>Opsi</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {customers.map((customer) => (
                  <Table.Tr key={customer.id_customer}>
                    <Table.Td>{id++}</Table.Td>
                    <Table.Td>{customer.name_customer}</Table.Td>
                    <Table.Td>
                      <div className="w-[80px] h-[80px] bg-slate-200 flex items-center justify-center rounded-md ">
                        <span className=" pb-2 border-b-2 border-purple-500">
                          {customer.name_customer[0]}
                        </span>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <Link
                        to={"https://wa.me/" + customer.number_phone}
                        className="mr-2"
                        target={"_blank"}
                      >
                        <ActionIcon color={"green"}>
                          <BsWhatsapp />
                        </ActionIcon>
                      </Link>
                      <ActionIcon
                        color="red"
                        onClick={() => {
                          setIdSelected(customer.id_customer);
                          setShowModalDelete(true);
                        }}
                      >
                        <BsTrash />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          ) : (
            <EmptyDataComponent />
          )}
        </div>
      </div>
      {showModalDelete ? (
        <ModalConfirmationDialog
          onCancel={() => setShowModalDelete(false)}
          onConfirmed={handleDelete}
        />
      ) : (
        <></>
      )}
    </>
  );
}
