import { Injectable } from '@nestjs/common'
import { CreateSubjectInput } from '../inputs/subject/create-subject.input'
import { UpdateSubjectInput } from '../inputs/subject/update-subject.input'
import { SubjectRepository } from '../repositories'
import { Subject } from '@/entities'

@Injectable()
export class SubjectService {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  async createSubject(createSubjectInput: CreateSubjectInput): Promise<Subject> {
    return await this.subjectRepository.createSubject(createSubjectInput)
  }

  async getAllSubjects(): Promise<Subject[]> {
    return await this.subjectRepository.getAllSubjects()
  }

  async getSubjectByName(name: string): Promise<Subject> {
    return await this.subjectRepository.getSubjectByName(name)
  }

  async getSubjectById(id: string): Promise<Subject> {
    return await this.subjectRepository.getSubjectById(id)
  }

  async deleteSubject(id: string): Promise<string> {
    await this.deleteSubject(id)
    return 'deleted'
  }

  async updateSubject(id: string, updateSubjectInput: UpdateSubjectInput): Promise<Subject> {
    return await this.updateSubject(id, updateSubjectInput)
  }
}
