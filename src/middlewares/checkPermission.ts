import { JwtPayload, Permission } from "../types/types.ts";
import { Role } from "../models/index.ts";

type CheckPermissionOptions = {
  requiredPermission: string;
}

const checkPermission = (options: CheckPermissionOptions) => {
  return async (req: any, res: any, next: any) => {
    try {
      const user = req.user as JwtPayload;
      const roleId = user.roleId;

      const role = await Role.findById(roleId).populate<{ permissions: Permission[] }>('permissions');

      if (!role) {
        return res.status(403).json({ message: 'Access denied: Role not found' });
      }

      const hasPermission = role.permissions.some((permission) => permission.name === options.requiredPermission);

      if (!hasPermission) {
        return res.status(403).json({ message: 'Access denied: You do not have the required permission' });
      }

      next();
    } catch (error) {
      console.error('Error checking permissions:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};

export default checkPermission;
