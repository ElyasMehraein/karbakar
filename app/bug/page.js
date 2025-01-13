import BugShow from "@/components/modules/BugShow";
import connectToDB from "@/configs/db";
import { GET } from "../api/auth/me/route";

export default async function page() {
    await connectToDB();
    const response = await GET();
    const user = await response.json();
    return (
        <BugShow user={user} />
    )

}
