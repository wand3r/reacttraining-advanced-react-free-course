import * as React from "react"
import { storiesOf } from "@storybook/react"
import { number, object } from "@storybook/addon-knobs"
import { ResponsiveBackgroundWithMedia } from "./responsive-background"

storiesOf("Tabs", module).add("ResponsiveBackground", () => (
  <div>
    <ResponsiveBackgroundWithMedia />
  </div>
))
