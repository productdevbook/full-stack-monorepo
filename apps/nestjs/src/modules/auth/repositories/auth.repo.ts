import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { SignUpInput } from '../inputs/signup.input'
import { SignInInput } from '../inputs/signin.input'
import { User } from '@/entities'
// import { convertToJSValueSQL } from '@/core/utils/secret'
import { TranslateService } from '@/modules/translate/translate.service'
import { UserSetting } from '@/entities/user-setting.entity'

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(UserSetting)
    private readonly userSettingRepo: EntityRepository<UserSetting>,
    private readonly i18n: TranslateService,
  ) {
  }

  public async signUp(data: SignUpInput): Promise<User> {
    const user = await this.userRepository.findOne({ email: data.email })
    if (user)
      throw new HttpException(await this.i18n.error('ierror.user_already_exists'), HttpStatus.CONFLICT)

    const newUser = this.userRepository.create({
      ...data,
      lastLoginAt: new Date(),
      createdAt: new Date(),
      isTermsAccepted: data.isTermsAccepted,
    })

    const newSettings = this.userSettingRepo.create({
      user: newUser,
    })

    await this.userRepository.persistAndFlush([newUser, newSettings])
    return newUser
  }

  public async singin(data: SignInInput) {
    const user = await this.userRepository.createQueryBuilder()
      .where(`email = '${data.email}'`)
      .getSingleResult()
    // const usera = await this.userRepository.createQueryBuilder()
    //   .where(`${convertToJSValueSQL('email')} = '${data.email}'`)
    //   .getQuery()

    if (!user)
      throw new HttpException(await this.i18n.error('ierror.user_dont_found'), HttpStatus.UNPROCESSABLE_ENTITY)
    return user
  }

  public async save(user: User) {
    await this.userRepository.persistAndFlush(user)
    return user
  }

  public async findUser(email: string): Promise<User> {
    const user = await this.userRepository.createQueryBuilder()
      .where(`email = '${email}'`)
      .getSingleResult()

    if (!user)
      throw new HttpException(await this.i18n.error('ierror.user_dont_found'), HttpStatus.UNPROCESSABLE_ENTITY)
    return user
  }

  // simdi burada hangi tabloya baglanmamiz gerekiyor
  public async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'userRole')
      .leftJoinAndSelect('userRole.permissions', 'userRolePermission')
      .leftJoinAndSelect('userRolePermission.subject', 'userRolePermissionSubject')
      .where(`"user".id = '${id}'`)
      .getSingleResult()

    if (!user)
      throw new HttpException(await this.i18n.error('ierror.user_dont_found'), HttpStatus.UNPROCESSABLE_ENTITY)
    return user
  }
}
