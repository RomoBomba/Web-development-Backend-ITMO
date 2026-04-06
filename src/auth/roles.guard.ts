import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import Session from 'supertokens-node/recipe/session';
import { ROLES_KEY } from '../common/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) return true;

        const http = context.switchToHttp();
        const request = http.getRequest();
        const response = http.getResponse();

        try {
            const session = await Session.getSession(request, response, { sessionRequired: false });
            if (!session) {
                if (request.url.startsWith('/api/')) {
                    response.status(401).json({ message: 'Unauthorized' });
                    return false;
                } else {
                    response.redirect('/login');
                    return false;
                }
            }

            const payload = session.getAccessTokenPayload();
            const role = payload?.userPayload?.role || payload?.role;
            console.log('🔐 RolesGuard - checking role:', role, 'required:', requiredRoles);

            if (requiredRoles.includes(role)) return true;
        } catch (e) {
            console.log('🔐 RolesGuard error:', e.message);
        }

        if (request.url.startsWith('/api/')) {
            response.status(401).json({ message: 'Unauthorized' });
            return false;
        } else {
            response.redirect('/login');
            return false;
        }
    }
}