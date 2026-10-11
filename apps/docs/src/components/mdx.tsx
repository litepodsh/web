import defaultMdxComponents from "fumadocs-ui/mdx";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import type { ComponentProps } from "react";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import type { MDXComponents } from "mdx/types";
import { Screenshot } from "./screenshot";

// Shell blocks (marked by lib/shell-transformer) get the terminal title bar from the
// landing page hero; every other block keeps Fumadocs' default.
function ShellAwarePre(props: ComponentProps<"pre">) {
  const shell = "data-shell" in props;
  return (
    <CodeBlock
      {...props}
      title={shell ? (props.title ?? "root@litepod — ssh") : props.title}
      icon={shell ? <TrafficLights /> : (props as { icon?: string }).icon}
    >
      <Pre>{props.children}</Pre>
    </CodeBlock>
  );
}

function TrafficLights() {
  return (
    <span className="lp-traffic flex gap-1.5" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    pre: ShellAwarePre,
    Accordion,
    Accordions,
    Step,
    Steps,
    Screenshot,
    Tab,
    Tabs,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
