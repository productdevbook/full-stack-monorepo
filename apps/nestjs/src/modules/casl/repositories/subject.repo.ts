import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { CreateSubjectInput } from '../inputs/subject/create-subject.input'
import { UpdateSubjectInput } from '../inputs/subject/update-subject.input'
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

  async getAllSubjects(): Promise<Subject[]> {
    return await this.subjectRepo.findAll()
  }

  async getSubjectByName(name: string): Promise<Subject> {
    return await this.subjectRepo.findOneOrFail({ name })
  }

  async getSubjectById(id: string): Promise<Subject> {
    return await this.subjectRepo.findOneOrFail({ id })
  }

  async deleteSubject(id: string): Promise<void> {
    await this.subjectRepo.removeAndFlush({ id })
  }

  async updateSubject(id: string, updateSubjectInput: UpdateSubjectInput): Promise<Subject> {
    return await this.subjectRepo.createQueryBuilder().update(updateSubjectInput).where({ id }).execute()
  }
}
