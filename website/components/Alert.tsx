export type AlertProps = {
  children: React.ReactNode,
  type: 'info' | 'warning',
};

function isReactElement(children: React.ReactNode): children is React.ReactElement {
  if (children) {
    return children.hasOwnProperty('props');
  }

  return false;
}

export function Alert({ children, type }: AlertProps) {
  const content = Array.isArray(children) ? children : [children];
  const classNames: Record<AlertProps['type'], string> = {
    info: 'bg-blue-100 text-blue-400',
    warning: 'bg-yellow-200 text-yellow-700',
  };

  return <div role="alert" className="flex items-start p-6 space-x-3 text-sm rounded-md shadow-xl">
    <span className={`px-2 pt-1.5 pb-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-opacity-40 ${classNames[type]}`}>
      {type}
    </span>
    <div className="-mt-2">
      {content.map((item, index) => {
        if (isReactElement(item) && item.props.mdxType === 'p') {
          return (
            <p key={index} className="mt-3">{item.props.children}</p>
          )
        }

        return item
      })}
    </div>
  </div>;
}
