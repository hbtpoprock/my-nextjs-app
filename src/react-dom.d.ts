import { Root } from "react-dom/client";

declare global {
  interface HTMLElement {
    _reactRoot?: Root;
  }
}
