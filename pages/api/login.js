import { v4 as uuidv4 } from 'uuid'
import jwt from "jsonwebtoken"
import fs from "fs"
import path from "path"

const __dirname = path.resolve()
const dbPath = path.join(__dirname, "pages", "api", "users.txt")

export default function handler(req, res) {

  if (req.method.toUpperCase() === "POST") {
    try {
      const db = fs.readFileSync(dbPath, "utf-8")
      const parsed = JSON.parse(db)

      const user = parsed.find(item => {
        return (item.login === req.body.login && item.password === req.body.password)
      })

      if (!user) return res.json({ error: "User is not found..." })

      const token = jwt.sign(user, 'secret')

      return res
        .setHeader('Set-Cookie', `token=${token}; Path=/`)
        .json({ success: true })

    } catch (err) {
      return res.json({ error: err })
    }
  }

  if (req.method.toUpperCase() === "GET") {
    return res.json({ error: "Use POST method" })
  }
}