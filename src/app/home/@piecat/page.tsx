"use client"
import { useState , useEffect} from "react"
import Card from "@/components/Card"
import PieChart from "@/components/PieCat"
import axios from "axios"
export default function Piecat()
{

    const [cat , setCat] = useState<{ category: string; count: number }[]>([])

    useEffect(() => {
         const fetchCount = async()=>
         {
            const res = await axios.get("/home/getCatCount")

            if(res.status === 200)
            {
                setCat(res.data)
                console.log("Fetched count", res.data)
            }
            else
            {
                console.log("Failed to fetch count")
            }

         }
         fetchCount()
    }, []);

    return(
        <Card>
             <div>
                <h2>Category Distribution</h2>
                {cat.length > 0 ? (
                    <PieChart labels={cat.map((c) => c.category)} data={cat.map((c) => c.count)} />
                ) : (
                    <p>Loading...</p>
                )}
        </div>
        
        </Card>
    )
}