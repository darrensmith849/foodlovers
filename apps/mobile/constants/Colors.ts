// FoodLovers — Vemia-inspired premium dark tokens

export const palette = {
  // Backgrounds
  bgApp: '#0F1115',
  bgSurface: '#151922',
  bgElevated: '#1B2130',
  bgSoft: '#222A35',

  // Lines & borders
  lineSubtle: '#2C3644',
  lineBold: '#3A4556',

  // Text
  textPrimary: '#F5F7FA',
  textSecondary: '#A7B0C0',
  textMuted: '#7E8795',

  // Accent
  accentTeal: '#18B7A7',
  accentTealSoft: '#7DE6DB',
  accentTealDeep: '#129486',
  accentTealBg: '#18B7A712',

  // Semantic
  positive: '#2FBF9F',
  caution: '#D6A85F',
  warning: '#C96B6B',
  positiveBg: '#2FBF9F14',
  cautionBg: '#D6A85F14',
  warningBg: '#C96B6B14',

  // Legacy compat — category accents (muted, restrained)
  catFresh: '#2FBF9F',
  catProtein: '#B87D5C',
  catPantry: '#A89670',
  catBeverage: '#6B8DAE',
  catSnacks: '#B07090',
  catHousehold: '#6B9BA8',
  catPersonal: '#9080B0',
  catBaby: '#C0956A',
}

// Backward-compatible alias
export const brand = {
  green: palette.accentTeal,
  greenDark: palette.accentTealDeep,
  greenLight: palette.accentTealBg,
  orange: palette.caution,
  orangeLight: palette.cautionBg,
  amber: palette.caution,
  amberLight: palette.cautionBg,
  red: palette.warning,
  redLight: palette.warningBg,
  grey50: palette.bgSurface,
  grey100: palette.lineSubtle,
  grey200: palette.lineSubtle,
  grey300: palette.textMuted,
  grey400: palette.textSecondary,
  grey500: palette.textSecondary,
  grey700: palette.textSecondary,
  grey900: palette.textPrimary,
  white: palette.textPrimary,
}

export default {
  light: {
    text: palette.textPrimary,
    textSecondary: palette.textSecondary,
    background: palette.bgApp,
    surface: palette.bgSurface,
    tint: palette.accentTeal,
    tabIconDefault: palette.textMuted,
    tabIconSelected: palette.accentTeal,
    border: palette.lineSubtle,
  },
  dark: {
    text: palette.textPrimary,
    textSecondary: palette.textSecondary,
    background: palette.bgApp,
    surface: palette.bgSurface,
    tint: palette.accentTeal,
    tabIconDefault: palette.textMuted,
    tabIconSelected: palette.accentTeal,
    border: palette.lineSubtle,
  },
}
