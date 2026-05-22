import{j as k}from"./jsx-runtime-D_zvdyIk.js";function f({variant:m="secondary",children:u,style:g,...y}){const h={primary:{background:"#4f46e5",color:"#fff"},secondary:{background:"#2a2a4a",color:"#ccc"},ghost:{background:"transparent",color:"#8899aa"}};return k.jsx("button",{style:{padding:"6px 12px",borderRadius:6,border:"1px solid #444",cursor:"pointer",fontSize:13,...h[m],...g},...y,children:u})}const x={title:"UI/Button",component:f,parameters:{layout:"centered"}},r={args:{variant:"primary",children:"Click me",onClick:()=>{}}},a={args:{variant:"secondary",children:"Cancel",onClick:()=>{}}},n={args:{variant:"ghost",children:"More info",onClick:()=>{}}};var o,e,s;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    variant: "primary",
    children: "Click me",
    onClick: () => {}
  }
}`,...(s=(e=r.parameters)==null?void 0:e.docs)==null?void 0:s.source}}};var c,t,i;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    variant: "secondary",
    children: "Cancel",
    onClick: () => {}
  }
}`,...(i=(t=a.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var d,l,p;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    variant: "ghost",
    children: "More info",
    onClick: () => {}
  }
}`,...(p=(l=n.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const v=["Primary","Secondary","Ghost"];export{n as Ghost,r as Primary,a as Secondary,v as __namedExportsOrder,x as default};
