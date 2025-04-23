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
  newValue: unknown,
  setExpanded: (expanded: boolean) => void
): Promise<void> {
  const model = user ? 'UserModel' : 'BusinessModel';
  const id = user ? user._id : business?._id;
  const res = await fetch('/api/updateDB', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      id,
      fieldName,
      newValue,
    }),
  });
  if (res.status === 200) {
    setExpanded(false);
  }
}
