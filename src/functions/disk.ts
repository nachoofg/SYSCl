import { fsSize } from "systeminformation";

function formatSize(sizeInGB: number): string {
    if (sizeInGB >= 1024) {
        return `${(sizeInGB / 1024).toFixed(1)} TB`;
    } else {
        return `${sizeInGB} GB`;
    }
}

export async function disk() {
    const disks = await fsSize();
    const results = disks.map((item, index) => {
        const totalGB = Math.round(item.size / Math.pow(1024, 3));
        const usedGB = Math.round(item.used / Math.pow(1024, 3));
        const totalFormatted = formatSize(totalGB);
        return `(Disk ${index + 1} (${item.fs}): ${usedGB}/${totalFormatted})`;
    });
    
    return results.join(' ');
}

