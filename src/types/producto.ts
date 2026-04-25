export interface Producto {
    id: number
    nombre: string
    descripcion?: string
    precio_base: number
    imagen_url?: string
    stock_cantidad: number
    disponible: boolean
    created_at?: string
    updated_at?: string
    deleted_at?: string | null
    activo?: boolean
    categorias_ids?: number[]
}

export type EntityType = 'producto'