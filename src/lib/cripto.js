import crypto from 'node:crypto';

const hash = crypto.createHash('sha512').update(process.env.CRIPTO_CHAVE).digest();
const chave = hash.subarray(0, 32);
const iv = hash.subarray(32, 48);

export function criptografar(textoOriginal) {
    const cifra = crypto.createCipheriv('aes-256-cbc', chave, iv)
    return cifra.update(textoOriginal, 'utf8', 'hex') + cifra.final('hex');
}

export function descriptografar(textoCriptografado) {
    const decifra = crypto.createCipheriv('aes-256-cbc', chave, iv)
    return decifra.update(textoCriptografado, 'hex', 'utf8') + decifra.final('utf8')
}
