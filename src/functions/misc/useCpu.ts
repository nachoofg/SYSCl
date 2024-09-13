import { green, yellow, red } from 'colors'

export function useCpuColoration(value: number) {
    if (value >= 1 && value < 50) { return green(`${value}`); }
    else if (value >= 50 && value < 80) { return yellow(`${value}`); }
    else if (value >= 80) { return red(`${value}`); }
}