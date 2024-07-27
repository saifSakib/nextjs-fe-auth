import CardWrapper from "@/components/auth/CardWrapper"

function LoginForm() {
  return (
    <CardWrapper
      backButtonHref="/auth/register"
      backButtonLabel="Dont Have An Account?"
      headerLabel="Welcome Back!"
      showSocial
    >
        hello
    </CardWrapper>
  )
}

export default LoginForm