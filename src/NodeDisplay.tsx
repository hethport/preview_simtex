import {isXmlCommentNode, isXmlTextNode, XmlNode} from 'simple_xml';
import {tlhXmlEditorConfig} from './tlhXmlEditorConfig';
import {XmlSingleNodeConfig} from "./editorConfig";
import classNames from "classnames";

export interface NodeDisplayIProps {
  node: XmlNode;
}


export function NodeDisplay({node}: NodeDisplayIProps): JSX.Element {
  if (isXmlCommentNode(node)) {
    return <></>;
  }
  if (isXmlTextNode(node)) {
    return <span>{node.textContent}</span>;
  }

  const currentConfig: XmlSingleNodeConfig | undefined = tlhXmlEditorConfig.nodeConfigs[node.tagName];

  const renderedChildren = (
    <>{node.children.map((c, i) => <NodeDisplay key={i} node={c}/>)}</>
  );

  const {clickable, notClickable} = currentConfig?.replace
    ? currentConfig.replace(node, renderedChildren)
    : {clickable: renderedChildren, notClickable: undefined};

  const classes = currentConfig?.styling
    ? currentConfig.styling(node)
    : [];

  return (
    <>
      <span className={classNames(classes)}>{clickable}</span>
      {notClickable && <span className={classNames(classes)}>{notClickable}</span>}
    </>
  );
}
