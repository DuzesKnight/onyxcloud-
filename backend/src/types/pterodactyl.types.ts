export interface PterodactylUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  external_id: string | null;
}

export interface PterodactylServer {
  id: number;
  external_id: string | null;
  identifier: string;
  name: string;
}
