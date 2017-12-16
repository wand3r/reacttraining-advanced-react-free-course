import React from "react"
import { storiesOf } from "@storybook/react"
import { number, object } from "@storybook/addon-knobs"
import { ResponsiveBackgroundWithMedia } from "./responsive-background"

storiesOf("ResponsiveBackground", module).add("default", () => (
  <div>
    <ResponsiveBackgroundWithMedia />
  </div>
))
