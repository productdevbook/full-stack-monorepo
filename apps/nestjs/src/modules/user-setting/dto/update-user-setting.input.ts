import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class UpdateUserSettingInput {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    siteLanguageId?: string | null

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    siteThemeId?: string | null

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    timezone?: string | null

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    currencyId?: string | null

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    countryId?: string | null

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    cityId?: string | null
}
