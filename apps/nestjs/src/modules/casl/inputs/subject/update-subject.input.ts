import { InputType, PartialType } from '@nestjs/graphql'
import { CreateSubjectInput } from './create-subject.input'

@InputType()
export class UpdateSubjectInput extends PartialType(CreateSubjectInput) {}
