interface User {
    _id: string;
}

interface Business {
    _id: string;
}

export default async function saveHandler(
    user: User | null,
    business: Business | null,
    fieldName: string,
    newValue: any,
    setExpanded: (expanded: boolean) => void
): Promise<void> {
    let model = user ? "UserModel" : "BusinessModel";
    let id = user ? user._id : business?._id;
    const res = await fetch("/api/updateDB", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model, id, fieldName, newValue
        }),
    });
    res.status === 200 && setExpanded(false);
} 