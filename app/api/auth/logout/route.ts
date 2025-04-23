import { cookies } from "next/headers";

export async function GET(req: Request): Promise<Response> {
    await cookies().delete("token");
    return Response.json({ message: "User sign out !!" }, { status: 200 });
} 