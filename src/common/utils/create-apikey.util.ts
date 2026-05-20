import crypto from 'crypto';

export function CreateAPIKey(): string {
    const randomKey = crypto.randomBytes(24).toString('hex');

    return `slcity_${randomKey}`;
}