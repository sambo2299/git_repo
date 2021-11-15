import * as React from 'react';

import MarkdownPreview from '@uiw/react-markdown-preview';

const detail = (props) => {
  // const detail = await props.getDetail(props.data.author, props.data.name);
  // console.log(props)
  let str = props.data.readMeContent;
  let buff = new Buffer(str, 'base64');
  let base64ToStringNew = buff.toString('ascii');
  return (
    <div>
      <div >
      <h2 style={{"display": "inline-block"}}>{props.data.name}</h2>      
      &nbsp;&nbsp;<a style={{"display": "inline-block"}} href={props.data.link} target="_blank" rel="noreferrer">link</a>
      </div>
      <div>
      <h3 style={{"display": "inline-block"}}>{props.data.userInfo.name ? props.data.userInfo.name : props.data.author}</h3> &nbsp;&nbsp;
      <a style={{"display": "inline-block"}} href={props.data.userInfo.link} target="_blank" rel="noreferrer">link</a>      
      </div>
      <p>open issues: {props.data.open_issues_count ? props.data.open_issues_count : 0}</p>
      <p>default branch : {props.data.default_branch}</p>
      <h4>README</h4>
      <MarkdownPreview source={base64ToStringNew} />

    </div>
  )
}
export default detail