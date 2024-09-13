import { mem } from "systeminformation";

export async function MEM() {
    return {
        free: Number(((await mem()).free / Math.pow(1024, 3)).toFixed(1)),
        used: Number(((await mem()).used / Math.pow(1024, 3)).toFixed(1)),
        total: Number(((await mem()).total / Math.pow(1024, 3)).toFixed(1)),
    }
}