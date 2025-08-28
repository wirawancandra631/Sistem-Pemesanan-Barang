import React from "react";
import { Badge, List, Modal } from "@mantine/core";
import { Table, Tbody, Tr, Td } from "@/components/reusable/TableComponent";
import { useShowProduct } from "@/utils/fetch/useProduct";
import LoadingDataComponent from "@/components/reusable/LoadingDataComponent";
import EmptyDataComponent from "@/components/reusable/EmptyDataComponent";
import { moneyFormat } from "@/utils/helper/moneyFormat";
function ModalDetailProductComponent({ opened, onClose, id }) {
  const { data: product, loading } = useShowProduct(opened, id);
  return (
    <Modal opened={opened} onClose={onClose} size="full">
      {loading ? (
        <LoadingDataComponent />
      ) : product ? (
        <>
          <div className="w-full p-2">
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
          <Table center={false}>
            <Tbody>
              <Tr>
                <Td>Sku Produk</Td>
                <Td className="text-right">{product.sku_product}</Td>
              </Tr>
              <Tr>
                <Td>Nama Produk</Td>
                <Td className="text-right">{product.name_product}</Td>
              </Tr>

              <Tr>
                <Td>Merek Produk</Td>
                <Td className="text-right">
                  <Badge color={"brown"}>
                    {product.brand ? product.brand.name_brand : "-"}
                  </Badge>
                </Td>
              </Tr>

              <Tr>
                <Td>Kategori Produk</Td>
                <Td className="text-right">
                  <Badge color={"green"}>
                    {product.category ? product.category.name_category : "-"}
                  </Badge>
                </Td>
              </Tr>

              <Tr>
                <Td>Harga Pokok</Td>
                <Td className="text-right">
                  {moneyFormat(product.price_sell)}
                </Td>
              </Tr>

              <Tr>
                <Td>Harga Grosir</Td>
                <Td className="text-right">
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
                </Td>
              </Tr>

              <Tr>
                <Td>Stok </Td>
                <Td className="text-right">{product.stock_product}</Td>
              </Tr>

              <Tr>
                <Td>Tampilkan Stok </Td>
                <Td className="text-right">
                  {product.display_stock ? (
                    <Badge color={"blue"}>YES</Badge>
                  ) : (
                    <Badge color={"red"}>NO</Badge>
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>Tampilkan Produk </Td>
                <Td className="text-right">
                  {product.display_product ? (
                    <Badge color={"blue"}>YES</Badge>
                  ) : (
                    <Badge color={"red"}>NO</Badge>
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>Rekomendasikan Produk </Td>
                <Td className="text-right">
                  {product.recomendation_product ? (
                    <Badge color={"blue"}>YES</Badge>
                  ) : (
                    <Badge color={"red"}>NO</Badge>
                  )}{" "}
                </Td>
              </Tr>
              <Tr>
                <Td>Deskripsi Produk </Td>
                <Td>{product.description_product}</Td>
              </Tr>
            </Tbody>
          </Table>
        </>
      ) : (
        <EmptyDataComponent />
      )}
    </Modal>
  );
}

export default ModalDetailProductComponent;
