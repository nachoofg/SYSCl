import { cpuCurrentSpeed, cpuTemperature, cpu, currentLoad } from 'systeminformation'

export async function CPU() {
    return {
        CPU_Usage: (await currentLoad()).currentLoad.toFixed(0),
        CPU_speed: (await cpuCurrentSpeed()).avg,
        CPU_cores: (await cpu()).cores,
        CPU_temp: (await cpuTemperature()).main,
        CPU_model: (await cpu()).brand,
        CPU_activeCores: (await cpu()).efficiencyCores,
        CPU_brand: (await cpu()).manufacturer,
        CPU_processors: (await cpu()).processors,
        CPU_vendor: (await cpu()).vendor,
        CPU_physicalCores: (await cpu()).physicalCores,
        CPU_voltage: (await cpu()).voltage,
    }
}