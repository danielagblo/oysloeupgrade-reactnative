import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function PostAdScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Post Ad</ThemedText>
      <ThemedText>This is the Post Ad screen</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
