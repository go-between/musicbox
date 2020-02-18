// Slider does not yet exist, so we sort of fake it here.
// See:  https://github.com/DefinitelyTyped/DefinitelyTyped/pull/42409
import '@rebass/forms'

declare module '@rebass/forms' {
  // eslint-disable-next-line
  export const Slider: any
}
