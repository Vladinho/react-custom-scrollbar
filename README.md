
# react-custom-scrollbar-package

## Overview

`react-custom-scrollbar-package` is a React component that provides a customizable scrollbar. This component allows you to easily add custom scrollbars to your React applications, with support for vertical and horizontal scrollbars. It is built using TypeScript and styled-components, ensuring type safety and easy styling.

## Installation

To install the package, you can use npm or yarn:

```bash
npm install react-custom-scrollbar-package
```

or

```bash
yarn add react-custom-scrollbar-package
```

## Props

- **`children`** (`React.ReactNode`): The content to be wrapped by the custom scrollbar.
- **`isVerticalHidden`** (`boolean`, default: `false`): Hide the vertical scrollbar.
- **`isHorizontalHidden`** (`boolean`, default: `false`): Hide the horizontal scrollbar.
- **`sx`** (`object`): Additional styles for the scrollbar container.
- **`deps`** (`any[]`, default: `[]`): Dependencies to recalculate scrollbar visibility and dimensions.
- **`cssClassPrefix`** (`string`, default: `'customScrollbar'`): Prefix for CSS classes applied to scrollbar elements.

## Usage

Here is an example of how to use the `CustomScrollbar` component in your project:

### Basic Example

```jsx
import React from 'react';
import CustomScrollbar from 'react-custom-scrollbar-package';

const App = () => {
  return (
    <CustomScrollbar>
      <div style={{ height: '200px', width: '100%' }}>
        <p>Your content goes here...</p>
        <p>More content...</p>
        <p>Even more content...</p>
        <p>Lots of content...</p>
        <p>Content keeps going...</p>
      </div>
    </CustomScrollbar>
  );
};

export default App;
```

### Advanced Example with Custom Styling

```jsx
import React from 'react';
import CustomScrollbar from 'react-custom-scrollbar-package';
import styled from 'styled-components';

const CustomStyledScrollbar = styled(CustomScrollbar)`
  &.customScrollbar__vertical-route {
    background-color: #e0e0e0;
  }
  &.customScrollbar__vertical-thump {
    background-color: #888;
  }
  &.customScrollbar__horizontal-route {
    background-color: #e0e0e0;
  }
  &.customScrollbar__horizontal-thump {
    background-color: #888;
  }
`;

const App = () => {
  return (
    <CustomStyledScrollbar>
      <div style={{ height: '200px', width: '100%' }}>
        <p>Your content goes here...</p>
        <p>More content...</p>
        <p>Even more content...</p>
        <p>Lots of content...</p>
        <p>Content keeps going...</p>
      </div>
    </CustomStyledScrollbar>
  );
};

export default App;
```
