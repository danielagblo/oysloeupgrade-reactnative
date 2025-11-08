

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ThemeProps = { light?: string; dark?: string };

export function useThemeColor(props: ThemeProps, colorName: string): string {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme as keyof ThemeProps];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    // Colors typing in this repo is loose; cast to any to index dynamically
    return (Colors as any)[theme][colorName] as string;
  }
}