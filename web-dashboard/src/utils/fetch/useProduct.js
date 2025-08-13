import { useEffect, useState } from "react";
import { FeedBackErrorComponent, FeedBackSuccessComponent } from "../../components/reusable/FeedBackComponent";
import { axiosAuth, BASEURLPRODUCT } from "./baseUrl";
export function useFetchProduct() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchData = async (url = BASEURLPRODUCT) => {
        try {
            const res = await axiosAuth.get(url);
            const { data } = await res;
            setData(data)
        }
        catch (m) {
            setError(m.messsage);
            FeedBackErrorComponent(m.message)
        }
        finally {
            setLoading(false)
        }
    }
    const searchData = async (keyword) => {
        try {
            const res = await axiosAuth.get(`${BASEURLPRODUCT}/search?keyword=${keyword}`);
            const { data } = await res;
            setData(data)
        }
        catch (m) {
            setError(m.messsage);
            FeedBackErrorComponent(m.message)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData(BASEURLPRODUCT)
    }, [])
    return {
        data,
        loading,
        error,
        fetchData,
        searchData
    }
}
export function useSearchProduct() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const searchProduct = async (keyword) => {
        try {
            const res = await axiosAuth.get(`${BASEURLPRODUCT}/search?keyword=${keyword}`);
            const { data } = await res;
            setData(data.data)
        }
        catch (m) {
            setError(m.messsage);
            FeedBackErrorComponent(m.message)
        }
        finally {
            setLoading(false)
        }
    }

    return {
        data,
        setData,
        loading,
        error,
        searchProduct
    }
}

export function useShowProduct(opened, id) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const fetchData = async () => {
        try {
            const res = await axiosAuth.get(`${BASEURLPRODUCT}/${id}`);
            const { data } = await res;
            setData(data.data)
        }
        catch (m) {
            setError(m.messsage);
            FeedBackErrorComponent(m.message)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (opened && id) {
            fetchData()
        }
    }, [opened, id])
    return {
        data, loading, error, fetchData
    }
}
export function usePostProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const postData = async (data, onSuccess) => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("sku_product", data.sku_product);
            formData.append("name_product", data.name_product);
            formData.append("category_id", data.category_id);
            formData.append("brand_id", data.brand_id);
            formData.append("price_sell", data.price_sell);
            formData.append("display_product", data.display_product);
            formData.append("display_stock", data.display_stock);
            formData.append("stock_product", data.stock_product)
            formData.append("image_product", data.image_product);
            formData.append("description_product", data.description_product);
            formData.append("price_grosir", JSON.stringify(data.price_grosir));
            await axiosAuth.post(BASEURLPRODUCT, formData);
            FeedBackSuccessComponent("Data ditambahkan");
            onSuccess()

        }
        catch (m) {
            setError(m.message)
            FeedBackErrorComponent(m.message)
        }
        finally {
            setLoading(false)
        }
    }
    return {
        loading,
        postData
    }

}
export function useEditProduct(id) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await axiosAuth.get(`${BASEURLPRODUCT}/edit/${id}`);
            const { data } = await res;
            setData(data.data)
        }
        catch (m) {
            setError(m.message);
            FeedBackErrorComponent(m.message)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchProduct()
    }, [])
    return {
        loading,
        error,
        data,
        fetchProduct
    }
}

export function useUpdateProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const updateData = async (data, id, onSuccess) => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("sku_product", data.sku_product);
            formData.append("name_product", data.name_product);
            formData.append("category_id", data.category_id);
            formData.append("brand_id", data.brand_id);
            formData.append("price_sell", data.price_sell);
            formData.append("display_product", data.display_product);
            formData.append("display_stock", data.display_stock);
            formData.append("stock_product", data.stock_product)
            formData.append("image_product", data.image_product);
            formData.append("description_product", data.description_product);
            formData.append("price_grosir", JSON.stringify(data.price_grosir));
            await axiosAuth.put(`${BASEURLPRODUCT}/${id}`, formData);
            FeedBackSuccessComponent("Data diperbarui");
            onSuccess()

        }
        catch (m) {
            setError(m.message)
            FeedBackErrorComponent(m.message)
        }
        finally {
            setLoading(false)
        }
    }
    return {
        loading,
        error,
        updateData
    }

}
export function useDeleteProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const deleteData = async (id) => {
        try {
            setLoading(true)
            await axiosAuth.delete(`${BASEURLPRODUCT}/${id}`)
            FeedBackSuccessComponent("Data dihapus");
        }
        catch (m) {
            setError(m.message)
            FeedBackErrorComponent(m.message)
        }
        finally {
            setLoading(false)
        }
    }
    return {
        loading,
        error,
        deleteData
    }
}