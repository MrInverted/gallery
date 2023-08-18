import path from "path"
import fs from "fs"

const __dirname = path.resolve()
const dbPath = path.join(__dirname, "pages", "api", "db.txt")

export default function handler(req, res) {

  if (req.method.toUpperCase() === "GET") {
    try {
      const data = fs.readFileSync(dbPath, "utf-8")
      return res.json({ success: JSON.parse(data) })
    } catch (err) {
      return res.status(500).json({ error: err })
    }
  }

  if (req.method.toUpperCase() === "POST") {
    const db = JSON.stringify(req.body, null, 2)

    try {
      fs.writeFileSync(dbPath, db, "utf-8")
      return res.json({ success: "DataBase has been updated" })
    } catch (err) {
      return res.status(500).json({ error: err })
    }
  }

  return res.json({ success: [] })
}