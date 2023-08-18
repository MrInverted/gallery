import path from "path"
import fs from "fs"
import formidable from "formidable";

const __dirname = path.resolve()

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req, res) {
  const form = formidable({
    uploadDir: (path.join(__dirname, 'public'))
  })

  form.parse(req, function (err, fields, files) {
    if (err) return res.json({ error: err });

    const { filepath, newFilename, originalFilename } = files.file[0]

    fs.renameSync(filepath, `${filepath}-${originalFilename}`)

    return res.json({ success: `${newFilename}-${originalFilename}` })
  })
}
