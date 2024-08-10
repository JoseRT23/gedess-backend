import * as bcript from 'bcrypt';

const SALT_ROUNDS = 10;

export const bcriptAdapter = {
    hash: async(password: string): Promise<string> => {
        const salt = await bcript.genSalt(SALT_ROUNDS);
        const hash = await bcript.hash(password, salt);

        return hash;
    },
    compare: async(password: string, hash: string): Promise<boolean> => {
        return await bcript.compare(password, hash);
    }
}