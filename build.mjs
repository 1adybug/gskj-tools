import { execSync } from "child_process"
import { rmSync } from "fs"

try {
    rmSync("./dist", { recursive: true })
} catch (error) {}

execSync("npx tsc --sourceMap -module ES2020 -outDir dist/esm && npx tsc --sourceMap -module CommonJS -outDir dist/cjs && npx tsc --declaration --emitDeclarationOnly -outDir dist")
