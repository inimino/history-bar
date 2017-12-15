import React from 'react'

export default HistoryBar

function HistoryBar(props){
  let svg_el
    , onSelectIndex=props.onSelectIndex
    , tss=props.history
    , scaled_tss,start,end,diff
    , selected_index=props.selectedIndex
    , highlight
    , scale_factor
  scale_factor = 0.900
  start = tss[0]
  end = tss[tss.length-1]
  diff=end-start
  scaled_tss=tss.map(normalize_value)
  highlight = selected_index==null ? null : tss[selected_index]
  return (
    <svg ref={el => svg_el=el} onClick={hb_click} height="20px" viewBox="0 0 1000 20" className="hb">
      <rect x="1" y="1" fill="black" height="18" width="998"/>
      <line y1="10" y2="10" x1="0" x2="1000" stroke="#888" strokeWidth="4"/>
      {scaled_tss.map((ts,i) => <rect key={i} x={1000*scale_factor*ts} y="6" fill="white" height="8" width="8"/>)}
      {highlight &&
        <rect x={1000*scale_factor*normalize_value(highlight)} y="6" fill="red" height="8" width="8"/>
      }
    </svg>
  )
  function hb_click(e){
    if(!onSelectIndex)return
    var rect=svg_el.getBoundingClientRect()
    //var x_offset = e.clientX - svg_el.offsetLeft
    var x_offset = e.clientX - rect.x
    var max_width = rect.width * scale_factor
    onSelectIndex(lookup_scaled(x_offset/max_width))
  }
  function normalize_value(ts){
    //return (ts-start)*scale // linear
    return 1 - Math.log(end-ts+1)/Math.log(diff+1) // log scale
  }
  function lookup_scaled(scaled_value){
    var index
    tss.some(function(ts,i){
      if(normalize_value(ts) <= scaled_value) {
        index = i
        return false}
      else return true
    })
    return index
  }
}


