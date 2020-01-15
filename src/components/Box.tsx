import styled from '@emotion/styled'
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  boxShadow,
  BoxShadowProps,
  color,
  ColorProps,
  compose,
  flexbox,
  FlexboxProps,
  FlexProps,
  FlexWrapProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  typography,
  TypographyProps,
  space,
  SpaceProps,
  variant,
  VariantArgs,
} from 'styled-system'

type ColorPropsHack = Omit<ColorProps, 'color'> & { color?: string }
type Props = BackgroundProps &
  BorderProps &
  BoxShadowProps &
  ColorPropsHack &
  FlexboxProps &
  FlexProps &
  FlexWrapProps &
  LayoutProps &
  PositionProps &
  TypographyProps &
  SpaceProps &
  VariantArgs

const Box = styled('div')<Props>(
  {
    boxSizing: 'border-box',
    margin: 0,
    minWidth: 0,
  },
  compose(
    background,
    border,
    boxShadow,
    color,
    flexbox,
    layout,
    position,
    typography,
    space,
    variant
  )
)

export default Box
