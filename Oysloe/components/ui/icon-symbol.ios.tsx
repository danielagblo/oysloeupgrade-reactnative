import { SymbolView } from 'expo-symbols';import { jsx as _jsx } from "react/jsx-runtime";


type IconSymbolIOSProps = {
  name: string;
  size?: number;
  color?: string;
  style?: any;
  weight?: 'regular' | 'semibold' | 'bold' | 'light' | 'ultralight' | string;
};

export function IconSymbol({ name, size = 24, color, style, weight = 'regular' }: IconSymbolIOSProps) {
  return _jsx(SymbolView, {
    weight: weight,
    tintColor: color,
    resizeMode: 'scaleAspectFit',
    name: name,
    style: [
      {
        width: size,
        height: size
      },
      style
    ]
  });
}