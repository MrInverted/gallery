import { v4 as uuidv4 } from 'uuid'
import jwt from "jsonwebtoken"
import fs from "fs"
import path from "path"

const __dirname = path.resolve()
const dbPath = path.join(__dirname, "pages", "api", "users.txt")

export default function handler(req, res) {
  if (req.method.toUpperCase() === "POST") {
    const user = { login: req.body.login, password: req.body.password, id: uuidv4() }

    if (!req.body.login || !req.body.password) {
      return res.json({ error: "Fields are empty" })
    }

    try {
      const db = fs.readFileSync(dbPath, "utf-8")
      const parsed = JSON.parse(db)

      const checkExistance = parsed.filter(item => item.login === req.body.login)

      if (checkExistance.length > 0) {
        return res.json({ error: "User is already exists..." })
      }

      parsed.push(user)
      fs.writeFileSync(dbPath, JSON.stringify(parsed, null, 2), "utf-8")

      return res.json({ success: true })
    } catch (err) {
      return res.json({ error: err })
    }
  }

  if (req.method.toUpperCase() === "GET") {
    return res.json({ error: "Use POST method" })
  }
}