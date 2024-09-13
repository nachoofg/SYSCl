import NV from 'node-nvidia-smi';

export function nvidia() {
    return new Promise((resolve, reject) => {
        NV((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    nvidia: true,
                    nvidia_name: data.nvidia_smi_log.gpu.product_name,
                    nvidia_fan: Number(data.nvidia_smi_log.gpu.fan_speed.split(' ')[0]),
                    nvidia_mem_total: Number(data.nvidia_smi_log.gpu.fb_memory_usage.total.split(' ')[0]),
                    nvidia_mem_used: Number(data.nvidia_smi_log.gpu.fb_memory_usage.used.split(' ')[0]),
                    nvidia_mem_free: Number(data.nvidia_smi_log.gpu.fb_memory_usage.free.split(' ')[0]),
                    nvidia_mem_percent: Number(data.nvidia_smi_log.gpu.utilization.memory_util.split(' ')[0]),
                    nvidia_load: Number(data.nvidia_smi_log.gpu.utilization.gpu_util.split(' ')[0]),
                    nvidia_temp: Number(data.nvidia_smi_log.gpu.temperature.gpu_temp.split(' ')[0]),
                });
            }
        });
    });
}
