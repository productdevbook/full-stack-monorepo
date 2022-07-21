// simdi algoritma bu
export const hasPermission = (
  requiredPermission: string | string[],
  userPermissions: string[],
) => {
  if (typeof requiredPermission === 'string' && userPermissions?.length > 0) {
    return userPermissions.includes(requiredPermission)
  }
  else if (requiredPermission.length > 0 && userPermissions?.length > 0) {
    // status bu sekilde esitledigimizde sorun cozuluyor, return algilamiyor foreac icinde ilginc. Kolay gelsin.
    let status = false
    userPermissions.forEach((permission) => {
      if (requiredPermission.includes(permission))

        status = true
    })
    if (status)
      return true
  }
  else {
    return false
  }
}

// export const isOperationAllowed = (requiredRole: Roles, userRole: Role) => {
//   if (requiredRole != null && userRole != null) {
//     const userRoleLevel = ROLE_LEVEL[userRole.name_en]
//     const requiredRoleLevel = ROLE_LEVEL[requiredRole]

//     return userRoleLevel >= requiredRoleLevel
//   }
//   return false
// }

