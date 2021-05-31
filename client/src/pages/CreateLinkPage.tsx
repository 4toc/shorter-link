import React, { useState } from "react"
import { TextInput, Button, toaster } from "evergreen-ui"
import axios from "axios"

import "../sass/components/CreateLink.scss"

interface Link {
  link: string
}

const CreateLinkPage: React.FC<Link> = () => {
  const [value, setValue] = useState("")
  const [generatedLink, setGeneratedLink] = useState("")

  function handleSubmit() {
    axios
      .post(`http://localhost:5000/links/create`, {
        fullLink: value,
      })
      .then((res) => {
        const { data } = res
        console.log(data)
        setGeneratedLink(data.link)
      })
      .catch((error) => {
        toaster.danger("Ошибка при создании")
      })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  return (
    <div className='create-link'>
      <div className='create-link__main'>
        <TextInput
          className='create-link__input'
          placeholder='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          onChange={handleChange}
          value={value}
        />
        <Button
          className='create-link__create-btn'
          appearance='primary'
          onClick={handleSubmit}
        >
          Создать
        </Button>

        {generatedLink ? (
          <div className='create-link__finish'>
            <h3>Сгенерированная ссылка</h3>
            <p className='create-link__finish-link'>{generatedLink}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default CreateLinkPage
