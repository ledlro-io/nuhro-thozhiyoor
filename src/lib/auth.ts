import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "nuhro_thozhiyoor_super_secret_key_2026";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: { userId: string; username: string; role: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; username: string; role: string };
  } catch (error) {
    return null;
  }
}

export function getSessionUser(req: Request) {
  try {
    // Get cookies from header
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((c) => {
        const [k, v] = c.trim().split("=");
        return [k, decodeURIComponent(v)];
      })
    );

    const token = cookies["auth_token"];
    if (!token) return null;

    return verifyToken(token);
  } catch (error) {
    return null;
  }
}
