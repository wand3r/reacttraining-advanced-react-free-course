import React, { Component } from "react"
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "./tabs-compound-context-varsion"
import { MistletoeIcon, SnowflakeIcon, SnowmanIcon } from "./icons"

type TabsControlledProps = {}

type TabsControlledState = { selectedTabIndex: number }

export class TabsControlled extends Component<
  TabsControlledProps,
  TabsControlledState
> {
  state = { selectedTabIndex: 0 }

  handleTabChange = (index: number) => {
    this.setState({ selectedTabIndex: index })
  }
  render() {
    const { selectedTabIndex } = this.state
    return (
      <Tabs
        selectedIndex={selectedTabIndex}
        onSelectedIndexChange={this.handleTabChange}
      >
        <TabList>
          <Tab>
            <SnowflakeIcon />
          </Tab>
          <Tab disabled>
            <SnowmanIcon />
          </Tab>
          <Tab>
            <MistletoeIcon />
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            panel 1
            <button onClick={() => this.setState({ selectedTabIndex: 2 })}>
              Go to last tab
            </button>
          </TabPanel>
          <TabPanel>panel 2</TabPanel>
          <TabPanel>panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    )
  }
}
