import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { fontSizes, spacingSizes } from '../../utils/size';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item }) => {
  return (
    <Text style={styles(item.status).historyItem}>{item.subject}</Text>
  );
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        {!!focusHistory.length ? ( // Changed to a ternary operator for clarity
          <>
            <Text style={styles().title}>Things we focus on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={clearHistory}
              />
            </View>
          </>
        ) : (
          <Text style={styles().title}>No focus history available.</Text> // Message when no history
        )}
      </SafeAreaView>
    </>
  );
};

const styles = (status) =>
  StyleSheet.create({
    historyItem: {
      color: status > 1 ? 'red' : 'green',
      fontSize: fontSizes.md,
    },
    title: {
      color: 'white',
      fontSize: fontSizes.lg,
    },
    clearContainer: {
      alignItems: 'center',
      padding: spacingSizes.md,
    },
  });
