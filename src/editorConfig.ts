import {XmlElementNode} from 'simple_xml';
import {Argument as ClassNamesArgument} from 'classnames';

export interface DisplayReplacement {
  clickable: JSX.Element;
  notClickable?: JSX.Element;
}

export function displayReplace(clickable: JSX.Element, notClickable?: JSX.Element): DisplayReplacement {
  return {clickable, notClickable};
}

export interface XmlSingleNodeConfig {
  replace?: (node: XmlElementNode, renderedChildren: JSX.Element) => DisplayReplacement;
  styling?: (node: XmlElementNode) => ClassNamesArgument;
  dontRenderChildrenInline?: boolean;
}

export interface XmlEditorConfig {
  nodeConfigs: {
    [tagName: string]: XmlSingleNodeConfig;
  };
}
