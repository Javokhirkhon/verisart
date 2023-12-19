import { Box, Button, TextField } from '@mui/material'
import { FormEvent } from 'react'

const Form = ({
  formRef,
  handleSubmit,
}: {
  formRef: React.RefObject<HTMLFormElement>
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
}) => (
  <Box
    ref={formRef}
    component='form'
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}
    onSubmit={handleSubmit}
  >
    <TextField label='Title' variant='outlined' name='title' required />
    <TextField label='Artist' variant='outlined' name='artist' required />
    <TextField label='Year' variant='outlined' name='year' required />
    <input type='file' accept='image/*' name='photo' required />
    <Button variant='contained' color='primary' type='submit' size='large'>
      CREATE
    </Button>
  </Box>
)

export default Form
