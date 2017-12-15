export const createMediaQueryListener = <T extends { [p: string]: string }>(
  queries: T,
) => {
  type Status = keyof T | undefined
  let currentState: Record<string, boolean> = {}
  let listeners: ((status: Status) => void)[] = []

  const mqls = Object.keys(queries).map((queryName) => ({
    queryName,
    mql: window.matchMedia(queries[queryName]),
  }))

  const onMediaChange: MediaQueryListListener = ({ matches, media }) => {
    const queryName = Object.keys(queries).find(
      (queryName) => queries[queryName] === media,
    ) as string
    currentState = { ...currentState, [queryName]: matches }
    listeners.forEach((fn) => fn(convertStateToStatus(currentState)))
  }

  mqls.forEach(({ mql }) => mql.addListener(onMediaChange))

  const convertStateToStatus = (state: Record<string, boolean>): Status => {
    const current = Object.entries(state).find(([key, value]) => value)
    return current ? current[0] : undefined
  }

  return {
    getCurrentStatus: () => convertStateToStatus(currentState),
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
