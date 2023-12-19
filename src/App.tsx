import { Box, Button, Divider, Typography } from '@mui/material'
import { FormEvent, useRef, useState } from 'react'
import readFile from './utils/readFile'
import { Certificate } from './types'
import Certificates from './sections/Certificates'
import Form from './sections/Form'

const App = () => {
  const storedCertificates: Certificate[] = JSON.parse(
    localStorage.getItem('certificates') || '[]'
  )
  const [certificates, setStoredCertificates] = useState(storedCertificates)

  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = new FormData(event.target as HTMLFormElement)

    const photo = await readFile(form.get('photo') as File)

    const certificate: Certificate = {
      title: form.get('title') as string,
      artist: form.get('artist') as string,
      year: form.get('year') as string,
      photo,
    }

    setStoredCertificates((prevCertificates) => [
      certificate,
      ...prevCertificates,
    ])

    localStorage.setItem(
      'certificates',
      JSON.stringify([certificate, ...certificates])
    )

    if (formRef.current) {
      formRef.current.reset()
    }
  }

  const handleClearAll = () => {
    setStoredCertificates([])
    localStorage.removeItem('certificates')
  }

  return (
    <Box py={4} px={2} maxWidth={650} mx='auto'>
      <Typography component='h1' variant='h4' textAlign='center' mb={4}>
        Register Certificate
      </Typography>
      <Form {...{ formRef, handleSubmit }} />
      <Divider sx={{ my: 4 }} />
      {certificates?.length ? (
        <>
          <Typography component='h2' variant='h5' textAlign='center' mb={4}>
            Registered Certificates
          </Typography>
          <Certificates certificates={certificates} />
          <Button color='error' size='large' fullWidth onClick={handleClearAll}>
            CLEAR ALL
          </Button>
        </>
      ) : (
        <Typography component='h2' variant='h5' textAlign='center'>
          No Registered Certificates
        </Typography>
      )}
    </Box>
  )
}

export default App
