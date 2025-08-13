import {
  Input,
  Switch,
  Textarea,
  TextInput,
  Button,
  FileInput,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { BsBank, BsChevronLeft, BsEye, BsInfo, BsUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { usePostProduct } from "../../../utils/fetch/useProduct";
import { useFetchBrandProduct } from "../../../utils/fetch/useBrandProduct";
import { useFetchCategoryProduct } from "../../../utils/fetch/useCategoryProduct";

export default function CreateProductPage() {
  const navigate = useNavigate();
  const inputFocus = useRef(null);
  const { loading, postData } = usePostProduct();
  const { data: category_products } = useFetchCategoryProduct();
  const { data: brand_products } = useFetchBrandProduct();
  const [form, setForm] = useState({
    sku_product: "",
    name_product: "",
    category_id: "",
    brand_id: "",
    price_sell: "",
    price_grosir: [
      {
        price_grosir: "",
        min_qty: "",
      },
      {
        price_grosir: "",
        min_qty: "",
      },
      {
        price_grosir: "",
        min_qty: "",
      },
    ],
    display_product: true,
    display_stock: false,
    stock_product: 0,
    image_product: "",
    image_product_preview: "",
    description_product: "",
  });
  const changePriceGrosir = (id, value) => {
    const newPrice = form.price_grosir.map((price, index) => {
      if (index == id) {
        return { ...price, price_grosir: value };
      }
      return price;
    });
    setForm({ ...form, price_grosir: newPrice });
  };

  const changeQtyGrosir = (id, value) => {
    const newPrice = form.price_grosir.map((price, index) => {
      if (index == id) {
        return { ...price, min_qty: value };
      }
      return price;
    });
    setForm({ ...form, price_grosir: newPrice });
  };

  const handleUploadImage = (e) => {
    setForm({
      ...form,
      image_product: e,
      image_product_preview: URL.createObjectURL(e),
    });
  };
  const handlePost = async (event) => {
    event.preventDefault();
    await postData(form, () => navigate("/master-data/product"));
  };
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, []);
  return (
    <div className="w-full bg-white min-h-screen p-4">
      <form action="" onSubmit={handlePost}>
        <div className="my-4">
          <p className="text-2xl font-bold flex items-center">
            <Link to="/master-data/product" className="mr-2">
              <BsChevronLeft />
            </Link>
            <span>Tambah Produk </span>
          </p>
        </div>
        <div className="w-full my-4">
          <p className="text-xl font-bold flex items-center bg-blue-500 text-white p-2">
            <BsInfo />
            <span>General Information *</span>
          </p>
          <div className="my-4">
            <TextInput
              label="Kode Produk (unique)"
              placeholder="Barcode atau kode plu"
              required
              ref={inputFocus}
              size="md"
              type={"number"}
              onChange={(e) =>
                setForm({ ...form, sku_product: e.target.value })
              }
            />
          </div>
          <div className="my-4">
            <TextInput
              label="Nama Produk"
              required
              size={"md"}
              onChange={(e) =>
                setForm({ ...form, name_product: e.target.value })
              }
            />
          </div>
          <div className=" my-4">
            <label htmlFor="category_id" className="font-bold">
              Kategori Produk
            </label>
            <select
              id="category_id"
              required
              className="w-full p-3 border-2 border-slate-200 outline-0 "
              onChange={(e) =>
                setForm({ ...form, category_id: e.target.value })
              }
            >
              <option value="">-- Pilih Kategori --</option>
              {category_products.map((category) => (
                <option key={category.id_category} value={category.id_category}>
                  {category.name_category}
                </option>
              ))}
            </select>
          </div>
          <div className="my-4">
            <label htmlFor="brand_id" className="font-bold">
              Brand Produk
            </label>
            <select
              id="brand_id"
              required
              className="w-full p-3 border-2 border-slate-200 outline-0 "
              onChange={(e) => setForm({ ...form, brand_id: e.target.value })}
            >
              <option value="">-- Pilih Merek --</option>
              {brand_products.map((brand) => (
                <option key={brand.id_brand} value={brand.id_brand}>
                  {brand.name_brand}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full my-4">
          <p className="text-xl font-bold flex p-2 items-center bg-yellow-500 text-white">
            <BsBank className="mr-2" />
            <span>Pricing</span>
          </p>
          <div className="w-full my-4">
            <TextInput
              type={"number"}
              label="Harga Pokok"
              leftSection={<span>RP</span>}
              size="md"
              required
              min="0"
              onChange={(e) => setForm({ ...form, price_sell: e.target.value })}
            />
          </div>
          <p className="font-bold mb-4">Harga Grosir</p>
          <div className="flex md:flex-nowrap flex-wrap mt-4">
            <div className="md:w-1/2 w-full mb-2 mr-2 flex items-center">
              <p className="mr-2">Min Qty &gt;=</p>
              <div className="w-[80%]">
                <Input
                  size="md"
                  type={"number"}
                  placeholder="Grosir 1"
                  onChange={(e) => changeQtyGrosir(0, e.target.value)}
                />
              </div>
            </div>

            <div className="md:w-1/2 w-full mb-2 mr-2">
              <Input
                placeholder=""
                leftSection={<span>Rp</span>}
                size="md"
                onChange={(e) => changePriceGrosir(0, e.target.value)}
              />
            </div>
          </div>
          <div className="flex md:flex-nowrap flex-wrap mt-4">
            <div className="md:w-1/2 w-full mb-2 mr-2 flex items-center">
              <p className="mr-2">Min Qty &gt;=</p>
              <div className="w-[80%]">
                <Input
                  size="md"
                  type={"number"}
                  placeholder="Grosir 2"
                  onChange={(e) => changeQtyGrosir(1, e.target.value)}
                />
              </div>
            </div>

            <div className="md:w-1/2 w-full mb-2 mr-2">
              <Input
                placeholder=""
                leftSection={<span>Rp</span>}
                size="md"
                onChange={(e) => changePriceGrosir(1, e.target.value)}
              />
            </div>
          </div>
          <div className="flex md:flex-nowrap flex-wrap mt-4">
            <div className="md:w-1/2 w-full mb-2 mr-2 flex items-center">
              <p className="mr-2">Min Qty &gt;=</p>
              <div className="w-[80%]">
                <Input
                  size="md"
                  type={"number"}
                  placeholder="Grosir 3"
                  onChange={(e) => changeQtyGrosir(2, e.target.value)}
                />
              </div>
            </div>

            <div className="md:w-1/2 w-full mb-2 mr-2">
              <Input
                placeholder=""
                leftSection={<span>Rp</span>}
                size="md"
                onChange={(e) => changePriceGrosir(2, e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-full my-4">
          <p className="text-xl font-bold flex items-center bg-purple-500 text-white p-2">
            <BsEye className="mr-2" />
            <span>Visibilitas</span>
          </p>
          <div className="my-4 w-full">
            <Switch
              label="Tampilkan Produk"
              defaultChecked={true}
              size="md"
              onChange={(e) =>
                setForm({ ...form, display_product: e.currentTarget.checked })
              }
            />
          </div>

          <div className="my-4 w-full">
            <Switch
              label="Tampilkan Stok"
              size={"md"}
              onChange={(e) =>
                setForm({ ...form, display_stock: e.currentTarget.checked })
              }
            />
          </div>
          <div className="w-full my-4">
            <p className="font-bold">Stok Produk</p>

            <TextInput
              placeholder="Stok produk"
              defaultValue={0}
              required
              min="0"
              type="number"
              onChange={(e) => {
                setForm({
                  ...form,
                  stock_product: e.target.value,
                });
              }}
            />
          </div>
          <div className="w-full my-4">
            <p className="font-bold">Gambar Produk</p>
            {form.image_product_preview ? (
              <img
                src={form.image_product_preview}
                className="w-[80px] h-[80px] mb-2"
              />
            ) : (
              <div className="w-[80px] h-[80px] bg-slate-200 mb-2"></div>
            )}
            <FileInput
              leftSection={<BsUpload />}
              placeholder="Upload gambar"
              size={"md"}
              accept="image/*"
              onChange={handleUploadImage}
            />
          </div>
          <div className="w-full my-4">
            <Textarea
              label="Deskripsi"
              size={"md"}
              required
              rows="5"
              onChange={(e) =>
                setForm({ ...form, description_product: e.target.value })
              }
            />
          </div>
        </div>
        <div className="w-full my-4">
          <Button fullWidth size="md" type="submit" disabled={loading}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
