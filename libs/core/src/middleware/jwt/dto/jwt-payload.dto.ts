export interface JwtPayload {
  sub: string;
  resource_access: { [key: string]: [Object] };
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
