import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function ModalScreen() {
  return (
    _jsxs(ThemedView, { style: styles.container, children: [
      _jsx(ThemedText, { type: "title", children: "This is a modal" }),
      _jsx(Link, { href: "/", dismissTo: true, style: styles.link, children:
        _jsx(ThemedText, { type: "link", children: "Go to home screen" }) }
      )] }
    ));

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  link: {
    marginTop: 15,
    paddingVertical: 15
  }
});