import { registerEnumType } from '@nestjs/graphql'

export enum SiteThemeEnum {
  light = 'light',
  dark = 'dark',
  auto = 'auto',
}

registerEnumType(SiteThemeEnum, {
  name: 'SiteThemeEnum',
  description: 'This site theme.',
})
