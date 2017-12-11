import React, { Component, ReactNode, ReactElement } from "react"
import cn from "classnames"
import "./style"

type TabsProps = { children: ReactElement<TabListProps | TabPanelsProps>[] }
type TabsState = { selectedIndex: number }
export class Tabs extends Component<TabsProps, TabsState> {
  state = {
    selectedIndex: 0,
  }
  selectTab = (selectedIndex: number) => {
    this.setState({ selectedIndex })
  }
  render() {
    const { children } = this.props
    const { selectedIndex } = this.state
    const mappedChildren = React.Children.map(children, (x: any) =>
      React.cloneElement(x, {
        selectedIndex,
        onSelectTab: this.selectTab,
      }),
    )
    return <div className="tabs">{mappedChildren}</div>
  }
}

type TabListProps = {
  selectedIndex?: number
  onSelectTab?: (index: number) => void
  children: ReactElement<TabProps>[]
}
export const TabList = ({
  selectedIndex = 0,
  onSelectTab = index => {},
  children,
}: TabListProps) => (
  <div className="tab-list">
    {React.Children.map(children, (x: any, index) =>
      React.cloneElement(x, {
        selected: selectedIndex === index,
        onSelect: () => onSelectTab(index),
      }),
    )}
  </div>
)

type TabProps = {
  disabled?: boolean
  selected?: boolean
  onSelect?: () => void
  children: React.ReactNode
}
export const Tab = ({
  disabled = false,
  selected = false,
  onSelect = () => {},
  children,
}: TabProps) => (
  <div
    className={cn("tab", { selected, disabled })}
    onClick={disabled ? undefined : onSelect}
  >
    {children}
  </div>
)

type TabPanelsProps = {
  selectedIndex?: number
  children: ReactElement<TabPanelProps>[]
}
export const TabPanels = ({ selectedIndex = 0, children }: TabPanelsProps) =>
  React.Children.toArray(children)[selectedIndex] as JSX.Element

type TabPanelProps = {
  children: ReactNode
}
export const TabPanel = ({ children }: TabPanelProps) => (
  <div className="tab-panel">{children}</div>
)
