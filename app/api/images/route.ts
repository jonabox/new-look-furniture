import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

function isUuidLike(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function toTitleCase(value: string) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function toLabel(fileName: string, index: number) {
  const baseName = fileName.replace(/\.[^/.]+$/, "").trim();

  if (isUuidLike(baseName)) {
    return `Trabajo ${String(index + 1).padStart(2, "0")}`;
  }

  const cleaned = baseName
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return `Trabajo ${String(index + 1).padStart(2, "0")}`;
  }

  return toTitleCase(cleaned);
}

export async function GET() {
  try {
    const imagesDirectory = path.join(process.cwd(), "public", "images");
    const files = await fs.readdir(imagesDirectory, { withFileTypes: true });

    const images = files
      .filter((file) => file.isFile())
      .map((file) => file.name)
      .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
      .map((name, index) => ({
        src: `/images/${name}`,
        label: toLabel(name, index),
      }));

    return NextResponse.json(images);
  } catch {
    return NextResponse.json([]);
  }
}
