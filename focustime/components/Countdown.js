import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/color';
import { fontSizes, spacingSizes } from '../utils/size';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

export const Countdown = ({
  minutes = 0.1,
  isPaused = true,
  onProgress,
  onEnd,
}) => {
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(minutesToMillis(minutes));
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  const countDown = (time) => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };
  useEffect(()=>{
    onProgress(millis / minutesToMillis(minutes));
    if(millis ===0){
      onEnd();
    }
  }, [millis])
  
  useEffect(()=>{
    setMillis(minutesToMillis(minutes))
  },[minutes])

  useEffect(() => {
    if (isPaused) {
      if (interval.current) {
        clearInterval(interval.current);
      }
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    padding: spacingSizes.lg,
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
