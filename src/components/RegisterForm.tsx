import { useState, useEffect } from "react";
import { BookOpen, Mail, ArrowRight, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

interface RegisterFormProps {
  onNavigateToLogin?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success">("error");
  const [isRegistered, setIsRegistered] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  // Redirect automático a login después de 5 segundos
  useEffect(() => {
    if (!isRegistered) return;

    const interval = setInterval(() => {
      setRedirectCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      window.location.href = "/";
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isRegistered]);

  // Validar email básico
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar formulario
  const validateForm = (): boolean => {
    // Email vacío
    if (!email.trim()) {
      setMessage("Por favor, ingresa tu correo electrónico");
      setMessageType("error");
      return false;
    }

    // Email inválido
    if (!isValidEmail(email)) {
      setMessage("Por favor, ingresa un correo electrónico válido");
      setMessageType("error");
      return false;
    }

    // Contraseña vacía
    if (!password.trim()) {
      setMessage("Por favor, ingresa una contraseña");
      setMessageType("error");
      return false;
    }

    // Contraseña muy corta
    if (password.length < 6) {
      setMessage("La contraseña debe tener al menos 6 caracteres");
      setMessageType("error");
      return false;
    }

    // Confirmación vacía
    if (!confirmPassword.trim()) {
      setMessage("Por favor, confirma tu contraseña");
      setMessageType("error");
      return false;
    }

    // Contraseñas no coinciden
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      setMessageType("error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // Validar formulario
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await signUp(email, password);

      if (error) {
        // Errores comunes de Supabase
        if (error.message?.includes("already registered")) {
          setMessage("Este correo electrónico ya está registrado. Intenta con otro o inicia sesión.");
        } else if (error.message?.includes("password")) {
          setMessage(`Error con la contraseña: ${error.message}`);
        } else {
          setMessage(`Error: ${error.message || error.error_description || "Error desconocido"}`);
        }
        setMessageType("error");
      } else if (data?.user) {
        // Registro exitoso
        setMessage(
          "¡Registro exitoso! 🎉 Revisa tu correo para confirmar tu cuenta. Redirigiendo a inicio de sesión..."
        );
        setMessageType("success");
        setIsRegistered(true);

        // Limpiar formulario
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error: any) {
      setMessage(`Error inesperado: ${error.message}`);
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  // Si ya se registró, mostrar mensaje de confirmación
  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-contessa-100 via-contessa-200 to-contessa-300 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Registro Exitoso!</h2>
            <p className="text-gray-600 mb-4">
              Te hemos enviado un correo de confirmación. Por favor, verifica tu bandeja de entrada.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                Redirigiendo a inicio de sesión en <strong>{redirectCountdown}s</strong>
              </p>
            </div>
            <button
              onClick={() => {
                window.location.href = "/";
              }}
              className="w-full bg-contessa-600 hover:bg-contessa-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
            >
              Ir a Inicio de Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-contessa-100 via-contessa-200 to-contessa-300 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo y Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-contessa-600 rounded-2xl mb-4 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Curso - Los ciclos de Marha
          </h1>
          <p className="text-gray-600">
            Crea tu cuenta para acceder a los cursos
          </p>
        </div>

        {/* Formulario de Registro */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Crear Cuenta</h2>
            <p className="text-sm text-gray-600">
              Completa los campos para registrarte
            </p>
          </div>

          {message && (
            <div
              className={`mb-4 p-3 ${
                messageType === "error"
                  ? "bg-red-50 text-red-800 border border-red-200"
                  : "bg-blue-50 text-blue-800 border border-blue-200"
              } rounded-lg text-center text-sm`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-contessa-500 focus:border-transparent transition-colors placeholder-gray-400"
                  placeholder="tu@email.com"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-contessa-500 focus:border-transparent transition-colors placeholder-gray-400"
                  placeholder="••••••••"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Mínimo 6 caracteres
              </p>
            </div>

            {/* Campo Confirmar Contraseña */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirmar Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-contessa-500 focus:border-transparent transition-colors placeholder-gray-400"
                  placeholder="••••••••"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Botón de Registro */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-contessa-600 hover:bg-contessa-700 disabled:bg-contessa-400 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Spinner className="h-5 w-5 mr-2" />
                  <span>Creando cuenta...</span>
                </>
              ) : (
                <>
                  <span>Crear Cuenta</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            ¿Ya tienes una cuenta?{" "}
            <button
              onClick={() => {
                window.location.href = "/";
              }}
              className="text-contessa-600 hover:text-contessa-700 font-medium transition-colors"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
