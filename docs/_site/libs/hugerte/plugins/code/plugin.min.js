/**
 * HugeRTE version 1.0.9 (2025-03-15)
 * Copyright (c) 2022 Ephox Corporation DBA Tiny Technologies, Inc.
 * Copyright (c) 2024 HugeRTE contributors
 * Licensed under the MIT license (https://github.com/hugerte/hugerte/blob/main/LICENSE.TXT)
 */
!function(){"use strict";hugerte.util.Tools.resolve("hugerte.PluginManager").add("code",(e=>((e=>{e.addCommand("mceCodeEditor",(()=>{(e=>{const o=(e=>e.getContent({source_view:!0}))(e);e.windowManager.open({title:"Source Code",size:"large",body:{type:"panel",items:[{type:"textarea",name:"code"}]},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],initialData:{code:o},onSubmit:o=>{((e,o)=>{e.focus(),e.undoManager.transact((()=>{e.setContent(o)})),e.selection.setCursorLocation(),e.nodeChanged()})(e,o.getData().code),o.close()}})})(e)}))})(e),(e=>{const o=()=>e.execCommand("mceCodeEditor");e.ui.registry.addButton("code",{icon:"sourcecode",tooltip:"Source code",onAction:o}),e.ui.registry.addMenuItem("code",{icon:"sourcecode",text:"Source code",onAction:o})})(e),{})))}();