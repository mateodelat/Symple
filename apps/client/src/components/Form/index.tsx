import { useField } from '@/hooks/useField'

export const Form = (): JSX.Element => {
  const email = useField('email')
  const password = useField('password')

  const handleSubmit = (): undefined => {
    console.log('submit')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input {...email} />
      <input {...password} />
    </form>
  )
}
