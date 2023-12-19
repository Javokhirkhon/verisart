import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { Certificate } from '../types'
import { useState } from 'react'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import ShareButton from '../components/ShareButton'

const Certificates = ({ certificates }: { certificates: Certificate[] }) => {
  const [sortBy, setSortBy] = useState('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (column: string) => {
    if (column === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortDirection('asc')
    }
  }

  const sortedCertificates = [...certificates].sort((a, b) => {
    if (sortBy === 'artist') {
      const compareValue = a.artist.localeCompare(b.artist)
      return sortDirection === 'asc' ? compareValue : -compareValue
    }

    return 0
  })

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Photo</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>
            <TableSortLabel
              active={sortBy === 'artist'}
              direction={sortDirection}
              onClick={() => handleSort('artist')}
            >
              Artist
            </TableSortLabel>
          </TableCell>
          <TableCell>Year</TableCell>
          <TableCell>Share</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedCertificates.map(({ title, artist, year, photo }, index) => (
          <TableRow key={index}>
            <TableCell>
              <img
                src={`data:image/png;base64,${photo}`}
                alt={title}
                style={{ width: '100px', height: '100px' }}
              />
            </TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{artist}</TableCell>
            <TableCell>{year}</TableCell>
            <TableCell>
              <ShareButton
                url={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`}
                icon={FacebookIcon}
              />
              <ShareButton
                url={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  window.location.href
                )}&text=${encodeURIComponent(
                  `Check out this certificate: ${title}`
                )}`}
                icon={TwitterIcon}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default Certificates
