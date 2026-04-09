import { colors } from '../config/colors';

export const getColorStyle = (colorName: keyof typeof colors) => ({
  color: colors[colorName],
});

export const getBgColorStyle = (colorName: keyof typeof colors) => ({
  backgroundColor: colors[colorName],
});

export const getBorderColorStyle = (colorName: keyof typeof colors) => ({
  borderColor: colors[colorName],
});
