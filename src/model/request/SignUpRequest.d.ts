export interface SignUpRequest {
  name: string;
  identification: string;
  email: string;
  password: string;
  roleId?: number;
  institutionId?: number;
  photo?: string | null;
}
