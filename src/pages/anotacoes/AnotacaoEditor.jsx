import { useRef, useEffect } from 'react';

export default function AnotacaoEditor({ value, onChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  function execCmd(cmd, val) {
    document.execCommand(cmd, false, val || null);
  }

  const FERRAMENTAS = [
    { cmd: 'bold',                label: 'N',  title: 'Negrito',        style: { fontWeight: 'bold' } },
    { cmd: 'italic',              label: 'I',  title: 'Itálico',        style: { fontStyle: 'italic' } },
    { cmd: 'underline',           label: 'S',  title: 'Sublinhado',     style: { textDecoration: 'underline' } },
    { cmd: 'insertUnorderedList', label: '•',  title: 'Lista' },
    { cmd: 'insertOrderedList',   label: '1.', title: 'Lista numerada' },
    { cmd: 'formatBlock',         label: 'H1', title: 'Título',         value: 'h2' },
    { cmd: 'formatBlock',         label: 'H2', title: 'Subtítulo',      value: 'h3' },
  ];

  return (
    <div className="editor-wrapper">
      <div className="editor-toolbar">
        {FERRAMENTAS.map((f, i) => (
          <button
            key={i}
            type="button"
            title={f.title}
            className="toolbar-btn"
            style={f.style}
            onMouseDown={e => {
              e.preventDefault();
              execCmd(f.cmd, f.value);
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        className="editor-body"
        contentEditable
        suppressContentEditableWarning
        onInput={e => onChange(e.currentTarget.innerHTML)}
      />
    </div>
  );
}