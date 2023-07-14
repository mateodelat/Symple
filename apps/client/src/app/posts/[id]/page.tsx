export default function Post ({ params }: { params: { id: string } }): JSX.Element {
  const { id } = params
  return <h1>Este es el post {id}</h1>
}
