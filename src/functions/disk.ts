import { fsSize } from "systeminformation";
export async function disk() {
    var tt
    var uss
    var perr
    (await fsSize()).map((item) => {
        tt = Math.round(item.size / Math.pow(1024, 3)),
            uss = Math.round(item.used / Math.pow(1024, 3)),
            perr = Math.round(item.use)
    })
    return {
        total: tt,
        used: uss,
        percent: perr
    }
}