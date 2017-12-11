import React, { Component, ComponentType } from "react"
import { createMediaQueryListener } from "./media-query-listener"

type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T]

type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>

export const withMedia = <T extends { [p: string]: string }>(media: T) => <
  P extends { media: Record<keyof T, boolean> }
>(
  Comp: ComponentType<P>,
) => {
  const mediaListener = createMediaQueryListener(media)
  return class WithMediaHOC extends Component<
    Omit<P, "media">,
    { media: Record<keyof T, boolean> }
  > {
    state = {
      media: mediaListener.getCurrentStatus(),
    }
    componentDidMount() {
      mediaListener.addListener((media) => this.setState({ media }))
    }
    componentWillUnmount() {
      mediaListener.dispose()
    }
    render() {
      const { media } = this.state
      return <Comp {...this.props} media={media} />
    }
  }
}
