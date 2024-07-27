import CardWrapper from "@/components/auth/CardWrapper"

function RegisterForm() {
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Already Have An Account?"
      headerLabel="Welcome Back!"
      showSocial
    >
        hello
    </CardWrapper>
  )
}

export default RegisterForm