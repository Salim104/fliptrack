import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#0A0A0A' }}
    >
      <SignUp />
    </main>
  )
}
