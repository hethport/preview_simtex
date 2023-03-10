import {displayReplace, XmlEditorConfig, XmlSingleNodeConfig} from './editorConfig';
import classNames from "classnames";
import {isXmlElementNode, XmlElementNode} from "simple_xml";

const foreignLanguageColors: { [key: string]: string } = {
  HURR: 'Hur',
  HATT: 'Hat',
  // PAL: '',
  LUW: 'Luw'
};

function isOnlySpaces({children}: XmlElementNode): boolean {
  return children.length === 1 && isXmlElementNode(children[0]) && children[0].tagName === 'space';
}

function backgroundColor(node: XmlElementNode, selectedMorphology: string | undefined): string | undefined {

  // Prio 2: has editing question
  if (node.attributes.editingQuestion !== undefined) {
    return 'bg-blue-300';
  }

  // Prio 3: has no morphology selected
  if (selectedMorphology !== undefined && selectedMorphology.length === 0 && selectedMorphology !== '???' && selectedMorphology !== 'DEL') {
    return 'bg-yellow-300';
  }

  return undefined;
}

function isLineGapNode(node: XmlElementNode): boolean {
  return 't' in node.attributes && node.attributes.t === 'line';
}

const paragraphSeparatorConfig: XmlSingleNodeConfig = {
  replace: (node, _renderedChildren) => displayReplace(
    <span>
      {node.tagName === 'parsep' ? '¬¬¬' : '==='}
    </span>
  )
}

export const tlhXmlEditorConfig: XmlEditorConfig = {
  nodeConfigs: {
    docID: {
      replace: () => displayReplace(<span/>)
    },
    'AO:Manuscripts': {
      replace: (node, renderedChildren) => displayReplace(
        <span>{renderedChildren}</span>
      )
    },
    'AO:ParagrNr': {
      replace: (node) => displayReplace(<div className="mt-4 font-bold italic">{node.attributes.c}</div>)
    },
    lb: {
      replace: (node, _renderedChildren) => displayReplace(
        <><span className={'text-gray-500'}>{node.attributes.lnr}:</span>&nbsp;&nbsp;&nbsp;</>
      ),
    },

    clb: {
      replace: (node) => displayReplace(<span className="bg-amber-500">{node.attributes.id}&nbsp;</span>)
    },
    cl: {
      replace: (node, renderedChildren) => displayReplace(
        <><span className="px-1 cl">{node.attributes.id || ' '}</span>&nbsp;</>,
        <>{renderedChildren}<br/></>
      )
    },

    // Words
    w: {
      replace: (node, renderedChildren) => {

        const selectedMorph = node.attributes.mrp0sel?.trim();

        const isForeignLanguage = selectedMorph !== undefined
          ? Object.keys(foreignLanguageColors).includes(selectedMorph)
          : false;

        const hasEditingQuestion = node.attributes.editingQuestion !== undefined;

        const classes = classNames(node.attributes.lg || '',
          isOnlySpaces(node)
            ? ['bg-gray-200']
            : [
              backgroundColor(node, selectedMorph),
              {
                'text-red-600': node.children.length === 0,
                'font-bold': isForeignLanguage,
                [foreignLanguageColors[node.attributes.mrp0sel || '']]: isForeignLanguage,
              }
            ]
        );

        return displayReplace(
          <>
            <span className={classes} title={hasEditingQuestion ? node.attributes.q : undefined}>
              {node.children.length === 0 ? <span>&#x2715;</span> : renderedChildren}
            </span>
            &nbsp;&nbsp;
          </>
        );
      }
    },

    // Word contents
    aGr: {styling: () => ['akkadogramm']},
    sGr: {styling: () => ['sumerogramm']},
    d: {styling: () => ['determinativ']},

    del_in: {replace: () => displayReplace(<span>[</span>)},
    del_fin: {replace: () => displayReplace(<span>]</span>)},
    ras_in: {replace: () => displayReplace(<span>*</span>)},
    ras_fin: {replace: () => displayReplace(<span>*</span>)},
    laes_in: {replace: () => displayReplace(<span>⸢</span>)},
    laes_fin: {replace: () => displayReplace(<span>⸣</span>)},

    gap: {
      replace: (node, _renderedChildren) => displayReplace(
        <>
          {isLineGapNode(node) && <br/>}
          <span className="gap">{node.attributes.c}</span>
        </>
      )
    },
    subscr: {replace: (node) => displayReplace(<sub>{node.attributes.c}</sub>)},

    space: {
      replace: (node) => displayReplace(
        <>{Array.from({length: parseInt(node.attributes.c || '0') || 0}).map((_, i) => <span key={i}>&nbsp;</span>)}</>
      )
    },

    parsep: paragraphSeparatorConfig,
    parsep_dbl: paragraphSeparatorConfig,

    corr: {
      styling: () => ['corr'],
      replace: (node) => displayReplace(<span>{node.attributes.c}</span>)
    },
    note: {
      replace: (node) => displayReplace(<sup title={node.attributes.c} className="has-text-weight-bold">x</sup>),
    }
  }
};
