import { Button, FileInput, Loader } from "@mantine/core";
import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { useSyncCustomer } from "../../../utils/fetch/useCustomer";

function CustomerSyncDataPage() {
  const [showTablePreview, setShowTablePreview] = useState(false);
  const [dataImportPreview, setDataImportPreview] = useState([]);
  const [loadingSendIndicatior, setLoadingSendIndicator] = useState(false);
  const [numberProgress, setNumbeProgress] = useState({
    success: 0,
    failed: 0,
  });
  const { postData } = useSyncCustomer();
  const uploadFile = async (e) => {
    if (e) {
      setShowTablePreview(true);
      const buffer = await e.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const workSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(workSheet);
      setDataImportPreview(jsonData);
    }
  };
  const handlePost = async () => {
    setLoadingSendIndicator(true);
    for (const data of dataImportPreview) {
      const dataSend = {
        NOMORHANDPHONE: data["NOMORHANDPHONE"],
        POINTAKHIR: data["POINTAKHIR"],
      };
      await postData(
        dataSend,
        () => {
          setNumbeProgress({
            ...numberProgress,
            success: numberProgress.success++,
          });
        },
        () => {
          setNumbeProgress({
            ...numberProgress,
            failed: numberProgress.failed++,
          });
        }
      );
    }
    setNumbeProgress({ success: 0, failed: 0 });
    setLoadingSendIndicator(false);
  };
  return (
    <>
      <div className="w-full p-4 bg-white">
        <p className="font-bold">Sinkronisasi Data Customer</p>
      </div>
      <div className="w-full p-4 bg-white mt-4">
        <form action="" className="w-1/2 mx-auto">
          <FileInput
            label="Upload data"
            placeholder="Upload excel file"
            onChange={uploadFile}
            accept=".xls, .xlsx"
          />
        </form>
      </div>
      {showTablePreview ? (
        <div className="w-full p-4 bg-white  mt-4  ">
          <Button type="button" className="block " onClick={handlePost}>
            <BsSend />
            <span>Sync to server</span>
          </Button>
          <table className="w-full text-center mt-4">
            <thead>
              <tr>
                <th className="p-2 border border-slate-200 bg-slate-100">
                  Nomor Handphone
                </th>

                <th className="p-2 border border-slate-200 bg-slate-100">
                  Nama Customer
                </th>
                <th className="p-2 border border-slate-200 bg-slate-100">
                  Tipe Member
                </th>

                <th className="p-2 border border-slate-200 bg-slate-100">
                  Jumlah Point
                </th>
              </tr>
            </thead>
            <tbody>
              {dataImportPreview.map((data, key) => {
                return (
                  <tr key={key}>
                    <td className="p-2 border border-slate-200 bg-white">
                      {data["NOMORHANDPHONE"]}
                    </td>

                    <td className="p-2 border border-slate-200 bg-white">
                      {data["NAMACUSTOMER"]}
                    </td>
                    <td className="p-2 border border-slate-200 bg-white">
                      {data["JENISMEMBER"]}
                    </td>

                    <td className="p-2 border border-slate-200 bg-white">
                      {data["POINTAKHIR"]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
      {loadingSendIndicatior ? (
        <div className="w-full fixed left-0 top-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Loader size={30} color="white" />
            <p className="text-white mt-4">
              Memproses data jangan refresh halaman atau tutup tab
            </p>
            <p className="text-white mt-4">
              Total Data {dataImportPreview.length}
            </p>

            <p className="text-white mt-4">
              Berhasil : {numberProgress.success}
            </p>
            <p className="text-white mt-4">Gagal : {numberProgress.failed}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CustomerSyncDataPage;
