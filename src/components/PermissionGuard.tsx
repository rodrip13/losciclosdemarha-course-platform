import { ReactNode, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserPermissions } from '../api/permissions';
import Spinner from './Spinner';

interface PermissionGuardProps {
  permission: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGuard({
  permission,
  children,
  fallback
}: PermissionGuardProps) {
  const { user } = useAuth();
  const [hasPermission, setHasPermission] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    checkPermission();
  }, [user]);

  async function checkPermission() {
    try {
      console.log(`🔒 [GUARD] Verificando permiso '${permission}' para:`, user?.id);
      const { permissions } = await getUserPermissions(user!.id);
      const has = permissions.includes(permission);
      setHasPermission(has);
      console.log(`🔒 [GUARD] Resultado: ${has ? '✅ ACCESO PERMITIDO' : '❌ ACCESO DENEGADO'}`);
    } catch (error) {
      console.error('❌ [GUARD] Error verificando permiso:', error);
      setHasPermission(false);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Spinner />;
  }

  if (!hasPermission) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-center">
            <div className="text-4xl mb-4">🔐</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Acceso No Autorizado
            </h1>
            <p className="text-gray-600">
              No tienes permiso para acceder a esta funcionalidad.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Permiso requerido: <code className="bg-gray-100 px-2 py-1 rounded">{permission}</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
