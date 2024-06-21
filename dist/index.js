"use strict";var z=Object.create;var c=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var Z=Object.getOwnPropertyNames;var K=Object.getPrototypeOf,Q=Object.prototype.hasOwnProperty;var ee=(r,e)=>{for(var t in e)c(r,t,{get:e[t],enumerable:!0})},O=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Z(e))!Q.call(r,i)&&i!==t&&c(r,i,{get:()=>e[i],enumerable:!(n=C(e,i))||n.enumerable});return r};var s=(r,e,t)=>(t=r!=null?z(K(r)):{},O(e||!r||!r.__esModule?c(t,"default",{value:r,enumerable:!0}):t,r)),re=r=>O(c({},"__esModule",{value:!0}),r);var oe={};ee(oe,{Deployer:()=>a});module.exports=re(oe);var o=class r{static{this._logging=!0}static{this._verbose=!1}static set logging(e){r._logging=e}static set verbose(e){r._verbose=e}static get logging(){return r._logging}static get verbose(){return r._verbose}static stringify(...e){return e.map(t=>typeof t=="object"?JSON.stringify(t):t).join(" ")}static log(...e){r._logging&&console.info(r.stringify(...e))}static logPrimary(...e){r._logging&&console.info(`\x1B[34m${r.stringify(...e)}\x1B[0m`)}static logSecondary(...e){r._logging&&console.info(`\x1B[90m${r.stringify(...e)}\x1B[0m`)}static logSuccess(...e){r._logging&&console.info(`\x1B[32m${r.stringify(...e)}\x1B[0m`)}static logWarning(...e){r._logging&&console.info(`\x1B[33m${r.stringify(...e)}\x1B[0m`)}static logDanger(...e){r._logging&&console.info(`\x1B[31m${r.stringify(...e)}\x1B[0m`)}static taskLog(...e){r._logging&&console.info("	"+r.stringify(...e))}static taskLogPrimary(...e){r._logging&&console.info(`	\x1B[34m${r.stringify(...e)}\x1B[0m`)}static taskLogSuccess(...e){r._logging&&console.info(`	\x1B[32m${r.stringify(...e)}\x1B[0m`)}static taskLogWarning(...e){r._logging&&console.info(`	\x1B[33m${r.stringify(...e)}\x1B[0m`)}static taskLogDanger(...e){r._logging&&console.info(`	\x1B[31m${r.stringify(...e)}\x1B[0m`)}};var W=s(require("fs"));var w=s(require("path")),N=s(require("fs"));function S(r){return new p(r)}var p=class{constructor(e){this.location=e}async execute(e){let t=w.default.join(this.location,"package.json");try{let n=(await N.default.promises.readFile(t)).toString(),i=JSON.parse(n);return e.project={type:0,name:i.name,version:i.version,location:this.location},o.log("Project:","\x1B[32m",e.project?.name,`v${e.project?.version}`,"\x1B[0m"),!0}catch(n){return o.logDanger("Error loading",t),o.logDanger(JSON.stringify(n,null,"	")),!1}}};var m=require("readline");function R(r="Confirma a publica\xE7\xE3o de __PROJECT_NAME__ vers\xE3o __PROJECT_VERSION__ (__ENVIRONMENT__)? (y/N): "){return new l(r)}var l=class{constructor(e){this.message=e}async execute(e){let t=m.createInterface({input:process.stdin,output:process.stdout}),i=`${e.environment==="PRODUCTION"?"\x1B[31m":"\x1B[33m"}${this.message}\x1B[0m`.replace("__PROJECT_NAME__",e.project?.name||"...").replace("__PROJECT_VERSION__",e.project?.version||"...").replace("__ENVIRONMENT__",e.environment||"..."),P=await new Promise(q=>{t.question(i,X=>{q(["y","yes","s","sim"].includes(X.toLowerCase()))})});return t.close(),m.moveCursor(process.stdout,0,-1),m.clearLine(process.stdout,1),P||o.log("Exiting..."),P}};var E=require("child_process");function F(r,e){return new g(`npm run ${r}`,e)}var g=class{constructor(e,t){this.cmd=e;this.cwd=t}async execute(e){try{return o.log("Building..."),(0,E.execSync)(this.cmd,{cwd:this.cwd||e.project?.location,stdio:o.verbose===!0?"inherit":void 0}),!0}catch(t){return o.logDanger("Build error:",t),!1}}};function L(){return new u}var u=class{constructor(){}async execute(e){return o.logSecondary("Skipping backup..."),!0}};function B(){return new f}var f=class{constructor(){}async execute(e){return o.logSecondary("Skipping cleanup..."),!0}};function j(){return new y}var y=class{constructor(){}async execute(e){return o.logSecondary("Skipping publish..."),!0}};function _(){return new b}var b=class{constructor(){}async execute(e){return o.logSecondary("Skipping test..."),!0}};function I(){return new d}var d=class{constructor(){}async execute(e){return o.logSecondary("Skipping build..."),!0}};var M=require("child_process");function G(r){return new x(r)}var x=class{constructor(e){this.url=e}async execute(e){return o.log("Testing..."),(0,M.execSync)(`explorer "${this.url}"`),!0}};var k=s(require("path")),A=s(require("fs"));function J(r,e,t){return new h(r,e,t)}var h=class{constructor(e,t,n){this.distDirectory=e;this.destDirectory=t;this.files=n}async execute(){o.log(`Publishing (FileSystem) to ${this.destDirectory}...`);try{for(let e of this.files){let t=k.default.join(this.distDirectory,e),n=k.default.join(this.destDirectory,e);A.default.copyFileSync(t,n)}}catch(e){return o.logDanger(`publish error: ${e}`),!1}return!0}};function V(r,e){return new T(r,e)}var T=class{constructor(e,t){this.filename=e;this.directory=t}async execute(e){let t=this.filename.replace("{TIMESTAMP}","datahora");return o.log(`Backuping to ${t}...`),!0}};function U(){return new v}var v=class{constructor(){}async execute(e){return o.logSecondary("Skipping confirm..."),!0}};var Y=require("child_process");function H(r,e){return new D(r,e)}var D=class{constructor(e,t){this.distDirectory=e;this.destDirectory=t}async execute(){o.log(`Publishing (xcopy) to ${this.destDirectory}...`);let e=`xcopy ${this.distDirectory}\\* ${this.destDirectory} /E /Y /D`;try{(0,Y.execSync)(e,{stdio:o.verbose===!0?"inherit":void 0})}catch(t){return o.logDanger(`publish error: ${t}`),!1}return!0}};var a=class r{constructor(){this._tasks=[];this.environment=null;this.project=null;o.logPrimary("[dcs-deploy]")}static create(e){o.logging=!0,o.verbose=!0;let t=new r;return t.environment=e,t}static profile(e){let t=JSON.parse(W.default.readFileSync(e).toString()),n=null;switch(t.environment.toUpperCase()){case"DEVELOPMENT":n="DEVELOPMENT";break;case"HOMOLOGATION":n="HOMOLOGATION";break;case"PRODUCTION":n="PRODUCTION";break;default:throw"Invalid environment"}let i=r.create(n);switch(o.logging=!!t.logging.enabled,o.verbose=!!t.logging.verbose,t.project.type){case"npm":i.add(S(t.project.location));break}switch(t.confirm===!0?i.add(R()):i.add(U()),t.build.type){case"npm":i.add(F(t.build.script,t.build.cwd));break;default:i.add(I())}switch(t.backup.type){case"zip":i.add(V(t.backup.filename,t.backup.directory));break;default:i.add(L())}switch(t.cleanup.type){default:i.add(B())}switch(t.publish.type){case"FileSystemPublish":i.add(J(t.build.dist,t.publish.directory,t.publish.files));break;case"XCopyPublish":i.add(H(t.build.dist,t.publish.directory));break;default:i.add(j())}switch(t.test.type){case"BrowserTabTest":i.add(G(t.test.url));break;default:i.add(_())}return i}add(e){return this._tasks.push(e),this}async execute(){for(let e of this._tasks){let t=e.constructor.name;try{if(!await e.execute(this))return!1}catch{return!1}}return!0}};0&&(module.exports={Deployer});