

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { jsx as _jsx } from 'react/jsx-runtime';

const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right'
} as const;

type IconName = keyof typeof MAPPING;

type IconSymbolProps = {
  name: IconName;
  size?: number;
  color?: string;
  style?: any;
};

export function IconSymbol({ name, size = 24, color, style }: IconSymbolProps) {
  const mapped = MAPPING[name];
  return _jsx(MaterialIcons, { color: color, size: size, name: mapped, style: style });
}