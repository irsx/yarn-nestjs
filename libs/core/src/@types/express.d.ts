declare namespace Express {
  export interface JwtPayload {
    sub: string;
    resource_access: any;
    email_verified: boolean;
    preferred_username: string;
    given_name: string;
    family_name: string;
    email: string;
  }

  export interface RealmAccess {
    roles: string[];
  }

  export interface ResourceAccess {
    account: RealmAccess;
  }
  export interface Request {
    session: JwtPayload;
    userId: string;
    accessToken: string;
  }
}
