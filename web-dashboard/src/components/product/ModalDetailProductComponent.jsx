import React, { useEffect } from "react";
import { Badge, List, Modal, Table } from "@mantine/core";
import { useShowProduct } from "../../utils/fetch/useProduct";
import LoadingDataComponent from "../reusable/LoadingDataComponent";
import EmptyDataComponent from "../reusable/EmptyDataComponent";
import { moneyFormat } from "../../utils/moneyFormat";
function ModalDetailProductComponent({ opened, onClose, id }) {
  const { data: product, loading, fetchData } = useShowProduct(opened, id);
  return (
    <Modal opened={opened} onClose={onClose} size="xl">
      {loading ? (
        <LoadingDataComponent />
      ) : product ? (
        <>
          <div className="w-full p-4">
            <p className="font-bold">Detail Produk</p>
          </div>
          <div className="my-4 border border-slate-200 p-2 w-[110px] h-[110px]">
            {product.image_product ? (
              <img
                src={product.image_product}
                className="w-[100px] h-[100px]"
              />
            ) : (
              <div class="w-[100px] h-[100px] bg-slate-200 flex items-center justify-center text-[12px]">
                <span>No Image</span>
              </div>
            )}
          </div>
          <Table withTableBorder withColumnBorders>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Nama Produk</Table.Td>
                <Table.Td>{product.name_product}</Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td>Merek Produk</Table.Td>
                <Table.Td>
                  <Badge color={"brown"}>
                    {product.brand ? product.brand.name_brand : "-"}
                  </Badge>
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td>Kategori Produk</Table.Td>
                <Table.Td>
                  <Badge color={"green"}>
                    {product.category ? product.category.name_category : "-"}
                  </Badge>
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td>Harga Pokok</Table.Td>
                <Table.Td>{moneyFormat(product.price_sell)}</Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td>Harga Grosir</Table.Td>
                <Table.Td>
                  <List>
                    {product.grosir.length > 0
                      ? product.grosir.map((price) => (
                          <List.Item key={price.id_grosir}>
                            {moneyFormat(price.price_grosir)} &gt;={" "}
                            {price.min_qty}
                          </List.Item>
                        ))
                      : "-"}
                  </List>
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td>Stok </Table.Td>
                <Table.Td>{product.stock_product}</Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td>Tampilkan Stok </Table.Td>
                <Table.Td>
                  {product.display_stock ? (
                    <Badge color={"blue"}>YES</Badge>
                  ) : (
                    <Badge color={"red"}>NO</Badge>
                  )}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Tampilkan Produk </Table.Td>
                <Table.Td>
                  {product.display_product ? (
                    <Badge color={"blue"}>YES</Badge>
                  ) : (
                    <Badge color={"red"}>NO</Badge>
                  )}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Rekomendasikan Produk </Table.Td>
                <Table.Td>
                  {product.recomendation_product ? (
                    <Badge color={"blue"}>YES</Badge>
                  ) : (
                    <Badge color={"red"}>NO</Badge>
                  )}{" "}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Deskripsi Produk </Table.Td>
                <Table.Td>{product.description_product}</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </>
      ) : (
        <EmptyDataComponent />
      )}
    </Modal>
  );
}

export default ModalDetailProductComponent;
