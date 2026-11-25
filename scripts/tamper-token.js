// Demo helper untuk percobaan Tugas 9: mengubah payload JWT tanpa menandatangani ulang.
// Gunakan hanya token demo milik sendiri. Signature asli sengaja dipertahankan,
// sehingga jwt.verify() pada server harus menolak token ini.
const token = process.argv[2];
if (!token) {
  console.error('Penggunaan: node scripts/tamper-token.js "JWT_TOKEN"');
  process.exit(1);
}
const parts = token.trim().split('.');
if (parts.length !== 3) {
  console.error('Token bukan format JWT tiga bagian.');
  process.exit(1);
}
try {
  const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
  payload.id = 999999;
  parts[1] = Buffer.from(JSON.stringify(payload)).toString('base64url');
  // parts[2] signature tetap memakai signature token asli
  console.log('JWT hasil manipulasi (signature asli dipertahankan):');
  console.log(parts.join('.'));
} catch (e) {
  console.error('Payload JWT gagal dibaca:', e.message);
  process.exit(1);
}
