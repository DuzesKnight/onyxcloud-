import { pterodactylRequest, unwrapPterodactylAttributes } from './client.service';
import { PterodactylUser } from '../../types/pterodactyl.types';

interface CreatePterodactylUserInput {
  externalUserId: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

export const createPterodactylUser = async (input: CreatePterodactylUserInput): Promise<PterodactylUser> => {
  const payload = await pterodactylRequest<{ object: string; attributes: PterodactylUser }>(
    '/api/application/users',
    {
      method: 'POST',
      body: JSON.stringify({
        external_id: String(input.externalUserId),
        email: input.email,
        username: input.username,
        first_name: input.firstName,
        last_name: input.lastName,
        password: input.password
      })
    }
  );

  return unwrapPterodactylAttributes(payload);
};

export const getPterodactylUserByExternalId = async (externalUserId: number): Promise<PterodactylUser | null> => {
  try {
    const payload = await pterodactylRequest<{ object: string; attributes: PterodactylUser }>(
      `/api/application/users/external/${externalUserId}`,
      { method: 'GET' }
    );

    return unwrapPterodactylAttributes(payload);
  } catch {
    return null;
  }
};
