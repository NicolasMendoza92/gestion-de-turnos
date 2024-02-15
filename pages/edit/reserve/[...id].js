
import Spinner from "@/components/Spinner";
import ReserveInfo from "@/components/adminComponents/ReserveInfo";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function EditReservePage() {

    const params = useParams();
    const id = params?.id[0];

    const [reserveInfo, setReserveInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        getReserveInfo();
    }, [id])

    async function getReserveInfo() {
        if (!id) {
            return;
        }
        setIsLoading(true)
        await axios.get('/api/reserves?id=' + id).then(res => {
            setReserveInfo(res.data)
        })
        setIsLoading(false)
    };


    return (
        <div className='grid place-items-center h-screen'>
            {
                isLoading && (
                    <div className='flex justify-center w-full'>
                        <Spinner />
                    </div>

                )
            }
            {
                reserveInfo && (
                    <ReserveInfo {...reserveInfo} />
                )
            }
        </div>
    )
}
