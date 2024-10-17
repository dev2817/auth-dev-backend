import express from 'express';
import userRoutes from './user.routes.ts';
import adminRoutes from './admin.routes.ts';
import superAdminRoutes from './superAdmin.routes.ts';

const router = express.Router();

const defaultRoutes = [
    {
        path: '/users',
        route: userRoutes,
    },
    {
        path: '/admin',
        route: adminRoutes,
    },
    {
        path: '/superAdmin',
        route: superAdminRoutes,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
