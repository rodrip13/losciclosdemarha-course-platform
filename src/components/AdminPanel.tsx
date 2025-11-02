import { useState, useEffect } from 'react';
import { 
  grantPermission, 
  revokePermission,
  AVAILABLE_PERMISSIONS,
} from '../api/permissions';
import { supabase } from '../api/supabaseClient';

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  permissions: string[];
}

export function AdminPanel() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      console.log('📋 [ADMIN] Cargando lista de usuarios...');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, permissions');

      if (error) {
        console.error('❌ [ADMIN] Error cargando usuarios:', error);
        return;
      }

      setUsers(data || []);
      console.log(`✅ [ADMIN] Se cargaron ${data?.length || 0} usuarios`);
    } catch (err) {
      console.error('❌ [ADMIN] Error inesperado:', err);
    } finally {
      setInitialLoading(false);
    }
  }

  async function handleGrantPermission(userId: string, permission: string) {
    setLoading(true);
    try {
      const result = await grantPermission(userId, permission);
      if (result.success) {
        // Actualizar vista local
        setUsers(prev => 
          prev.map(u => 
            u.id === userId 
              ? { ...u, permissions: result.permissions! } 
              : u
          )
        );
        setSelectedUser(prev => 
          prev && prev.id === userId
            ? { ...prev, permissions: result.permissions! }
            : prev
        );
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleRevokePermission(userId: string, permission: string) {
    setLoading(true);
    try {
      const result = await revokePermission(userId, permission);
      if (result.success) {
        setUsers(prev => 
          prev.map(u => 
            u.id === userId 
              ? { ...u, permissions: result.permissions! } 
              : u
          )
        );
        setSelectedUser(prev => 
          prev && prev.id === userId
            ? { ...prev, permissions: result.permissions! }
            : prev
        );
      }
    } finally {
      setLoading(false);
    }
  }

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">🛡️ Panel de Administración</h1>
        <p className="text-gray-600 mb-6">Gestiona los permisos de acceso para cada usuario</p>

        <div className="grid grid-cols-3 gap-6">
          {/* Lista de Usuarios */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow p-4 h-full flex flex-col">
              <h2 className="text-xl font-bold mb-4">👥 Usuarios ({filteredUsers.length})</h2>
              
              <input
                type="text"
                placeholder="Buscar usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <div className="space-y-2 flex-1 overflow-y-auto">
                {filteredUsers.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <p>No se encontraron usuarios</p>
                  </div>
                ) : (
                  filteredUsers.map(user => (
                    <button
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className={`w-full text-left p-3 rounded transition-colors ${
                        selectedUser?.id === user.id
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      <div className="font-semibold text-sm truncate">
                        {user.full_name || user.email}
                      </div>
                      <div className="text-xs opacity-75 truncate">
                        {user.email}
                      </div>
                      <div className="text-xs opacity-60 mt-1">
                        {user.permissions.length} permiso(s)
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Gestión de Permisos */}
          <div className="col-span-2">
            {selectedUser ? (
              <div className="bg-white rounded-lg shadow p-6 h-full flex flex-col">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    👤 {selectedUser.full_name || selectedUser.email}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{selectedUser.email}</p>
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm font-medium text-gray-700">
                      Permisos actuales: <span className="text-blue-600">{selectedUser.permissions.length}</span>
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedUser.permissions.map(perm => (
                        <span
                          key={perm}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Gestionar Permisos
                </h3>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {AVAILABLE_PERMISSIONS.map(perm => {
                    const hasPermission = selectedUser.permissions.includes(perm.id);
                    
                    return (
                      <div
                        key={perm.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{perm.label}</div>
                          <div className="text-sm text-gray-600">{perm.description}</div>
                        </div>

                        <button
                          onClick={() =>
                            hasPermission
                              ? handleRevokePermission(selectedUser.id, perm.id)
                              : handleGrantPermission(selectedUser.id, perm.id)
                          }
                          disabled={loading}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                            hasPermission
                              ? `bg-${perm.color}-500 hover:bg-${perm.color}-600 text-white`
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {hasPermission ? '✅ Activo' : '❌ Inactivo'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <p className="text-lg">👈 Selecciona un usuario para gestionar sus permisos</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
