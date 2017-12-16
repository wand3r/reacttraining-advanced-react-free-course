import React, { SFC } from "react"
import { Scroller } from "./scroller"
import "./style"

type StickyHeaderProps = { text: string }

export const StickyHeader: SFC<StickyHeaderProps> = ({ text }) => {
  let h1Elem: HTMLDivElement | null = null
  const getStyle = (y: number, marginTop = 10) => {
    if (!h1Elem) return {}
    const { top } = h1Elem.getBoundingClientRect()
    const isSticked = top <= marginTop
    return {
      position: isSticked ? ("fixed" as "fixed") : ("static" as "static"),
      top: 0,
      textShadow: isSticked
        ? `0px ${(y - 100) / 5}px ${Math.min(
            (y - 100) / 10,
            50,
          )}px rgba(0,0,0,0.5)`
        : "none",
    }
  }
  return (
    <div className="stickyheader" ref={(c) => (h1Elem = c)}>
      <Scroller render={(yPos) => <h1 style={getStyle(yPos)}>{text}</h1>} />
    </div>
  )
}
