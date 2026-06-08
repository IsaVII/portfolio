import { Css } from "@thesvg/react";
import { Cplusplus } from "@thesvg/react";
import { Csharp } from "@thesvg/react";
import { Python } from "@thesvg/react";
import { Html5 } from "@thesvg/react";
import { Javascript } from "@thesvg/react";
import { React } from "@thesvg/react";
import { TailwindCss } from "@thesvg/react";
import { Vite } from "@thesvg/react";
import { Nodedotjs } from "@thesvg/react";
import { Express } from "@thesvg/react";
import { Mongodb } from "@thesvg/react";

import NextJsCustomIcon from "./customIcons/icon_nextJs.jsx";
import UnrealEngine from "./customIcons/icon_unrealEngine.jsx";
import Unity from "./customIcons/icon_unity.jsx";

import DocumentCustomIcon from "./customIcons/icon_document.jsx";
import MailToCustomIcon from "./customIcons/icon_mailto.jsx";

import { Linkedin } from "@thesvg/react";

function ToolIcon({ Icon }) {
  return <Icon className="tool-icon" />;
}

export const icons = {
  Cplusplus: <ToolIcon Icon={Cplusplus} />,
  Csharp: <ToolIcon Icon={Csharp} />,
  Python: <ToolIcon Icon={Python} />,

  Html5: <ToolIcon Icon={Html5} />,
  Css: <ToolIcon Icon={Css} />,
  Javascript: <ToolIcon Icon={Javascript} />,
  React: <ToolIcon Icon={React} />,
  Nodejs: <ToolIcon Icon={Nodedotjs} />,
  Nextjs: <ToolIcon Icon={NextJsCustomIcon} />,
  Expressjs: <ToolIcon Icon={Express} />,
  Mongodb: <ToolIcon Icon={Mongodb} />,
  TailwindCss: <ToolIcon Icon={TailwindCss} />,
  Vite: <ToolIcon Icon={Vite} />,

  UnrealEngine: <ToolIcon Icon={UnrealEngine} />,
  Unity: <ToolIcon Icon={Unity} />,

  Document: <ToolIcon Icon={DocumentCustomIcon} />,
  MailTo: <ToolIcon Icon={MailToCustomIcon} />,
  Linkedin: <ToolIcon Icon={Linkedin} />,
};
