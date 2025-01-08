import BugShow from "@/components/modules/BugShow";
import connectToDB from "@/configs/db";

export default async function page() {
    await connectToDB();

    return (
        <BugShow />
    )

}
