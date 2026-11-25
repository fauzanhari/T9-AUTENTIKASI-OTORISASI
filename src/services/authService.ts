import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userData } from "../data/userData";
import { AppError } from "../utils/errors";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET belum diatur pada file .env");
}

export const authService = {
  async register(input: { email: string; password: string }) {
    const email = input.email.trim().toLowerCase();
    const existing = await userData.findByEmail(email);
    if (existing)
      throw new AppError(409, "Email sudah terdaftar", "EMAIL_DUPLIKAT");

    const passwordHash = await bcrypt.hash(input.password, 10);
    try {
      return await userData.create({ email, passwordHash });
    } catch (err: any) {
      if (err?.code === "P2002")
        throw new AppError(409, "Email sudah terdaftar", "EMAIL_DUPLIKAT");
      throw err;
    }
  },

  async login(input: { email: string; password: string }) {
    const email = input.email.trim().toLowerCase();
    const user = await userData.findByEmail(email);
    if (!user)
      throw new AppError(401, "Email atau password salah", "LOGIN_GAGAL");

    const cocok = await bcrypt.compare(input.password, user.passwordHash);
    if (!cocok)
      throw new AppError(401, "Email atau password salah", "LOGIN_GAGAL");

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "2h" });
    return { token };
  },

  async saya(id: number) {
    const user = await userData.findPublicById(id);
    if (!user)
      throw new AppError(401, "Token tidak valid", "TOKEN_TIDAK_VALID");
    return user;
  },
};
