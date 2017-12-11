import React, { Component } from "react"
import { withMedia } from "./with-media-hoc"

const media = {
  big: "(min-width: 1000px)",
  tiny: "(max-width: 600px)",
}

export class ResponsiveBackground extends Component<{
  media: Record<keyof typeof media, boolean>
}> {
  render() {
    const { media } = this.props
    return (
      <div>
        {media.big ? (
          <div>Something big</div>
        ) : media.tiny ? (
          <div>Something tiny</div>
        ) : (
          <div>Something medium</div>
        )}
      </div>
    )
  }
}

export const ResponsiveBackgroundWithMedia = withMedia(media)(
  ResponsiveBackground,
)
