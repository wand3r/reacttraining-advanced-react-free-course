import React from "react"
import { storiesOf } from "@storybook/react"
import * as k from "@storybook/addon-knobs"
import { StickyHeader } from "./sticky-header"

storiesOf("StickyHeader", module).add("default", () => (
  <div style={{ height: 3500 }}>
    <div style={{ height: 200 }} />
    <StickyHeader text={k.text("header", "Hello")} />
  </div>
))
