import { fetchInternalApi } from "@/utils/internal/internal-api";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    console.log("GET /api/v1/data-mappings");
    return await fetchInternalApi(req);
}

export async function POST(req: NextRequest) {
    return await fetchInternalApi(req);
}

export async function PUT(req: NextRequest) {
    return await fetchInternalApi(req);
}

export async function DELETE(req: NextRequest) {
    return await fetchInternalApi(req);
}