// chú ý code typescript khá chú trong cú pháp nên rất dễ lỗi
type Handle = () => Promise<string>
const fullName = 'Lê Thạch Phúc Vy'
const Person: { name: string } = { name: fullName }
const handle: Handle = () => Promise.resolve(fullName)
handle().then(console.log)
