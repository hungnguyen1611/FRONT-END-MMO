import { Grid } from 'antd'
import React, { useState, useEffect } from 'react'

const Countdown = ({ initialTime, setModalBank }) => {
  const [time, setTime] = useState(initialTime)

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)

      return () => {
        clearInterval(timerId)
      }
    } else {
      setModalBank(false)
    }
  }, [time])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  return (
    <div style={styles.countdown}>
      <p style={styles.content}>Hiệu lực QR sẽ hết hạn trong 5 phút</p>
      <h1 style={styles.time}>{formatTime(time)}</h1>
    </div>
  )
}

const styles = {
  countdown: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '20px',
    fontFamily: 'serif'

    // backgroundColor: "#f0f0f0"
  },
  time: {
    fontSize: '1rem',
    color: '#e83e8c',
    margin: 0
  },
  content: {
    margin: 0
  }
}

export default Countdown
