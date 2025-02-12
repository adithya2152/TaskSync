import { getCategoryCounts } from "@/db";

export async function GET() {
    try {
        const catCount = await getCategoryCounts();
        return new Response(JSON.stringify(catCount));
    } catch (error) {
        console.error("Error fetching category counts:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch category counts" }), { status: 500 });
        
    }
}