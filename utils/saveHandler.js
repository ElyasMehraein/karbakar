export default async function saveHandler(user, business, fieldName, newValue, setExpanded) {
  let model = user ? 'UserModel' : 'BusinessModel'
  let id = user ? user._id : business._id
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
  })
  res.status === 200 && setExpanded(false)
}
