import formidable from "formidable";
import mime from "mime";
var fs = require("fs");

export interface File {
  size: number;
  filepath: string;
  originalFilename: string | null;
  newFilename: string | null;
  mimetype: string | null;
  mtime: Date | null;
  hashAlgorithm: false | "sha1" | "md5" | "sha256";
  hash: string | object | null;
}

export default function formMiddleWare(req: any, res: any, next: any) {
  const form = formidable({
    maxFileSize: 1024 * 1024,
    uploadDir: "./public/",
    filter: (part) => {
      return (
        part.name === "media" && (part.mimetype?.includes("image") || false)
      );
    },
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    req.fields = fields;
    req.files = files;
    const file = files.media as File;
    console.log(file.filepath);
    fs.rename(
      file.filepath,
      `./public/products/${fields.name}.${
        mime.getExtension(file.mimetype || "") || "unknown"
      }`,
      (error: any) => {
        if (error) console.log(error);
      }
    );
  });
}
