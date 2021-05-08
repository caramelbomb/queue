import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Queue () {
  const router = useRouter()
  const [queue, setQueue] = useState('')
  const [active, setActive] = useState('')
  const getQueue = async () => {
    const result = await axios.get('https://queue-3b7fd-default-rtdb.asia-southeast1.firebasedatabase.app/queue.json')
    setQueue(result.data.value)
    const result2 = await axios.get('https://queue-3b7fd-default-rtdb.asia-southeast1.firebasedatabase.app/active.json')
    setActive(result2.data.value)
  }

  const display = () => {
    if (queue === active) {
      return (
        <>
          <h1>It's You!!
          </h1>
        </>
      )
    } else {
      return (
        <>
          <h1>Processing is #{active}...
          </h1>
          <button
            className={styles.button}
            onClick={() => {
              router.push('/')
            }}
          >cancel
          </button>
        </>
      )
    }
  }

  useEffect(() => {
    getQueue()
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>#{queue}
      </h1>
      {display()}
    </div>
  )
}
