import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home () {
  const [queue, setQueue] = useState('')
  const getQueue = async () => {
    const result = await axios.get('https://queue-3b7fd-default-rtdb.asia-southeast1.firebasedatabase.app/queue.json')
    setQueue(result.data.value)
  }

  useEffect(() => {
    getQueue()
  }, [])
  const router = useRouter()
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={async () => {
          await axios.patch('https://queue-3b7fd-default-rtdb.asia-southeast1.firebasedatabase.app/queue.json', { value: parseInt(queue + 1) })
          router.push('/queue')
        }}
      >ENQUEUE
      </button>
      <div>
        <button
          className={styles.button}
          style={{ margin: '40px' }}
          onClick={() => {
            router.push('/display')
          }}
        >DISPLAY
        </button>
        <button
          className={styles.button}
          onClick={() => {
            router.push('/admin')
          }}
        >ADMIN
        </button>
      </div>
    </div>
  )
}
