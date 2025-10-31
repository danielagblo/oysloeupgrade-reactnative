import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function ChatScreen() {
  return (
    _jsxs(ThemedView, { style: styles.container, children: [
      _jsx(ThemedText, { type: "title", children: "Chat" }),
      _jsx(ThemedText, { children: "This is the Chat screen" })] }
    ));

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
});