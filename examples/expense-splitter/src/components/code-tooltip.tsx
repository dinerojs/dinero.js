import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeTooltipProps {
  code: string;
  title?: string;
}

export function CodeTooltip({ code, title }: CodeTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', onClickOutside);

      return () => document.removeEventListener('mousedown', onClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [isOpen]);

  return (
    <div className="relative inline-flex">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-5 h-5 rounded-full text-xs font-medium transition-all duration-200 ${
          isOpen
            ? 'bg-indigo-500 text-white'
            : 'bg-white/10 text-slate-500 hover:bg-indigo-500/20 hover:text-indigo-400'
        }`}
        aria-label="Show code example"
      >
        ?
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={tooltipRef}
            className="fixed z-[9999] w-80 sm:w-96 animate-fade-in"
            style={{ top: position.top, right: position.right }}
          >
            <div className="rounded-xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
              {title && (
                <div className="px-6 py-4 flex items-center border-b border-slate-700/50">
                  <span className="text-sm font-medium text-indigo-300">
                    {title}
                  </span>
                </div>
              )}
              <Highlight theme={themes.nightOwl} code={code} language="tsx">
                {({ style, tokens, getLineProps, getTokenProps }) => (
                  <pre
                    className="overflow-x-auto text-xs font-mono leading-loose px-6 py-4"
                    style={{ ...style, background: 'transparent', margin: 0 }}
                  >
                    {tokens.map((line, index) => (
                      <div key={index} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
