export type Synchronizer<T> = {
    value: T
    subscribe?: (update: (value: T) => void, key: string) => void
    getSnapshot: (key: string) => T | Promise<T>
    update: (value: T, key: string) => void
}

export type ActionKey<K> = `set${Capitalize<K & string>}`
export type Actions<TState extends object> =
    & { [K in keyof TState as ActionKey<K>]: (value: TState[K] | ((prevState: TState[K]) => TState[K])) => void }
    & {}
export type Dispatch<TState extends object, TKeys extends keyof TState> = TState[TKeys] | ((prevState: TState[TKeys]) => TState[TKeys])

export type StorageOptions<T> = {
    storageKey?: string
    deserialize?: (value: string) => T
    serialize?: (value: T) => string
}

export type Storage = {
    <T>(initialValue: T, options?: StorageOptions<T>): T
    <T>(initialValue?: T, options?: StorageOptions<T>): T | undefined
}
