import * as React from "react"
import { storiesOf } from "@storybook/react"
import {} from "@storybook/addon-knobs"
import { Tabs as TabsDeepNested } from "./tabs-deep-nested-version"
import * as TabsCE from "./tabs-compound-clone-element-version"
import * as TabsC from "./tabs-compound-context-varsion"
import { MistletoeIcon, SnowflakeIcon, SnowmanIcon } from "./icons"

const tabsData: { header: React.ReactNode; panel: React.ReactNode }[] = [
  { header: <SnowflakeIcon />, panel: "panel 1" },
  { header: <SnowmanIcon />, panel: "panel 2" },
  { header: <MistletoeIcon />, panel: "panel 3" },
]

storiesOf("Tabs", module)
  .add("with deep nested components", () => (
    <TabsDeepNested data={tabsData} disabledIndexes={[1]} />
  ))
  .add("with compound components using clone element", () => (
    <TabsCE.Tabs>
      <TabsCE.TabList>
        <TabsCE.Tab>
          <SnowflakeIcon />
        </TabsCE.Tab>
        <TabsCE.Tab disabled>
          <SnowmanIcon />
        </TabsCE.Tab>
        <TabsCE.Tab>
          <MistletoeIcon />
        </TabsCE.Tab>
      </TabsCE.TabList>
      <TabsCE.TabPanels>
        <TabsCE.TabPanel>panel 1</TabsCE.TabPanel>
        <TabsCE.TabPanel>panel 2</TabsCE.TabPanel>
        <TabsCE.TabPanel>panel 3</TabsCE.TabPanel>
      </TabsCE.TabPanels>
    </TabsCE.Tabs>
  ))
  .add("with compound components using context", () => (
    <TabsC.Tabs>
      <TabsC.TabList>
        <TabsC.Tab>
          <SnowflakeIcon />
        </TabsC.Tab>
        <TabsC.Tab disabled>
          <SnowmanIcon />
        </TabsC.Tab>
        <TabsC.Tab>
          <MistletoeIcon />
        </TabsC.Tab>
      </TabsC.TabList>
      <TabsC.TabPanels>
        <TabsC.TabPanel>panel 1</TabsC.TabPanel>
        <TabsC.TabPanel>panel 2</TabsC.TabPanel>
        <TabsC.TabPanel>panel 3</TabsC.TabPanel>
      </TabsC.TabPanels>
    </TabsC.Tabs>
  ))
