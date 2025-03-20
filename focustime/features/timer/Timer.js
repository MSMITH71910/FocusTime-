import React, { useState } from 'react';
import { Text, View, StyleSheet,Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacingSizes } from '../../utils/size';
import { colors } from '../../utils/color';
import { Countdown } from '../../components/Countdown';
import { useKeepAwake } from 'expo-keep-awake';
import { Timing } from './Timing';

const DEFAULT_TIME= 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const onProgress = (curProgress) => {
    setProgress(curProgress);
  };

  const vibrate = ()=>{
    if(Platform.OS === 'ios'){
      const interval = setInterval(()=> Vibration.vibrate(), 1000);
      setTimeout(()=> clearInterval(interval), 10000);

    }else{
      Vibration.vibrate(10000);
    }
  }
  const onEnd = ()=>{
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  const onChangeTime = (min) => {
    setProgress(1);
    setMinutes(min);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacingSizes.sm }}>
        <ProgressBar
          progress={progress}
          color="#5e84e2"
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.btnContainer}>
        <Timing onChangeTime={onChangeTime} />
      </View>

      <View style={styles.btnContainer}>
        <RoundedButton
          title={isStarted ? 'Pause' : 'Start'}
          onPress={() => {
            setIsStarted(!isStarted);
          }}
        />
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton
          title='-'
          size={60}
          onPress={() => {
            clearSubject(!isStarted);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    paddingTop: spacingSizes.xxl,
  },
  btnContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacingSizes.md,
  },
  title: {
    color: colors.white,
    textAlign: 'center',

    fontSize: fontSizes.md,
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSizes.md,
  },
  clearSubject:{
    paddingBottom: 25,
    paddingLeft: 25,
  }
});
