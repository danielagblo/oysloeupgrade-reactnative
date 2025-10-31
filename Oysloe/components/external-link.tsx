import { Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';import { jsx as _jsx } from "react/jsx-runtime";




export function ExternalLink({ href, ...rest }: { href: string; [key: string]: any }) {
  return (
    _jsx(Link, {
      target: "_blank", ...
      rest,
      href: href,
      onPress: async (event: any) => {
        if (process.env.EXPO_OS !== 'web') {

          event.preventDefault();

          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC
          });
        }
      } }
    ));

}