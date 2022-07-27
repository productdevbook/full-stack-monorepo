import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { CreateSubjectInput } from '../inputs/subject/create-subject.input'
import { Subject } from '@/entities'

@Injectable()
export class SubjectRepository {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepo: EntityRepository<Subject>,
  ) { }

  async createSubject(createSubjectInput: CreateSubjectInput): Promise<Subject> {
    const newSubject = this.subjectRepo.create(createSubjectInput)
    await this.subjectRepo.persistAndFlush(newSubject)
    return newSubject
  }

  async deleteSubject(id: number): Promise<void> {
    await this.subjectRepo.removeAndFlush({ id })
  }
}
