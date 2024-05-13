export interface UserResponse {
  usuario_id: number;
  usuario_nombre: string;
  usuario_cedula: string;
  usuario_correo: string;
  usuario_foto: string | null;
  usuario_institucion_id: number;
  usuario_institucion_nombre: string;
  usuario_rol_id: number;
  usuario_rol_nombre: string;
  usuario_contrasena: string;
  token: string;
}
