export const createMediaQueryListener = <T extends { [p: string]: string }>(
  queries: T,
) => {
  type Status = Record<keyof T, boolean>
  let status = {}
  let listeners: ((status: Status) => void)[] = []

  const mqls = Object.keys(queries).map((queryName) => ({
    queryName,
    mql: window.matchMedia(queries[queryName]),
  }))

  const onMediaChange: MediaQueryListListener = ({ matches, media }) => {
    const queryName = Object.keys(queries).find(
      (queryName) => queries[queryName] === media,
    ) as string
    status = { ...status, [queryName]: matches }
    listeners.forEach((fn) => fn(<any>status))
  }

  mqls.forEach(({ mql }) => mql.addListener(onMediaChange))

  return {
    getCurrentStatus: () => status as Status,
    addListener: (fn: (status: Status) => void) => {
      listeners = [...listeners, fn]
    },
    removeListener: (fn: (status: Status) => void) => {
      listeners = listeners.filter((x) => x !== fn)
    },
    dispose: () => {
      mqls.forEach(({ mql }) => mql.removeListener(onMediaChange))
      listeners = []
    },
  }
}
