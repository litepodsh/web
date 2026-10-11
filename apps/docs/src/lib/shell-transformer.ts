import type { RehypeCodeOptions } from "fumadocs-core/mdx-plugins";

type ShikiTransformer = NonNullable<RehypeCodeOptions["transformers"]>[number];

const SHELL = new Set(["bash", "sh", "shell", "zsh", "console"]);

/**
 * Marks shell code blocks so they render as the Litepod terminal (see `pre` in
 * components/mdx.tsx and `[data-shell]` in global.css), and tags each line as a
 * command or not, so only commands get the `root@litepod:~#` prompt.
 *
 * A line is a command unless it is blank, a comment, the continuation of a line
 * ending in `\`, or a single bare token after the first line (printed output such
 * as a generated password).
 */
export const transformerShell: ShikiTransformer = {
  name: "litepod:shell",
  pre(node) {
    if (SHELL.has(this.options.lang)) node.properties["data-shell"] = "";
  },
  line(node, line) {
    if (!SHELL.has(this.options.lang)) return;
    const lines = this.source.split("\n");
    const text = lines[line - 1]?.trim() ?? "";
    const previous = lines[line - 2]?.trimEnd() ?? "";
    const output = line > 1 && !/\s/.test(text);
    const command = text !== "" && !text.startsWith("#") && !previous.endsWith("\\") && !output;
    this.addClassToHast(node, command ? "lp-cmd" : "lp-out");
  },
};
