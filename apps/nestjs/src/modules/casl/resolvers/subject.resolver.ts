import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateSubjectInput } from '../inputs/subject/create-subject.input'
import { UpdateSubjectInput } from '../inputs/subject/update-subject.input'
import { SubjectService } from '../services/subject.service'
import { Subject } from '@/entities'

@Resolver()
export class SubjectResolver {
  constructor(private readonly subjectService: SubjectService) {}

  @Query(() => [Subject])
  async subjects(): Promise<Subject[]> {
    return await this.subjectService.getAllSubjects()
  }

  @Query(() => Subject)
  async subject(@Args('name') name: string): Promise<Subject> {
    return await this.subjectService.getSubjectByName(name)
  }

  @Mutation(() => Subject)
  async createSubject(@Args('data') data: CreateSubjectInput): Promise<Subject> {
    return await this.subjectService.createSubject(data)
  }

  @Mutation(() => Subject)
  async updateSubject(@Args('id') id: string, @Args('data') data: UpdateSubjectInput): Promise<Subject> {
    return await this.subjectService.updateSubject(id, data)
  }

  @Mutation(() => Subject)
  async deleteSubject(@Args('id') id: string): Promise<Boolean> {
    await this.subjectService.deleteSubject(id)
    return true
  }
}
