// FoodLovers brand palette
export const brand = {
  green: '#16A34A',
  greenDark: '#15803D',
  greenLight: '#DCFCE7',
  orange: '#EA580C',
  orangeLight: '#FFF7ED',
  amber: '#D97706',
  amberLight: '#FFFBEB',
  red: '#DC2626',
  redLight: '#FEF2F2',
  grey50: '#F9FAFB',
  grey100: '#F3F4F6',
  grey200: '#E5E7EB',
  grey300: '#D1D5DB',
  grey400: '#9CA3AF',
  grey500: '#6B7280',
  grey700: '#374151',
  grey900: '#111827',
  white: '#FFFFFF',
}

const tintColorLight = brand.green
const tintColorDark = '#fff'

export default {
  light: {
    text: brand.grey900,
    textSecondary: brand.grey500,
    background: brand.white,
    surface: brand.grey50,
    tint: tintColorLight,
    tabIconDefault: brand.grey400,
    tabIconSelected: tintColorLight,
    border: brand.grey200,
  },
  dark: {
    text: '#fff',
    textSecondary: '#9CA3AF',
    background: '#000',
    surface: '#1F2937',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    border: '#374151',
  },
}
