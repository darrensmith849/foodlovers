import { Platform } from 'react-native'
import type { StateStorage } from 'zustand/middleware'

function createStorage(): StateStorage {
  if (Platform.OS === 'web') {
    return {
      getItem: (name) => {
        try { return localStorage.getItem(name) } catch { return null }
      },
      setItem: (name, value) => {
        try { localStorage.setItem(name, value) } catch {}
      },
      removeItem: (name) => {
        try { localStorage.removeItem(name) } catch {}
      },
    }
  }

  const { MMKV } = require('react-native-mmkv')
  const mmkv = new MMKV({ id: 'foodlovers-storage' })
  return {
    getItem: (name: string) => mmkv.getString(name) ?? null,
    setItem: (name: string, value: string) => mmkv.set(name, value),
    removeItem: (name: string) => mmkv.delete(name),
  }
}

export const mmkvStorage: StateStorage = createStorage()
