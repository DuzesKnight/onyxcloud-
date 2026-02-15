import { AppError } from '../../utils/errors';
import { pterodactylConfig } from '../../config/pterodactyl';

interface PterodactylResponse<T> {
  object: string;
  attributes: T;
}

const buildUrl = (path: string): string => `${pterodactylConfig.baseUrl.replace(/\/$/, '')}${path}`;

const safeJsonParse = (raw: string): unknown => {
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const pterodactylRequest = async <T>(path: string, init: RequestInit): Promise<T> => {
  let response: Response;

  try {
    response = await fetch(buildUrl(path), {
      ...init,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${pterodactylConfig.apiKey}`,
        ...init.headers
      }
    });
  } catch {
    throw new AppError('Unable to connect to Pterodactyl API', 502);
  }

  const raw = await response.text();
  const data = safeJsonParse(raw) as any;

  if (!response.ok) {
    const errorDetail = data?.errors?.[0]?.detail ?? response.statusText;
    throw new AppError(`Pterodactyl API error: ${errorDetail}`, 502);
  }

  return data as T;
};

export const unwrapPterodactylAttributes = <T>(payload: PterodactylResponse<T>): T => payload.attributes;
