import { SignJWT } from 'jose';
import fs from 'fs/promises';

async function generate() {
  const teamId = '86S486L7XB';          // ← from Apple Developer > Membership (10 chars)
  const keyId = '3DV6RA4Z39';            // ← the Key ID you created (10 chars)
  const clientId = 'dev.pages.app-edgehaven'; // ← the Services ID you created
  const privateKeyPem = await fs.readFile('AuthKey_3DV6RA4Z39.p8', 'utf8'); // ← your downloaded .p8 file

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: teamId,
    iat: now,
    exp: now + 15778800, // 6 months
    aud: 'https://appleid.apple.com',
    sub: clientId,
  };

  const secret = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'ES256', kid: keyId })
    .sign(await import('jose').then(j => j.importPKCS8(privateKeyPem, 'ES256')));

  console.log('\n✅ YOUR AUTH_APPLE_SECRET IS READY:\n');
  console.log(secret);
  console.log('\nCopy everything above and add it to your .dev.vars file');
}

generate().catch(console.error);