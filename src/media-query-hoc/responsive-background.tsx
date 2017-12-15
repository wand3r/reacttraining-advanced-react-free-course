import React, { Component } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { withMedia, MediaProp } from "./with-media-hoc"
import "./style"

const mediaQueries = {
  big: "(min-width: 1200px)",
  tiny: "(max-width: 800px)",
}

type ResponsiveBackgroundProps = { media: MediaProp<typeof mediaQueries> }
export const ResponsiveBackground = ({
  media = "medium",
}: ResponsiveBackgroundProps) => {
  const imgForMedia = {
    big: "/cosmos.jpg",
    tiny: "/sky-from-earth.jpg",
    medium: "/earth.jpg",
  }
  return (
    <div className="responsive-background">
      <TransitionGroup>
        <CSSTransition key={media} classNames="fade" timeout={1000}>
          <img src={imgForMedia[media]} />
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export const ResponsiveBackgroundWithMedia = withMedia(mediaQueries)(
  ResponsiveBackground,
)
