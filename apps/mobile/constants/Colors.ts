// FoodLovers — Fig & Yuzu design tokens

export const palette = {
  blackFig: '#161218',
  deepAubergine: '#241B2B',
  yuzuLime: '#D7F36A',
  papayaCoral: '#FF8A5B',
  leafTeal: '#46B39D',
  oatCream: '#F4EFE7',

  textPrimary: '#F7F3EE',
  textMuted: '#B7ADB8',
  textDark: '#1A1520',
  textSecondary: '#7A7082',

  positive: '#46B39D',
  caution: '#E8A838',
  warning: '#E85454',
  positiveLight: '#46B39D18',
  cautionLight: '#E8A83818',
  warningLight: '#E8545418',

  surface: '#F4EFE7',
  surfaceElevated: '#FFFFFF',
  surfaceCard: '#FDFBF8',
  border: '#E8E2D9',
  borderSubtle: '#F0EBE3',
  muted: '#C4BAC0',

  catFresh: '#46B39D',
  catProtein: '#C4785C',
  catPantry: '#B8A47C',
  catBeverage: '#6B8DAE',
  catSnacks: '#C27BA0',
  catHousehold: '#7B9EA8',
  catPersonal: '#A88DB5',
  catBaby: '#D4A574',
}

// Backward-compatible alias so existing screens keep working
export const brand = {
  green: palette.leafTeal,
  greenDark: '#3A9484',
  greenLight: palette.positiveLight,
  orange: palette.papayaCoral,
  orangeLight: '#FF8A5B14',
  amber: palette.caution,
  amberLight: palette.cautionLight,
  red: palette.warning,
  redLight: palette.warningLight,
  grey50: palette.surface,
  grey100: palette.borderSubtle,
  grey200: palette.border,
  grey300: palette.muted,
  grey400: palette.textSecondary,
  grey500: palette.textSecondary,
  grey700: '#4A3F50',
  grey900: palette.textDark,
  white: palette.surfaceElevated,
}

export default {
  light: {
    text: palette.textDark,
    textSecondary: palette.textSecondary,
    background: palette.oatCream,
    surface: palette.surfaceCard,
    tint: palette.yuzuLime,
    tabIconDefault: palette.muted,
    tabIconSelected: palette.yuzuLime,
    border: palette.border,
  },
  dark: {
    text: palette.textPrimary,
    textSecondary: palette.textMuted,
    background: palette.blackFig,
    surface: palette.deepAubergine,
    tint: palette.yuzuLime,
    tabIconDefault: palette.textMuted,
    tabIconSelected: palette.yuzuLime,
    border: '#2E2436',
  },
}
