type validatePermissionsParams = {
  roles: string[];
  user: {
    roles: string[]
  };
}

export default function validatePermissions({
  roles,
  user
}: validatePermissionsParams) {
  
  if (roles?.length > 0) {
    const hasRoles = roles.some(role => {
      return user.roles.includes(role)
    })

    if (!hasRoles) {
      return false
    }
  }

  return true

}