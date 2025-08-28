import React, { useState } from "react";
import { ActionIcon, Alert, Button, List } from "@mantine/core";
import { BsTrash, BsUpload } from "react-icons/bs";
import LoadingDataComponent from "../../../components/reusable/LoadingDataComponent";
import EmptyDataComponent from "../../../components/reusable/EmptyDataComponent";
import ModalConfirmationComponent from "../../../components/reusable/ModalConfirmationComponent";
import {
  useDeleteBannerPromotion,
  useFetchBannerPromotion,
} from "../../../utils/fetch/useBannerPromotion";
import ModalAddBannerPromotionComponent from "../../../components/banner-promotion/ModalAddBannerPromotionComponent";
function StoreDecorationPage() {
  const [idSelected, setIdSelected] = useState(null);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const { loading, data: banner, fetchData } = useFetchBannerPromotion();
  const { deleteData } = useDeleteBannerPromotion();
  const handleDelete = async () => {
    await deleteData(idSelected);
    setShowModalDelete(false);
    fetchData();
  };
  return (
    <>
      <div className="w-full p-4 bg-white">
        <div className="w-full flex justify-end">
          <Button color={"orange"} onClick={() => setShowModalAdd(true)}>
            <BsUpload />
            <span>Upload</span>
          </Button>
        </div>
        <div className="w-1/2 mt-4 border border-slate-300">
          <Alert title="Petunjuk"></Alert>
          <div className="p-4">
            <List>
              <List.Item>Rekomendasi gambar berukuran 350px X 150px</List.Item>
              <List.Item>Gambar wajib bertipe jpg,jpeg</List.Item>
            </List>
          </div>
        </div>
        <div className="w-full mt-4 overflow-x-auto whitespace-nowrap">
          {loading ? (
            <LoadingDataComponent />
          ) : banner.length > 0 ? (
            banner.map((b) => (
              <div
                key={b.id_banner}
                className="w-[300px] rounded-md mr-2 inline-block overflow-hidden border border-slate-300"
              >
                <div className="w-full h-[150px] bg-slate-200 ">
                  <img src={b.image_banner} className="w-full h-full" />
                </div>
                <div className="p-2">
                  <ActionIcon
                    color={"red"}
                    onClick={() => {
                      setIdSelected(b.id_banner);
                      setShowModalDelete(true);
                    }}
                  >
                    <BsTrash />
                  </ActionIcon>
                </div>
              </div>
            ))
          ) : (
            <EmptyDataComponent />
          )}
        </div>
      </div>
      {showModalAdd ? (
        <ModalAddBannerPromotionComponent
          opened={showModalAdd}
          onClose={() => setShowModalAdd(false)}
          onSuccess={() => fetchData()}
        />
      ) : (
        <></>
      )}
      {showModalDelete ? (
        <ModalConfirmationComponent
          onConfirmed={handleDelete}
          onCancel={() => setShowModalDelete(false)}
        />
      ) : null}
    </>
  );
}

export default StoreDecorationPage;
