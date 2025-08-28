import { useEffect, useState } from "react";
import { FeedBackErrorComponent, FeedBackSuccessComponent } from "../../components/reusable/FeedBackComponent";
import { axiosAuth, BASEURLPRODUCTDISCOUNT } from "./baseUrl";

export function usePostProductDiscount() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const postData = async (data) => {
        try {
            setLoading(true)

            await axiosAuth.post(BASEURLPRODUCTDISCOUNT, data);
            FeedBackSuccessComponent("Data ditambahkan");

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
        postData,
        error
    }

}

export function useDeleteProductDiscount() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const deleteData = async (id) => {
        try {
            setLoading(true)
            await axiosAuth.delete(`${BASEURLPRODUCTDISCOUNT}/${id}`)
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
