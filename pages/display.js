import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Display () {
  const [queue, setQueue] = useState('')
  const getQueue = async () => {
    const result = await axios.get('https://queue-3b7fd-default-rtdb.asia-southeast1.firebasedatabase.app/active.json')
    setQueue(result.data.value)
  }

  useEffect(() => {
    getQueue()
  }, [])
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>#{queue}</h1>
    </div>
  )
}
