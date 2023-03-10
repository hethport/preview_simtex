import {TLHParser} from 'simtex';
import {useState} from "react";
import {TLHParserDisplay} from './TLHParserDisplay';

export function App(): JSX.Element {

  const [state, setState] = useState<TLHParser | undefined>();

  const onTransliterationChange = (value: string): void => {
    const parser: TLHParser = new TLHParser(value);

    setState(parser);
  }

  return (
    <div className="container mx-auto">
      <h1 className="my-4 font-bold text-2xl text-center">SimTex Preview</h1>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <h2 className="font-bold text-xl text-center">Transliteration</h2>

          <textarea cols={60} rows={40} className="p-2 rounded border border-slate-500 w-full"
                    onChange={(event) => onTransliterationChange(event.target.value)}/>
        </div>
        <div>
          <h2 className="font-bold text-xl text-center">Resultat</h2>

          {state
            ? <TLHParserDisplay parser={state}/>
            : <div className="text-center italic">Noch kein Resultat...</div>}
        </div>
      </div>

    </div>
  );
}
