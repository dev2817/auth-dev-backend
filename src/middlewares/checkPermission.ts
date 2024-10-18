import { NextFunction, Request, Response } from "express";
import { JwtPayload, Permission } from "../types/types";
import { Role } from "../models";

type CheckPermissionOptions = {
  requiredPermission: string;
}

const checkPermission = (options: CheckPermissionOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
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


// checkPermission({ requiredPermission: 'VIEW_DASHBOARD' })



// validations

// const msgList = {
//     param: Joi.object().keys({
//         chatId: Joi.string().required().messages({
//             'any.required': message.PROVIDE_INPUT.replace('#', 'chat id'),
//             'string.empty': message.VALID_INPUT.replace('#', 'chat id')
//         })
//     }),
//     body: Joi.object().keys({
//         userId: Joi.number().integer().positive().messages({
//             'number.base': message.VALID_INPUT.replace('#', 'userId'),
//             'number.integer': message.INTEGER_INPUT.replace('#', 'userId'),
//             'number.positive': message.INTEGER_INPUT.replace('#', 'userId'),
//         }),
//     })
// }
// const getChat = {
//     param: Joi.object().keys({
//         chatId: Joi.string().required().messages({
//             'any.required': message.PROVIDE_INPUT.replace('#', 'chat id'),
//             'string.empty': message.VALID_INPUT.replace('#', 'chat id')
//         })
//     }),
//     query: Joi.object().keys({
//         search: Joi.string(),
//         page: Joi.number(),
//         limit: Joi.number(),
//     })
// }