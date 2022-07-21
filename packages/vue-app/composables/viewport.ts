import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export default function useViewPort() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smaller('md')
  const isSmallerDesktop = breakpoints.isSmaller('lg')
  const isSmallerLg = breakpoints.smaller('lg')
  const isTablet = breakpoints.smaller('xl')
  const largeMobile = breakpoints.greater('sm')
  return {
    breakpoints,
    isMobile,
    largeMobile,
    isTablet,
    isSmallerLg,
    isSmallerDesktop,
  }
}
