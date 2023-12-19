const readFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1])
      } else {
        reject(new Error('Failed to read the file as Base64.'))
      }
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}

export default readFile
