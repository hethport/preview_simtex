import {TLHParser} from "simtex";
import {LineDisplay} from './LineDisplay';

interface IProps {
  parser: TLHParser;
}

export function TLHParserDisplay({parser}: IProps): JSX.Element {
  return (
    <div>
      <h3 className="text-center">Status: <code>{parser.getStatus().getLevel()}</code></h3>

      {parser.getLines().map((line, index) => <LineDisplay key={index} line={line}/>)}
    </div>
  );
}
