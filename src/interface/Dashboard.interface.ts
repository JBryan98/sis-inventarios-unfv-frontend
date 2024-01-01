export interface HardwareDashboard {
    estado: EstadoCount;
    top5HardwareByModelo: Top5ByModelo[];
    top5HardwareByMarca: Top5ByMarca[];
}

export interface EquiposTrabajoDashboard {
    estado: EstadoCount;
    top5EquiposTrabajoByModelo: Top5ByModelo[];
    top5EquiposTrabajoByMarca: Top5ByMarca[];
}

export interface EquiposDashboard {
    estado: EstadoCount;
    top5FacultadesByEquiposCount: Top5ByFacultadesByEquipoCount[];
    countEquiposBySistemaOperativo: EquiposCountBySistemaOperativo[];
}

export interface EstadoCount {
    stock: number;
    mantenimiento: number;
    baja: number;
    operativo: number;
}

export interface Top5ByModelo {
    modelo: string;
    subcategoria: string;
    marca: string;
    cantidad: number;
}

export interface Top5ByMarca {
    marca: string;
    cantidad: number;
}

export interface Top5ByFacultadesByEquipoCount {
    nombre: string;
    cantidad: number;
}

export interface EquiposCountBySistemaOperativo {
    nombre: string;
    cantidad: number;
}