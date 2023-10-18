'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Button } from '@components/index'
import { type UploadFileProps } from '@/types'
import styles from './UploadFile.module.scss'
import { customFetch } from '@/lib/fetch'

export default function UploadFile ({
  text = 'Seleccionar archivo',
  id = 'fileUpload',
  file,
  handleSelectedFile = () => {},
  props
}: UploadFileProps): JSX.Element {
  const [image, setImage] = useState<string>('')
  const [element, setElement] = useState<HTMLElement | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const result = event.target.files?.[0]
    handleSelectedFile(result as File)
  }

  useEffect(() => {
    const element = document.getElementById(id)
    setElement(element)
  }, [])

  useEffect(() => {
    if (file.file !== undefined) {
      let src = ''
      if (file.file instanceof File) src = URL.createObjectURL(file.file)
      else {
        customFetch({
          baseUrl: `${process.env.SERVER_URL as string}/uploads/${file.file}`,
          method: 'GET',
          hasParser: true
        })
          .then(async (res) => {
            const blob = await res.blob()
            const src = URL.createObjectURL(blob)
            setImage(src)
          })
          .catch((err) => {
            console.log(err)
          })
      }
      setImage(src)
    }
  }, [file])

  return (
    <div className={styles.container}>
      <input type="file" hidden id={id} onChange={handleChange} {...props} />
      <Button
        onClick={() => {
          element?.click()
        }}
        className={styles.container_button}
      >
        {text}
      </Button>

      {file?.file === undefined
        ? (
        <span className={styles.container_text}>
          No hay archivos seleccionados...
        </span>
          )
        : (
        <>
          {image !== '' && (
            <div className={styles.image}>
              <Image
                src={image}
                alt="Foto de empresa"
                width={200}
                height={200}
              />
            </div>
          )}
        </>
          )}
    </div>
  )
}
