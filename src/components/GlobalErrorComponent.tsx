type Props = Readonly<{
  error: Error
}>

const GlobalErrorComponent = ({ error }: Props) => {
  return (
    <main className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="font-lora text-3xl font-semibold">An Error Occurred</h1>
      <p className="text-muted-foreground">{error.message}</p>
    </main>
  )
}

export default GlobalErrorComponent
