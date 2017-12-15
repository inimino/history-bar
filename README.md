# HistoryBar

A React component to render time series data (e.g. a revision history) as a horizontal SVG bar and allow clicking to select.

## Usage

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import HistoryBar from 'history-bar'

class MyReactApp extends React.Component(){
  constructor(){
    super()
    this.state={timestamp_data:[12,142,284,1392,1503]
               ,selected_index:null}
  }
  render(){
    const select_index_handler = (index) => this.setState({selected_index:index})
    return (
      <div className="something_to_style_me_by">
        <HistoryBar history={this.state.timestamp_data}
          onSelectIndex={select_index_handler} selectedIndex={this.state.selected_index}/>
      </div>
    )
  }
}
```

## Screenshot

![screenshot](/img/screenshot.png)
