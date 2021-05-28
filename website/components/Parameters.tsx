type ParametersProps = {
  children: React.ReactNode;
};

function isReactElement(element: React.ReactNode): element is React.ReactElement {
  return (element as React.ReactElement).hasOwnProperty('props');
}

export function Parameters({ children }: ParametersProps) {
  const items = Array.isArray(children) ? children : [children];
  const parameters = items.filter((child: React.ReactNode): child is React.ReactElement => {
    return isReactElement(child) && child.props.mdxType === 'Parameter';
  });

  if (parameters.length > 0) {
    return (
      <table>
        <tbody>
          {parameters.map(({ props }) => (
            <tr key={props.name}>
              <td>
                <code id={`parameter-${props.name}`}>{props.name}</code>
              </td>
              <td>
                <code>{props.type}</code>
                {props.required && <span>Required</span>}
                <div>{props.children}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return null;
}

type ParameterProps = {
  children: React.ReactNode;
  name: string;
  type: string;
  required: boolean;
};

export function Parameter({ children }: ParameterProps) {
  return children
}
