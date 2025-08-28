import {
  ActionIcon,
  TextInput,
  Button,
  Badge,
  Tooltip,
  Pagination,
} from "@mantine/core";
import { BsPencil, BsSearch, BsTrash, BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDeleteCustomer, useFetchCustomer } from "@/utils/fetch/useCustomer";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
} from "@/components/reusable/TableComponent";
import EmptyDataComponent from "@/components/reusable/EmptyDataComponent";
import LoadingDataComponent from "@/components/reusable/LoadingDataComponent";
import ModalConfirmationDialog from "@/components/reusable/ModalConfirmationComponent";
import { useState } from "react";
import ModalEditCustomerComponent from "@/components/customer/ModalEditCustomerComponent";
import { BASEURLCUSTOMER } from "@/utils/fetch/baseUrl";
import { useExportCustomer } from "../../../utils/fetch/useCustomer";
export default function CustomerPage() {
  const {
    data: customers,
    loading,
    fetchData,
    searchData,
  } = useFetchCustomer();
  const { data: customersExport, fetchExportData } = useExportCustomer();
  const { deleteData } = useDeleteCustomer();
  const [page, setPage] = useState(1);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [idSelected, setIdSelected] = useState(null);
  const [customerSelected, setCustomerSelected] = useState(null);
  const fetchPagination = (page) => {
    setPage(page);
    fetchData(`${BASEURLCUSTOMER}?page=${page}`);
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
  const handleExportData = async () => {
    await fetchExportData();
    if (customersExport.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(customersExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "Customer-Member.xlsx", { compression: true });
    }
  };
  return (
    <>
      <div className="w-full p-4 bg-white">
        <p className=" font-bold">Data Customer</p>
      </div>
      <div className="w-full p-4 bg-white mt-4">
        <div className="w-full mt-4">
          <Button color={"green"} onClick={handleExportData}>
            Export Spreadsheet
          </Button>
          <form action="" className="w-full flex mt-4" onSubmit={handleSearch}>
            <div className="w-full mr-2">
              <TextInput
                placeholder="Cari customer by nama atau nomor h"
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
          ) : customers.data.length > 0 ? (
            <>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Nama Customer</Th>
                    <Th>Nomor Hp</Th>
                    <Th>Member</Th>
                    <Th>Point</Th>
                    <Th>Profil</Th>
                    <Th>Opsi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {customers.data.map((customer) => (
                    <Tr key={customer.id_customer}>
                      <Td>{customer.name_customer}</Td>
                      <Td>{customer.number_phone}</Td>
                      <Td>
                        {customer.member ? (
                          customer.member.member_type == "MITRA" ? (
                            <Badge color={"orange"}>MITRA</Badge>
                          ) : (
                            <Badge color={"black"}>GOLD</Badge>
                          )
                        ) : (
                          <Badge color={"red"}>Non Member</Badge>
                        )}
                      </Td>
                      <Td>
                        {customer.member ? customer.member.member_point : "-"}
                      </Td>
                      <Td>
                        <div className="w-[80px] h-[80px] mx-auto bg-slate-200 flex items-center justify-center rounded-md ">
                          <span className=" pb-2 border-b-2 border-purple-500">
                            {customer.name_customer[0]}
                          </span>
                        </div>
                      </Td>
                      <Td>
                        <Tooltip label="Chat">
                          <Link
                            to={
                              "https://wa.me/" +
                              customer.number_phone.replace(/^0/, "62")
                            }
                            target={"_blank"}
                          >
                            <ActionIcon color={"green"}>
                              <BsWhatsapp />
                            </ActionIcon>
                          </Link>
                        </Tooltip>
                        <Tooltip label="Edit data">
                          <ActionIcon
                            color="yellow"
                            className="mx-2"
                            onClick={() => {
                              setCustomerSelected(customer);
                              setShowModalEdit(true);
                            }}
                          >
                            <BsPencil />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Hapus data">
                          <ActionIcon
                            color="red"
                            onClick={() => {
                              setIdSelected(customer.id_customer);
                              setShowModalDelete(true);
                            }}
                          >
                            <BsTrash />
                          </ActionIcon>
                        </Tooltip>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              {customers.meta ? (
                <div className="m-2">
                  <Pagination
                    total={
                      customers.meta.count
                        ? Math.ceil(
                            customers.meta.count / customers.meta.perPage
                          )
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
        <ModalConfirmationDialog
          onCancel={() => setShowModalDelete(false)}
          onConfirmed={handleDelete}
        />
      ) : (
        <></>
      )}
      {showModalEdit ? (
        <ModalEditCustomerComponent
          opened={showModalEdit}
          onClose={() => setShowModalEdit(false)}
          onSuccess={() => fetchData()}
          data={customerSelected}
        />
      ) : (
        <></>
      )}
    </>
  );
}
