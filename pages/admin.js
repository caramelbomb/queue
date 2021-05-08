import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Admin () {
  const [active, setActive] = useState('')
  const getActive = async () => {
    const result = await axios.get('https://queue-3b7fd-default-rtdb.asia-southeast1.firebasedatabase.app/active.json')
    setActive(result.data.value)
  }

  const nextActive = async () => {
    const result = await axios.get('https://queue-3b7fd-default-rtdb.asia-southeast1.firebasedatabase.app/active.json')
    await axios.patch('https://queue-3b7fd-default-rtdb.asia-southeast1.firebasedatabase.app/active.json', { value: parseInt(result.data.value + 1) })
    setActive(parseInt(result.data.value + 1))
  }

  useEffect(() => {
    getActive()
  }, [active])
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>{active}</h1>
      <button
        className={styles.button}
        onClick={nextActive}
      >NEXT
      </button>
    </div>
  )
}
