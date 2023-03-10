import {XmlNode} from 'simple_xml';
import {Line} from 'simtex/dist/model/Line';
import {NodeDisplay} from './NodeDisplay';
import {writeNode} from 'simple_xml';

interface IProps {
  line: Line;
}

export function LineDisplay({line}: IProps): JSX.Element {

  const statusLevel = line.getStatus().getLevel();
  const xmlNodes: XmlNode[] = line.exportXml();

  return (
    <div className="my-2">
      <div>
        (<code>{statusLevel}</code>)&nbsp;&nbsp;
        {xmlNodes.map((node, index) => <NodeDisplay key={index} node={node}/>)}
      </div>

      <div>
        {xmlNodes.map((node) => <span>{writeNode(node)}</span>)}
      </div>
    </div>
  );
}
