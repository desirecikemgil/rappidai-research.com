import type { ReactNode } from "react";
import { DocNav } from "./doc-nav";

/** Documentation centre: persistent section navigation beside one reading column. */
export function DocLayout({ children }: { children: ReactNode }) {
  return (
    <div className="page-shell doc">
      <DocNav />
      <div className="doc-main" data-doc-body>
        {children}
      </div>
    </div>
  );
}
