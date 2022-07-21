import { SetMetadata } from '@nestjs/common'
import { Roles } from '../config/roles.config'

export const Role = (role: Roles[] | Roles) => SetMetadata('role', role)
