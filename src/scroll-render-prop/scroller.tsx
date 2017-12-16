import React, { Component } from "react"

const getScrollPosition = () => ({
  x: window.pageXOffset | document.documentElement.scrollLeft,
  y: window.pageYOffset | document.documentElement.scrollTop,
})

type ScrollerProps = { render: (yPos: number) => JSX.Element }

type ScrollerState = { yPos: number }

export class Scroller extends Component<ScrollerProps, ScrollerState> {
  state = { yPos: 0 }

  componentDidMount() {
    this.handleWindowScroll()
    window.addEventListener("scroll", this.handleWindowScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleWindowScroll)
  }

  handleWindowScroll = () => {
    this.setState({ yPos: getScrollPosition().y })
  }

  render() {
    const { render } = this.props
    const { yPos } = this.state
    return render(yPos)
  }
}
