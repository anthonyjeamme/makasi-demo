import { TConnector } from 'makasi-core'

export const IndexedDBConnector = (): TConnector => {
  const getPage = async (id: string) => {
    return new Promise(async (resolve, reject) => {
      const transaction = await getPageStore()
      const queryStore = transaction.objectStore('page')

      const req = queryStore.get(id)

      transaction.oncomplete = (e) => {
        resolve(req.result)
      }
      transaction.onerror = () => {
        reject()
      }
    })
  }

  const getPages = async () => {
    return new Promise(async (resolve, reject) => {
      const transaction = await getPageStore()
      const queryStore = transaction.objectStore('page')

      const req = queryStore.getAll()

      transaction.oncomplete = (e) => {
        resolve(req.result)
      }
    })
  }

  const updatePage = async (data: any) => {
    return new Promise(async (resolve, reject) => {
      const transaction = await getPageStore()
      const queryStore = transaction.objectStore('page')

      const req = queryStore.put(data)

      transaction.oncomplete = (e) => {
        resolve(req.result)
      }
      transaction.onerror = () => {
        reject()
      }
    })
  }

  const removePage = async (id: string) => {
    return new Promise(async (resolve, reject) => {
      const transaction = await getPageStore()
      const queryStore = transaction.objectStore('page')

      const req = queryStore.delete(id)

      transaction.oncomplete = (e) => {
        resolve(req.result)
      }
      transaction.onerror = () => {
        reject()
      }
    })
  }

  const addPage = async (data: any) => {
    const transaction = await getPageStore()
    const queryStore = transaction.objectStore('query')

    queryStore.put({
      ...data
    })
  }
  return {
    getPage,
    getPages,
    updatePage,
    removePage,
    addPage
  }
}

const getPageStore = async () => {
  const db = await getIndexedDB('website')

  //   console.log(objectStore)
  return db.transaction('page', 'readwrite')
}

const getIndexedDB = (name: string): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    var indexedDB: IDBFactory = window.indexedDB

    var request = indexedDB.open(name, 3)

    request.onerror = function (evt) {
      // @ts-ignore
      reject(evt.target.errorCode)
    }
    request.onsuccess = function (evt) {
      resolve(request.result)
    }
    request.onupgradeneeded = function (evt) {
      const db = request.result

      if (db.objectStoreNames.contains('query')) db.deleteObjectStore('query')
      console.log('onupgradeneeded')
      db.createObjectStore('query', {
        keyPath: 'id'
      })
    }
  })
