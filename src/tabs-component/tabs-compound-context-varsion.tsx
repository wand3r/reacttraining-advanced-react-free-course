import React, { Component, ReactNode, ReactElement, SFC } from "react"
import * as PropTypes from "prop-types"
import cn from "classnames"
import "./style"

type ValidationMap<T> = { [K in keyof T]: PropTypes.Validator<T> }

type TabsProps = {}
type TabsState = { selectedIndex: number }
type TabsContext = {
  selectedIndex: number
  onSelectTab: (index: number) => void
}
export class Tabs extends Component<TabsProps, TabsState> {
  static childContextTypes: ValidationMap<TabsContext> = {
    selectedIndex: PropTypes.number.isRequired,
    onSelectTab: PropTypes.func.isRequired,
  }
  getChildContext = (): TabsContext => ({
    selectedIndex: this.state.selectedIndex,
    onSelectTab: this.selectTab,
  })
  state = {
    selectedIndex: 0,
  }
  selectTab = (selectedIndex: number) => {
    this.setState({ selectedIndex })
  }
  render() {
    const { children } = this.props
    return <div className="tabs">{children}</div>
  }
}

type TabListProps = {
  children: ReactNode
}
type TabListContext = TabsContext
export const TabList: SFC<TabListProps> = (
  { children },
  { selectedIndex, onSelectTab }: TabListContext,
) => (
  <div className="tab-list">
    {React.Children.map(children, (x: any, index) =>
      React.cloneElement(x, {
        selected: selectedIndex === index,
        onSelect: () => onSelectTab(index),
      }),
    )}
  </div>
)
TabList.contextTypes = {
  selectedIndex: PropTypes.number.isRequired,
  onSelectTab: PropTypes.func.isRequired,
} as ValidationMap<TabListContext>

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
  children: ReactNode
}
type TabPanelsContext = Pick<TabsContext, "selectedIndex">
export const TabPanels: SFC<TabPanelsProps> = (
  { children }: TabPanelsProps,
  { selectedIndex }: TabPanelsContext,
) => React.Children.toArray(children)[selectedIndex] as JSX.Element
TabPanels.contextTypes = {
  selectedIndex: PropTypes.number.isRequired,
} as ValidationMap<TabPanelsContext>

type TabPanelProps = {
  children: ReactNode
}
export const TabPanel: SFC<TabPanelProps> = ({ children }) => (
  <div className="tab-panel">{children}</div>
)
