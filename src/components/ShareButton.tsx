import { IconButton } from '@mui/material'

const ShareButton = ({
  url,
  icon: Icon,
}: {
  url: string
  icon: React.ComponentType<{ color: 'primary' }>
}) => (
  <IconButton onClick={() => window.open(url, '_blank')}>
    <Icon color='primary' />
  </IconButton>
)

export default ShareButton
