import { useEffect, useState } from "react";
import { axiosAuth, BASEURLCATEGORYPRODUCT } from "./baseUrl";
import {
    FeedBackErrorComponent,
    FeedBackSuccessComponent,
} from "../../components/reusable/FeedBackComponent";
export function useFetchCategoryProduct() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axiosAuth.get(BASEURLCATEGORYPRODUCT);
            const { data } = await res;
            setData(data.data);
        } catch (m) {
            setError(m.message);
            FeedBackErrorComponent(m.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return {
        data,
        loading,
        error,
        fetchData,
    };
}
export function usePostCategoryProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const postData = async (data) => {
        const formData = new FormData();
        try {
            setLoading(true);
            formData.append("name_category", data.name_category);
            formData.append("icon_category", data.icon_category);
            await axiosAuth.post(BASEURLCATEGORYPRODUCT, formData);
            FeedBackSuccessComponent("Data ditambahkan");
        } catch (m) {
            setError(m.message);
            FeedBackErrorComponent(m.message);
        } finally {
            setLoading(false);
            formData.delete("name_category");
            formData.delete("icon_category");
        }
    };
    return {
        loading,
        error,
        postData,
    };
}
export function useEditCategoryProduct(opened, id) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const editData = async () => {
        try {
            setLoading(true);
            const res = await axiosAuth.get(`${BASEURLCATEGORYPRODUCT}/edit/${id}`);
            const { data } = await res;
            setData(data.data);
        } catch (m) {
            setError(m.message);
            FeedBackErrorComponent(m.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (opened && id) {
            editData();
        }
    }, [opened, id]);
    return {
        data,
        loading,
        error,
        editData,
    };
}
export function useUpdateCategoryProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const updateData = async (data, id) => {
        const formData = new FormData();
        try {
            setLoading(true);
            formData.append("name_category", data.name_category);
            formData.append("icon_category", data.icon_category);
            await axiosAuth.put(`${BASEURLCATEGORYPRODUCT}/${id}`, formData);
            FeedBackSuccessComponent("Data diperbarui");
        } catch (m) {
            setError(m.message);
            FeedBackErrorComponent(m.message);
        } finally {
            setLoading(false);
            formData.delete("name_category");
            formData.delete("icon_category");
        }
    };
    return {
        loading,
        error,
        updateData,
    };
}
export function useDeleteCategoryProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const deleteData = async (id) => {
        try {
            setLoading(true);
            await axiosAuth.delete(`${BASEURLCATEGORYPRODUCT}/${id}`);
            FeedBackSuccessComponent("Data dihapus");
        } catch (m) {
            setError(m.message);
            FeedBackErrorComponent(m.message);
        } finally {
            setLoading(false);
        }
    };
    return {
        loading,
        error,
        deleteData,
    };
}
