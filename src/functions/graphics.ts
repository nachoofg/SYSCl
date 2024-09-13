import { graphics } from "systeminformation";

export async function GR() {
    if ((await graphics()).controllers.length > 0) return {
        gfxname: (await graphics()).controllers[0].model,
        gfxram: Math.round((await graphics()).controllers[0].vram / 1024)
    }
    return {
        gfxname: '',
        gfxram: 0
    }
}