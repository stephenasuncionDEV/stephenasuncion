(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[327],{4373:function(e,t,n){"use strict";n.d(t,{Sn:function(){return u},Vp:function(){return p}});var r=n(7294),s=n(2494),i=n(8387),o=n(5818),a=n(4520),[l,c]=(0,i.k)({name:"TagStylesContext",errorMessage:"useTagStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<Tag />\" "}),p=(0,o.Gp)(((e,t)=>{const n=(0,o.jC)("Tag",e),s=(0,a.Lr)(e),i={display:"inline-flex",verticalAlign:"top",alignItems:"center",maxWidth:"100%",...n.container};return r.createElement(l,{value:n},r.createElement(o.m$.span,{ref:t,...s,__css:i}))}));p.displayName="Tag";var u=(0,o.Gp)(((e,t)=>{const n=c();return r.createElement(o.m$.span,{ref:t,noOfLines:1,...e,__css:n.label})}));u.displayName="TagLabel",(0,o.Gp)(((e,t)=>r.createElement(s.JO,{ref:t,verticalAlign:"top",marginEnd:"0.5rem",...e}))).displayName="TagLeftIcon",(0,o.Gp)(((e,t)=>r.createElement(s.JO,{ref:t,verticalAlign:"top",marginStart:"0.5rem",...e}))).displayName="TagRightIcon";var h=e=>r.createElement(s.JO,{verticalAlign:"inherit",viewBox:"0 0 512 512",...e},r.createElement("path",{fill:"currentColor",d:"M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"}));h.displayName="TagCloseIcon"},714:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return y}});var r=n(8395),s=n(7927),i=n(4373),o=n(5610),a=n(2813),l=n(29),c=n(7794),p=n.n(c),u=n(7294),h=n(4249),x=n(9352),d=n(3750),m=n(8193),f=n(7516),j=n(512),g=n(3803),v=n(5893),b=["nfthost","emoji.io","kaldereta","gen-rs","swift-shop","showoff","stephenasunciondev.github.io"],y=function(){var e,t,n=function(){var e=(0,h.l3)().octokit,t=(0,u.useState)([]),n=t[0],r=t[1];return(0,u.useEffect)((function(){if(!(n.length>0)){var t=function(){var t=(0,l.Z)(p().mark((function t(){var n;return p().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.request("GET /user/repos",{type:"public",sort:"updated"});case 2:n=t.sent,r(n.data);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}}),[]),{repositories:n}}(),c=n.repositories,y=(0,r.ff)("1px solid rgb(0 0 0 / 15%)","1px solid rgb(255 255 255 / 15%)");return(0,v.jsxs)(s.xu,{children:[(0,v.jsx)(j.Z,{}),(0,v.jsx)("main",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center"},children:(0,v.jsxs)(s.kC,{maxW:"1200px",w:"full",flex:"1",flexDir:"column",px:"1em",children:[(0,v.jsx)(a.Z,{}),(0,v.jsx)(s.xv,{fontSize:"32pt",mt:"1em",children:"Projects"}),(0,v.jsx)(s.Eq,{justify:"center",spacing:"1.5em",mt:"2em",children:(null===c||void 0===c?void 0:c.length)>0?(0,v.jsx)(v.Fragment,{children:null===c||void 0===c||null===(e=c.filter((function(e){return(null===b||void 0===b?void 0:b.includes(e.name.toLowerCase()))&&"stephenasuncionDEV"===e.owner.login})))||void 0===e||null===(t=e.sort((function(e,t){return b.indexOf(e.name.toLowerCase())-b.indexOf(t.name.toLowerCase())})))||void 0===t?void 0:t.map((function(e,t){return(0,v.jsx)(s.rU,{href:e.html_url,isExternal:!0,style:{textDecoration:"none"},maxW:"340px",w:"full",children:(0,v.jsxs)(s.kC,{flexDir:"column",borderRadius:"6px",border:y,p:"1em",h:"full",justifyContent:"space-between",children:[(0,v.jsxs)(s.kC,{flexDir:"column",children:[(0,v.jsxs)(s.Ug,{children:[(0,v.jsx)(x.Ghl,{}),(0,v.jsx)(s.xv,{fontSize:"10pt",fontWeight:"bold",color:"rgb(52,140,212)",children:e.name}),(0,v.jsx)(i.Vp,{variant:"outline",size:"sm",children:(0,v.jsx)(i.Sn,{children:"Public"})})]}),(0,v.jsx)(s.xv,{fontSize:"9pt",mt:"1em",children:e.description||"No Description"})]}),(0,v.jsxs)(s.Ug,{mt:"1em",children:[(0,v.jsxs)(s.Ug,{alignItems:"center",children:[(0,v.jsx)(d.rJz,{color:{JavaScript:"rgb(241,224,90)","C++":"rgb(243,75,125)",TypeScript:"rgb(49,120,198)",Rust:"rgb(222,165,132)",Other:"rgb(237,237,237)"}[e.language||"JavaScript"],fontSize:"9pt",border:"1px solid rgba(255,255,255,0.2)"}),(0,v.jsx)(s.xv,{fontSize:"9pt",lineHeight:"9pt",children:e.language||"JavaScript"})]}),(0,v.jsxs)(s.Ug,{alignItems:"center",children:[(0,v.jsx)(m.y5j,{fontSize:"9pt"}),(0,v.jsx)(s.xv,{fontSize:"9pt",lineHeight:"9pt",children:e.stargazers_count.toString()||"0"})]}),(0,v.jsxs)(s.Ug,{alignItems:"center",children:[(0,v.jsx)(f.Ev8,{fontSize:"9pt"}),(0,v.jsx)(s.xv,{fontSize:"9pt",lineHeight:"9pt",children:e.forks_count.toString()||"0"})]})]})]})},t)}))}):(0,v.jsx)(o.$,{thickness:"4px",speed:"0.65s",emptyColor:"gray.200",color:"blue.500",size:"xl"})})]})}),(0,v.jsx)(g.Z,{})]})}},3803:function(e,t,n){"use strict";var r=n(7927),s=n(7741),i=n(9583),o=n(7735),a=n(5893);t.Z=function(){return(0,a.jsx)("footer",{children:(0,a.jsx)(r.M5,{mt:"4em",mb:"2em",children:(0,a.jsx)(r.kC,{flexDir:"column",maxW:"1200px",w:"full",px:"1em",children:(0,a.jsxs)(r.kC,{justifyContent:"space-between",children:[(0,a.jsxs)(r.xv,{children:["\xa9 ",(new Date).getFullYear()," Stephen Asuncion"]}),(0,a.jsxs)(r.Ug,{children:[(0,a.jsx)(r.rU,{href:"https://github.com/stephenasuncionDEV",isExternal:!0,children:(0,a.jsx)(s.hU,{"aria-label":"Stephen Asuncion Github",size:"sm",icon:(0,a.jsx)(i.hJX,{})})}),(0,a.jsx)(r.rU,{href:"https://discordapp.com/users/746865227471257702",isExternal:!0,children:(0,a.jsx)(s.hU,{"aria-label":"Stephen Asuncion Discord",size:"sm",icon:(0,a.jsx)(i.j2d,{})})}),(0,a.jsx)(r.rU,{href:"https://www.linkedin.com/in/stephenasuncion/",isExternal:!0,children:(0,a.jsx)(s.hU,{"aria-label":"Stephen Asuncion LinkedIn",size:"sm",icon:(0,a.jsx)(i.ltd,{})})}),(0,a.jsx)(r.rU,{href:"https://www.buymeacoffee.com/",isExternal:!0,children:(0,a.jsx)(s.hU,{"aria-label":"Stephen Asuncion BuyMeACoffee",size:"sm",icon:(0,a.jsx)(o.qHW,{})})})]})]})})})})}},512:function(e,t,n){"use strict";var r=n(9008),s=n.n(r),i=n(5893);t.Z=function(){return(0,i.jsxs)(s(),{children:[(0,i.jsx)("title",{children:"Stephen Asuncion | Portfolio Website"}),(0,i.jsx)("meta",{name:"title",content:"Stephen Asuncion | Portfolio Website"}),(0,i.jsx)("meta",{name:"description",content:"I'm a Software Engineer, Full-Stack Web Developer, and Technopreneur. Visit my Portfolio Website if you are interested in seeing my work."}),(0,i.jsx)("meta",{name:"keywords",content:"Stephen Asuncion, Portfolio Website"}),(0,i.jsx)("meta",{name:"robots",content:"index, follow"}),(0,i.jsx)("meta",{httpEquiv:"Content-Type",content:"text/html; charset=utf-8"}),(0,i.jsx)("meta",{name:"language",content:"en"}),(0,i.jsx)("meta",{name:"theme-color",content:"#348CD4"}),(0,i.jsx)("meta",{property:"og:type",content:"website"}),(0,i.jsx)("meta",{property:"og:url",content:"https://stephenasuncion.dev/"}),(0,i.jsx)("meta",{property:"og:title",content:"Stephen Asuncion | Portfolio Website"}),(0,i.jsx)("meta",{property:"og:description",content:"I'm a Software Engineer, Full-Stack Web Developer, and Technopreneur. Visit my Portfolio Website if you are interested in seeing my work."}),(0,i.jsx)("meta",{property:"og:image",content:"https://stephenasuncion.dev/assets/meta.png"}),(0,i.jsx)("meta",{property:"og:site_name",content:"stephenasuncion"}),(0,i.jsx)("meta",{property:"twitter:card",content:"summary_large_image"}),(0,i.jsx)("meta",{property:"twitter:url",content:"https://stephenasuncion.dev/"}),(0,i.jsx)("meta",{property:"twitter:title",content:"Stephen Asuncion | Portfolio Website"}),(0,i.jsx)("meta",{property:"twitter:description",content:"I'm a Software Engineer, Full-Stack Web Developer, and Technopreneur. Visit my Portfolio Website if you are interested in seeing my work."}),(0,i.jsx)("meta",{property:"twitter:image",content:"https://stephenasuncion.dev/assets/meta.png"})]})}},2813:function(e,t,n){"use strict";var r=n(1664),s=n.n(r),i=n(1163),o=n(8395),a=n(7927),l=n(3887),c=n(7741),p=n(7660),u=n(5434),h=n(1852),x=n(2585),d=n(7516),m=n(3750),f=n(5893);t.Z=function(){var e=(0,i.useRouter)(),t=(0,o.If)(),n=t.colorMode,r=t.toggleColorMode,j=(0,h.useMediaQuery)({query:"(max-width: 530px)"}),g=e.route;return(0,f.jsxs)(a.kC,{p:"1em",justifyContent:"space-between",children:[(0,f.jsx)(s(),{href:"/",passHref:!0,children:(0,f.jsx)(l.Ee,{src:"/assets/bitmoji.webp",alt:"Stephen Asuncion Avatar",width:"50px",fallbackSrc:"https://picsum.photos/50",cursor:"pointer"})}),j?(0,f.jsxs)(p.v2,{children:[(0,f.jsx)(p.j2,{as:c.hU,"aria-label":"Options",icon:(0,f.jsx)(x.vHB,{}),variant:"outline"}),(0,f.jsxs)(p.qy,{children:[(0,f.jsx)(s(),{href:"/",shallow:!0,passHref:!0,children:(0,f.jsx)(p.sN,{icon:(0,f.jsx)(d.OKt,{}),children:"Home"})}),(0,f.jsx)(s(),{href:"/about",shallow:!0,passHref:!0,children:(0,f.jsx)(p.sN,{icon:(0,f.jsx)(m.O5U,{}),children:"About"})}),(0,f.jsx)(s(),{href:"/projects",shallow:!0,passHref:!0,children:(0,f.jsx)(p.sN,{icon:(0,f.jsx)(m.G3K,{}),children:"Projects"})}),(0,f.jsx)(p.R,{}),(0,f.jsx)(s(),{href:"mailto:stephenasuncion@outlook.com",children:(0,f.jsx)(p.sN,{icon:(0,f.jsx)(m.xTs,{color:"#E53E3E"}),children:"Hire Me"})}),(0,f.jsx)(p.R,{}),(0,f.jsx)(p.sN,{icon:"light"===n?(0,f.jsx)(u.UFB,{}):(0,f.jsx)(u.A9M,{}),onClick:r,children:"light"===n?"Dark Mode":"Light Mode"})]})]}):(0,f.jsxs)(a.Ug,{spacing:"2em",children:[(0,f.jsxs)(a.Ug,{spacing:"1em",children:[(0,f.jsx)(s(),{href:"/",shallow:!0,passHref:!0,style:{textDecoration:"none"},children:(0,f.jsx)(c.zx,{size:"sm",variant:"transparent",borderBottom:"/"===g?"2px dashed rgb(52,140,212)":"initial",borderRadius:"0",children:"Home"})}),(0,f.jsx)(s(),{href:"/about",shallow:!0,passHref:!0,style:{textDecoration:"none"},children:(0,f.jsx)(c.zx,{size:"sm",variant:"transparent",borderBottom:"/about"===g?"2px dashed rgb(52,140,212)":"initial",borderRadius:"0",children:"About"})}),(0,f.jsx)(s(),{href:"/projects",shallow:!0,passHref:!0,style:{textDecoration:"none"},children:(0,f.jsx)(c.zx,{size:"sm",variant:"transparent",borderBottom:"/projects"===g?"2px dashed rgb(52,140,212)":"initial",borderRadius:"0",children:"Projects"})}),(0,f.jsx)(a.rU,{href:"https://stephenasuncion.hashnode.dev/",isExternal:!0,style:{textDecoration:"none"},children:(0,f.jsx)(c.zx,{size:"sm",variant:"transparent",borderBottom:"/blog"===g?"2px dashed rgb(52,140,212)":"initial",borderRadius:"0",children:"Blog"})})]}),(0,f.jsxs)(a.Ug,{children:[(0,f.jsx)(s(),{href:"mailto:stephenasuncion@outlook.com",style:{textDecoration:"none"},children:(0,f.jsx)(c.zx,{size:"sm",variant:"primary",children:"\ud83d\ude80 Hire Me"})}),(0,f.jsx)(c.hU,{"aria-label":"Toggle Color Mode",icon:"light"===n?(0,f.jsx)(u.UFB,{}):(0,f.jsx)(u.A9M,{}),variant:"transparent",onClick:r})]})]})]})}},9182:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/projects",function(){return n(714)}])},29:function(e,t,n){"use strict";function r(e,t,n,r,s,i,o){try{var a=e[i](o),l=a.value}catch(c){return void n(c)}a.done?t(l):Promise.resolve(l).then(r,s)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(s,i){var o=e.apply(t,n);function a(e){r(o,s,i,a,l,"next",e)}function l(e){r(o,s,i,a,l,"throw",e)}a(void 0)}))}}n.d(t,{Z:function(){return s}})}},function(e){e.O(0,[980,228,13,874,415,445,937,617,300,774,888,179],(function(){return t=9182,e(e.s=t);var t}));var t=e.O();_N_E=t}]);