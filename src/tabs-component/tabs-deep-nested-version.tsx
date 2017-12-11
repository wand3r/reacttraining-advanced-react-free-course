import * as React from "react"
import { ReactNode } from "react"
import cn from "classnames"
import "./style"

type TabsProps = {
  data: { header: React.ReactNode; panel: React.ReactNode }[]
  disabledIndexes: number[]
}
type TabsState = { selectedIndex: number }
export class Tabs extends React.Component<TabsProps, TabsState> {
  state = {
    selectedIndex: 0,
  }
  onSelectTab = (selectedIndex: number) => {
    this.setState({ selectedIndex })
  }
  render() {
    const { data, disabledIndexes } = this.props
    const { selectedIndex } = this.state
    return (
      <div className="tabs">
        <TabList
          disabledIndexes={disabledIndexes}
          selectedIndex={selectedIndex}
          tabs={data.map((x) => x.header)}
          onSelectTab={this.onSelectTab}
        />
        <TabPanel>{data[selectedIndex].panel}</TabPanel>
      </div>
    )
  }
}

type TabListProps = {
  tabs: React.ReactNode[]
  selectedIndex: number
  disabledIndexes: number[]
  onSelectTab: (index: number) => void
}
const TabList = ({
  tabs,
  selectedIndex,
  disabledIndexes,
  onSelectTab,
}: TabListProps) => (
  <div className="tab-list">
    {tabs.map((tab, index) => (
      <Tab
        key={index}
        selected={index === selectedIndex}
        disabled={disabledIndexes.includes(index)}
        onSelect={() => onSelectTab(index)}
      >
        {tab}
      </Tab>
    ))}
  </div>
)

type TabProps = {
  disabled: boolean
  selected: boolean
  onSelect: () => void
  children: React.ReactNode
}
const Tab = ({ onSelect, disabled, selected, children }: TabProps) => (
  <div
    className={cn("tab", { selected, disabled })}
    onClick={disabled ? undefined : onSelect}
  >
    {children}
  </div>
)

const TabPanel = ({ children }: { children: ReactNode }) => (
  <div className="tab-panel">{children}</div>
)
