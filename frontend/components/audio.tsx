'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { saveAs } from 'file-saver'

export const Audio = () => {
  const [script, setScript] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [audioUrl, setAudioUrl] = useState<string>('')

  const API_URL = 'http://localhost:8000/build_audio'

  const handleGenerateAudio = async () => {
    setLoading(true)
    setAudioUrl('')
    try {
      const formData = new FormData()
      formData.append('script', script)
      const response = await axios.post(API_URL, formData)
      if (response && response.data && response.data.url) {
        setAudioUrl(`http://localhost:8000${response.data.url}`)
        console.log('Audio URL:', audioUrl)
      } else {
        console.error('Failed to generate audio')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // const handleDownloadAudio = async () => {
  //   try {
  //     const response = await axios.get(audioUrl, {
  //       responseType: 'blob',
  //     })
  //     saveAs(response.data, 'audio.mp3')
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <div className='w-full flex items-center justify-center flex-col py-24'>
      <Textarea
      minRows={5}
      maxRows={10}
        className='-full max-w-xl mb-4 border-2 p-2  rounded-lg'
        placeholder='Enter your script here...'
        value={script}
        onChange={(e) => setScript(e.target.value)}
      />
      <Button
        onClick={handleGenerateAudio}
        type='button'
        className='p-2 rounded-lg'
        disabled={loading || !script}
      >
        {loading ? 'Generating Audio' : 'Generate Audio'}
      </Button>
      {audioUrl && (
        <Button
          // onClick={handleDownloadAudio}
          className='mt-4'
          variant={'success'}
        >
          <Link href='#!' download={true}>
            Download Audio
          </Link>
        </Button>
      )}
    </div>
  )
}
