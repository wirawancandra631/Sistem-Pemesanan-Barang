import React, { useState } from "react";
import { ActionIcon, Button } from "@mantine/core";
import {
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
  Th,
} from "../../../components/reusable/TableComponent";
import { BsTrash } from "react-icons/bs";
import LoadingDataComponent from "../../../components/reusable/LoadingDataComponent";
import EmptyDataComponent from "../../../components/reusable/EmptyDataComponent";
import ModalConfirmationDialog from "../../../components/reusable/ModalConfirmationComponent";
import ModalAddUserComponent from "../../../components/users-settings/ModalAddUserComponent";
import {
  useDeleteUserApp,
  useFetchAllUserProfil,
} from "../../../utils/fetch/useProfil";
function UserSettingsPage() {
  let id = 1;
  const [idSelected, setIdSelected] = useState(null);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const { loading, data: users, fetchData } = useFetchAllUserProfil();
  const { deleteData } = useDeleteUserApp();
  const handleDelete = async () => {
    await deleteData(idSelected);
    setShowModalDelete(false);
    fetchData();
  };
  return (
    <>
      <div className="w-full p-4 bg-white">
        <p className="font-bold">User Aplikasi</p>
      </div>
      <div className="w-full p-4 bg-white mt-4">
        <div className="w-full flex justify-end">
          <Button color={"orange"} onClick={() => setShowModalAdd(true)}>
            Buat User
          </Button>
        </div>
        <div className="w-full mt-4">
          {loading ? (
            <LoadingDataComponent />
          ) : users.length > 0 ? (
            <Table>
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Email</Th>
                  <Th>Options</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr key={user.id_user}>
                    <Td>{id++}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      <ActionIcon
                        color={"red"}
                        onClick={() => {
                          setIdSelected(user.id_user);
                          setShowModalDelete(true);
                        }}
                      >
                        <BsTrash />
                      </ActionIcon>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <EmptyDataComponent />
          )}
        </div>
      </div>
      {showModalAdd ? (
        <ModalAddUserComponent
          opened={showModalAdd}
          onClose={() => setShowModalAdd(false)}
          onSuccess={() => fetchData()}
        />
      ) : (
        <></>
      )}
      {showModalDelete ? (
        <ModalConfirmationDialog
          onConfirmed={handleDelete}
          onCancel={() => setShowModalDelete(false)}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default UserSettingsPage;
