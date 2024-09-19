import { CPU } from "./functions/cpu";
import { MEM } from "./functions/ram";
import { GR } from "./functions/graphics";
import { nvidia } from "./functions/nvidia";
import { disk } from "./functions/disk";
import blessed from 'blessed';

const screen = blessed.screen({
    smartCSR: true,
    title: 'System Monitor'
});

const table = blessed.listtable({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '90%',
    height: '90%',
    align: 'center',
    keys: true,
    vi: true,
    mouse: true,
    border: { type: 'line' },
    style: {
        header: { fg: 'white', bold: true },
        cell: { fg: 'green' }
    }
});

let staticData = [];

async function getStaticData() {
    const cpu = await CPU();
    const graphicsInfo = await GR();
    const diskInfo = await disk()
    staticData = [
        ['CPU Model', `${cpu.CPU_model}`],
        ['CPU Brand', `${cpu.CPU_brand}`],
        ['CPU Cores', `${cpu.CPU_cores}`],
        //@ts-ignore
        ['Graphics Card', `${graphicsInfo.gfxname}`],
        ['Graphics RAM (GB)', `${graphicsInfo.gfxram}`],
        ['Disks', `${diskInfo.toString()}`]
    ];
}

async function updateDynamicData() {
    try {
        const [cpu, mem, gpu] = await Promise.all([
            CPU(),
            MEM(),
            nvidia()
        ]);

        table.setData([
            ...staticData,
            ['CPU Usage (%)', `${cpu.CPU_Usage}%`],
            ['CPU Speed (GHz)', `${cpu.CPU_speed}`],
            ['Memory Free (GB)', `${mem.free}`],
            ['Memory Used (GB)', `${mem.used} GB / ${mem.total} GB`],
            //@ts-ignore
            ['GPU Usage (%)', `${gpu.nvidia_load}%`],
            //@ts-ignore
            ['GPU Temp (°C)', `${gpu.nvidia_temp}°C`],
        ]);

        screen.render();
    } catch (error) {
        console.error('Error al obtener info:', error);
    }
}

async function init() {
    await getStaticData();
    updateDynamicData();
    setInterval(updateDynamicData, 10000);
}

screen.key(['q', 'C-c'], function () {
    return process.exit(0);
});

init();
screen.render();
